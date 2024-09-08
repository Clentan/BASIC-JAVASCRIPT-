
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Forums() {
	const [searchTerm, setSearchTerm] = useState("");
	const [forums, setForums] = useState([]);

	// Mock array of forum data
	const mockForums = [
		{
			id: "1",
			name: "Mathematics Discussion",
			description: "Discuss all things related to mathematics.",
			tags: ["math", "algebra", "calculus"],
		},
		{
			id: "2",
			name: "Science Help",
			description: "A place to talk about science subjects.",
			tags: ["science", "biology", "chemistry"],
		},
		{
			id: "3",
			name: "History Talk",
			description: "Share insights on historical events.",
			tags: ["history", "wars", "civilizations"],
		},
		{
			id: "4",
			name: "Technology and Coding",
			description: "Discuss the latest in tech and coding practices.",
			tags: ["coding", "javascript", "python", "tech"],
		},
		{
			id: "5",
			name: "Language and Literature",
			description: "Dive deep into languages and literary analysis.",
			tags: ["language", "literature", "poetry"],
		},
		{
			id: "6",
			name: "Social Studies Corner",
			description: "Explore topics in social studies and current affairs.",
			tags: ["social", "politics", "society"],
		},
	];

	const filteredForums = forums.filter((forum) =>
		forum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		forum.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	useEffect(() => {
		// Simulate fetching data from Firebase by using the mock data
		setForums(mockForums);
	}, []);

	return (
		<div>
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

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredForums.length > 0 ? (
					filteredForums.map((forum) => (
						<Link className="h-52" to={`/forums/${forum.id}`} key={forum.id}>
							<div className="bg-white h-full p-4 border rounded shadow-lg hover:shadow-xl transition-shadow">
								<h2 className="text-xl text-mygreen font-semibold mb-2">{forum.name}</h2>
								<p className="text-gray-600 mb-4">{forum.description}</p>
								<div className="text-gray-500 text-sm">
									<span className="font-semibold text-blue-500">Tags:</span> {forum.tags.join(", ")}
								</div>
							</div>
						</Link>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}

