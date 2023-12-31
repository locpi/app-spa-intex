import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Schedule from "./pages/schedule/Schedule";
import Layout from "./Layout";
import Settings from "./pages/settings/Settings";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/schedule",
                element: <Schedule />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
        ],
    },
])