import { Header } from "../components/Header"
import './NotFoundPage.css'
import '../components/header.css'
export function NotFoundPage(){
  return (
    <>
      <Header />
      <div className="notfoundtext">
        <p>404 (NOT FOUND)</p>
      </div>
    </>
  )
}