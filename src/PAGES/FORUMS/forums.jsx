

import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../DATABASE/firebase";

export default function Forums() {
	const [searchTerm, setSearchTerm] = useState("");
	const [forums, setForums] = useState([]);

	const filteredForums = forums.filter(forum =>
		forum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		forum.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	useEffect(() => {
		async function fetchForums() {
			const querySnapshot = await getDocs(collection(db, "forums"));
			const forumsData = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setForums(forumsData);
		}
		fetchForums();
	}, []);

	return (
		<div className="">
			<h1 className="text-3xl font-bold mb-6">Matric<span className="text-mygreen">IQ</span> Forums</h1>

			<div className="mb-6">
				<input
					type="text"
					placeholder="Search forums by name or tag..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full p-2 border rounded"
				/>
			</div>

			<div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredForums.length > 0 ? (
					filteredForums.map((forum) => (
						<Link className="h-52 " to={`${forum.id}`} key={forum.id}>
							<div className="bg-white  h-full p-4 border rounded shadow-lg hover:shadow-xl transition-shadow">
								<h2 className="text-xl text-mygreen font-semibold mb-2">{forum.name}</h2>
								<p className="text-gray-600 mb-4">{forum.description}</p>
								<div className="text-gray-500 text-sm">
									<span className="font-semibold text-mygreen">Tags:</span> {forum.tags.join(", ")}
								</div>
							</div>
						</Link>
					))
				) : (
					<p>Loading.</p>
				)}
			</div>
		</div>
	);
}

