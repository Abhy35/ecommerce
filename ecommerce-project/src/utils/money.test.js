import { expect, it, describe } from "vitest";
import { formatMoney } from "./money";

describe('formatmoney', ()=>{

it('format 1999 cents to 19.99', ()=>{
  expect(formatMoney(1999)).toBe('19.99')
})

it('displays 2 decimals', ()=>{
  expect(formatMoney(1090)).toBe('10.90');
})

})
