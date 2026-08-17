import { Sequelize } from 'sequelize';

export let sequelize;

if (process.env.DATABASE_URL) {
  // Render / production database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Local development
  const sqlJsAsSqlite3 = (await import('sql.js-as-sqlite3')).default;
  const initSqlJs = (await import('sql.js')).default;
  const fs = (await import('fs')).default;
  const path = (await import('path')).default;
  const { fileURLToPath } = await import('url');

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  sqlJsAsSqlite3.configure({
    initSqlJs,
    wasmFileBaseUrl: path.join(
      __dirname,
      '../node_modules/sql.js/dist/'
    )
  });

  sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectModule: sqlJsAsSqlite3,
    logging: false
  });

  async function saveDatabaseToFile() {
    const dbInstance =
      await sequelize.connectionManager.getConnection();

    const binaryArray = dbInstance.database.export();
    const buffer = Buffer.from(binaryArray);

    fs.writeFileSync('database.sqlite', buffer);
  }

  sequelize.addHook('afterCreate', saveDatabaseToFile);
  sequelize.addHook('afterDestroy', saveDatabaseToFile);
  sequelize.addHook('afterUpdate', saveDatabaseToFile);
  sequelize.addHook('afterSave', saveDatabaseToFile);
  sequelize.addHook('afterUpsert', saveDatabaseToFile);
  sequelize.addHook('afterBulkCreate', saveDatabaseToFile);
  sequelize.addHook('afterBulkDestroy', saveDatabaseToFile);
  sequelize.addHook('afterBulkUpdate', saveDatabaseToFile);
}