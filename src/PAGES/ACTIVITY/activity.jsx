
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../DATABASE/firebase";

export default function Activity() {
	const subjects = ["Math", "Science", "History", "Literature", "Geology"];
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [customTopic, setCustomTopic] = useState("");


	// Mock topics for each subject
	const topics = {
		Math: ["Algebra", "Geometry", "Calculus"],
		Science: ["Physics", "Chemistry", "Biology"],
		// Add topics for other subjects...
	};

	const [leaderboardData, setLeaderboardData] = useState([]);

	const getLeaderboard = () => {
		const users = [];
		try {
			const q = query(collection(db, "users")); // Adjust the collection name if needed
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				users.length = 0; // Clear the users array

				querySnapshot.forEach((doc) => {
					users.push(doc.data());
				});

				// Assuming the points are under user.activity.points
				const sortedUsers = users
					.map(user => ({
						username: user?.personalInfo?.username,
						points: user.activity?.points || 0,
					}))
					.sort((a, b) => b.points - a.points);

				setLeaderboardData(sortedUsers);
			});

			// Cleanup subscription on component unmount
			return () => unsubscribe();
		} catch (error) {
			console.error("Error fetching leaderboard data:", error);
		}
	};


	useEffect(() => {
		getLeaderboard()
	}, []);


	return (
		<div className="bg-white ">
			{/* Heading */}
			{/* Daily Quiz 
			<div className="mb-8 bg-white shadow-lg p-6 rounded-lg">
				<h2 className="text-2xl font-bold text-[#0056b3]">Daily Quiz</h2>
				<p className="mt-2 text-gray-600">Test your knowledge with today’s quiz and improve your skills!</p>
				<Link to="/daily-quiz">
					<button className="mt-4 px-6 py-3 bg-[#0056b3] text-white rounded-lg hover:bg-[#003d79]">
						Take Today’s Quiz
					</button>
				</Link>
			</div>
			*/}

			{/* Quiz Categories */}
			<div className="mb-8 bg-white shadow-lg p-6 rounded-lg">
				<h2 className="text-2xl font-bold text-[#0056b3]">Practice Quizzes</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
					{subjects.map((subject, index) => (
						<div
							key={index}

							className="text-white rounded-lg p-6 cursor-pointer"
							style={{ backgroundColor: '#0056b3' }}
							onClick={() => setSelectedSubject(subject)} // Set subject on click
						>
							<h3 className="text-lg font-semibold">{subject}</h3>
						</div>
					))}
				</div>
			</div>


			{/* Challenge a Friend */}
			<div className="mb-8 bg-white shadow-lg p-6 rounded-lg">
				<h2 className="text-2xl font-bold text-[#0056b3]">Challenge a Friend</h2>
				<p className="mt-2 text-gray-600">Send a challenge to your friends and see who scores the highest!</p>
				<div className="flex flex-col sm:flex-row sm:justify-between mt-6">
					<input
						type="text"
						placeholder="Enter friend's username"
						className="w-full sm:w-2/3 p-3 mb-4 sm:mb-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3]"
					/>
					<button className="px-6 py-3 bg-[#0056b3] text-white rounded-lg hover:bg-[#003d79]">
						Send Challenge
					</button>
				</div>
			</div>

			{/* Leaderboard */}
			<div className="mb-8 bg-white shadow-lg p-6 rounded-lg">
				<h2 className="text-2xl font-bold text-[#0056b3]">Leaderboard</h2>
				<p className="mt-2 text-gray-600">See the top performers on the leaderboard.</p>
				<div className="mt-6">
					<table className="min-w-full table-auto bg-white rounded-lg shadow-lg">
						<thead className="bg-[#0056b3]">
							<tr>
								<th className="px-4 py-2 text-white text-left">Rank</th>
								<th className="px-4 py-2 text-white text-left">Username</th>
								<th className="px-4 py-2 text-white text-left">Points</th>
							</tr>
						</thead>
						<tbody>
							{leaderboardData.map((user, index) => (
								<tr key={user.username} className="border-t border-gray-200">
									<td className="px-4 py-2 text-gray-800">{index + 1}</td>
									<td className="px-4 py-2 text-gray-800">{user.username}</td>
									<td className="px-4 py-2 text-gray-800">{user.points}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Popup */}
			{selectedSubject && (
				<div className="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h3 className="text-2xl font-bold text-[#0056b3]">{selectedSubject} Topics</h3>

						{/* List of topics */}
						<div className="mt-4">
							{topics[selectedSubject]?.map((topic) => (
								<div key={topic} className="py-2">
									<label className="text-gray-700">
										<input
											type="radio"
											name="topic"
											value={topic}
											className="mr-2"
											onChange={(e) => setCustomTopic(e.target.value)}
										/>
										{topic}
									</label>
								</div>
							))}
						</div>

						{/* Custom topic input */}
						<div className="mt-4">
							<input
								type="text"
								placeholder="Enter your custom topic"
								className="w-full p-2 border border-gray-300 rounded-lg"
								value={customTopic}
								onChange={(e) => setCustomTopic(e.target.value)}
							/>
						</div>

						{/* Buttons */}
						<div className="mt-6 flex justify-between">
							<Link
								to={`practicequiz/${selectedSubject.toLowerCase()}/${customTopic && customTopic.trim() !== "" ? customTopic.toLowerCase() : selectedSubject.toLowerCase()}`}
							>
								<button
									className="px-4 py-2 bg-[#0056b3] text-white rounded-lg"
									onClick={() => console.log(`Selected: ${selectedSubject}, Custom Topic: ${customTopic}`)}
								>
									Start Quiz
								</button>
							</Link>
							<button
								className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
								onClick={() => setSelectedSubject(null)} // Close popup
							>
								Cancel
							</button>
						</div>




					</div>
				</div>
			)
			}
		</div >
	);
}

