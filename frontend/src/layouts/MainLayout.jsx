import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap w-full gap-2">
                <div className="main-container grow-2 w-full">
                    <Outlet />
                </div>

                <Navbar />
            </div>
            <ToastContainer />
        </>
    );
};

export default MainLayout;
