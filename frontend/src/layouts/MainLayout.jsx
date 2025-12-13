import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
    return (
        <>
            <div className="md:h-dvh flex flex-col md:flex-row flex-wrap md:flex-nowrap w-full gap-2">
                <div className="main-container mb-12 md:mb-0 md:h-full overflow-y-scroll grow-2 w-full relative">
                    <Outlet />
                </div>

                <Navbar />
            </div>
            <ToastContainer />
        </>
    );
};

export default MainLayout;
