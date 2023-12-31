import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Header from "./components/Header";


export default function Layout() {

    const css = `
        .body-custom {
               background-color: rgb(9, 18, 64);
        }
        html{
               background-color: rgb(9, 18, 64);
        }

        `
    return (
        <>
            <style>
                {css}
            </style>
            <div className="body-custom">
                <Header />
                <Outlet />
                <NavBar />
            </div>

        </>
    )
}