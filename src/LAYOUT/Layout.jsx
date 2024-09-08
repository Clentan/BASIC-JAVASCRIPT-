import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useAuth } from "../PROVIDERS/DataProvider";
import Thuso from "../PAGES/THUSO/thuso";

const Layout = () => {

	const { currentUser, loading } = useAuth();

	if (loading) {
		return <h1>Loading</h1>
	}


	if (!currentUser) { return <Navigate to="/landing" replace /> }

	return (
		<div className="min-h-screen w-full flex flex-col">
			<header className="w-full border-b shadow-lg z-40 ">
				<Navbar />
			</header>

			<div className="p-8"> </div>
			<div className="flex flex-grow">
				<aside className="z-50 border-r h-screen w-1/5 fixed top-0 bottom-0 pt-10">
					<Sidebar />
				</aside>
				<main className="ml-[20%]  border-t w-full p-6  min-h-screen">
					<Outlet />
				</main>
			</div>
			<Thuso />
		</div>
	);
};

export default Layout;
