import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

const Layout = () => {
	return (
		<div className="min-h-screen w-full flex flex-col">
			<header className="w-full  shadow-lg z-40 ">
				<Navbar />
			</header>

			<div className="p-8"> </div>
			<div className="flex flex-grow">
				<aside className="z-50 border-r h-screen w-1/5 fixed top-0 bottom-0 pt-16">
					<Sidebar />
				</aside>
				<main className="ml-[20%]  border-t w-full p-6  min-h-screen">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Layout;
