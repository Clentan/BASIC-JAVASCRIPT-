import React, { useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../DATABASE/firebase";
import Activity from "../ACTIVITY/activity";


export default function SignUp() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		name: "",
		username: "",
	});
	const [error, setError] = useState("");
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		const { email, password, name, username } = formData;
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const userId = userCredential.user.uid; // Get the user ID
				// Add user data to Firestore users collection with user ID
				const userRef = doc(db, "users", userId); // Specify the collection reference and document ID separately
				return setDoc(userRef, {
					personalInfo: {
						email,
						name,
						username,
						password,
						userId,
					},
					activity: { points: 5 },
				});
			})

			.then(() => {
				// Automatic sign-in after successful account creation
				return signInWithEmailAndPassword(auth, email, password).then(
					navigate("/")
				);
			})
			.then(() => {
				setError("User signed up successfully!");
			})
			.catch((error) => {
				if (error.code === "auth/email-already-in-use") {
					setError(
						"This email is already in use. Please try a different email."
					);
				} else {
					setError("Error signing up: " + error.message);
				}
			});
	};

	return (
		<div
			className=" bg-gradient-to-b from-blue-500 to-white min-h-screen brightness-75 bg-center bg-no-repeat h-screen flex items-center justify-center"
		>
			<div className="w-full max-w-md p-6  rounded-lg shadow-lg">
				{error && <div className="text-red-500 text-center mb-4">{error}</div>}

				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-800 mb-3">
						Weli
					</h1>
					<p className="text-gray-600">
						<strong>what our app is about.</strong>
					</p>
				</div>
				<form className="mt-6">
					<div className="mb-6">
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
							placeholder="Enter name"
						/>
					</div>
					<div className="mb-6">
						<input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
							placeholder="Enter username"
						/>
					</div>
					<div className="mb-6">
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
							placeholder="Enter Email"
						/>
					</div>
					<div className="mb-6">
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
							placeholder="Enter Password"
						/>
					</div>
					<div className="text-center">
						<button
							onClick={handleSubmit}
							className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
						>
							SIGN Up
						</button>
					</div>
				</form>
				<div className="mt-6 flex items-center justify-between">
					<div className="flex items-center">
						<input
							type="checkbox"
							id="remember-me"
							className="form-checkbox h-4 w-4 text-blue-500"
						/>
						<label htmlFor="remember-me" className="ml-2 text-gray-700">
							Remember Me
						</label>
					</div>
				</div>

				<div className="mt-6 text-center">
					<p className="text-gray-600">
						Don't Have an Account Yet?{" "}
						<Link to="/signin" className="text-blue-500 hover:text-blue-700">
							Login Now.
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
