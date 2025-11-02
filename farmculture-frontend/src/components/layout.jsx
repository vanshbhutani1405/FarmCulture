import { Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
        <Navbar/>
        <Outlet/>
       
        </>
    )
}