

import {
	signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth, storage } from "../../DATABASE/firebase";
import { useAuth } from "../../PROVIDERS/DataProvider";

export default function Signin() {
	const navigate = useNavigate();
	const { currentUser } = useAuth();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		const { email, password } = formData;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log(currentUser)
			// navigate("/");
		} catch (error) {
			if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
				setError("Invalid Email or Password");
			} else {
				setError("Error signing in: " + error.message);
			}
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, [currentUser, navigate]);

	return (
		<div className="p-8 bg-center bg-no-repeat bg-gradient-to-b from-blue-500 to-white min-h-screen flex flex-col justify-center items-center">
			<div className="flex flex-col items-center space-y-4">
				<h1 className="font-bold text-5xl text-white">WELCOME</h1>
				{error && <div className="text-red-500 text-center mb-4">{error}</div>}
			</div>

			<div className="bg-white rounded-lg shadow-lg p-8 mt-8 max-w-md w-full">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
							placeholder="Enter Email"
							required
						/>
					</div>
					<div>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
							placeholder="Enter Password"
							required
						/>
					</div>

					<div className="text-center">
						<button
							type="submit"
							disabled={!formData.email || !formData.password || loading}
							className={`font-bold text-white bg-blue-600 px-6 py-3 text-xl rounded-full focus:outline-none ${!formData.email || !formData.password || loading
								? 'bg-gray-400 text-gray-700 cursor-not-allowed'
								: 'hover:bg-blue-700 focus:bg-blue-600'
								}`}
						>
							{loading ? "Loading..." : "Sign In"}
						</button>
					</div>
					<div className="text-center mt-4">
						<h2 className="font-semibold">
							Don't Have an Account Yet?{" "}
							<Link to="/signup" className="text-blue-500 hover:text-blue-700">
								Register Now
							</Link>
						</h2>
					</div>
				</form>
			</div>
		</div>
	);
}

