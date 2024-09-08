
import { Link } from "react-router-dom";

export default function Activity() {
	const subjects = ["math", "science", "history", "literature", "geology"];

	const colors = ['#0056b3', '#004494', '#003d79', '#007bff', '#66aaff'];

	return (
		<div className="">
			{/* Heading */}
			<div className="pb-6">
				<h1 className="text-4xl font-bold text-[#0056b3]">Activities</h1>
				<p className="mt-2 text-gray-700">Attempt Quizzes and Challenge Your Friends</p>
			</div>

			{/* Quiz Categories */}
			<div className="bg-white rounded-lg divide-y divide-gray-200">
				<div className="p-6">
					<h2 className="text-2xl font-bold text-[#0056b3]">Quiz Categories</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
						{subjects.map((subject, index) => {
							const bgColor = colors[index % colors.length];
							const hoverColor = colors[(index + 1) % colors.length];
							return (
								<Link to={`quiz/${subject}`} key={subject}>
									<div
										className="text-white rounded-lg p-6 cursor-pointer"
										style={{ backgroundColor: bgColor, transition: 'background-color 0.3s' }}
										onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverColor}
										onMouseLeave={(e) => e.currentTarget.style.backgroundColor = bgColor}
									>
										<h3 className="text-lg font-semibold">{subject}</h3>
										<p className="mt-2">Attempt quizzes and improve your skills.</p>
									</div>
								</Link>
							);
						})}
					</div>
				</div>

				{/* Challenge Section */}
				<div className="p-6">
					<h2 className="text-2xl font-bold text-[#0056b3]">Challenge a Friend</h2>
					<div className="flex flex-col sm:flex-row sm:justify-between mt-6">
						<div className="flex-1 mb-4 sm:mb-0">
							<input
								type="text"
								placeholder="Enter friend's username"
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3]"
							/>
						</div>
						<button className="px-6 py-3 bg-[#0056b3] text-white rounded-lg hover:bg-[#003d79]">
							Send Challenge
						</button>
					</div>
					<p className="text-gray-600 mt-2">Challenge a friend to see who scores the highest on quizzes.</p>
				</div>

				{/* Leaderboard */}
				<div className="p-6">
					<h2 className="text-2xl font-bold text-[#0056b3]">Leaderboard</h2>
					<div className="mt-6">
						<table className="min-w-full table-auto bg-white rounded-lg overflow-hidden shadow-lg">
							<thead className="bg-[#0056b3]">
								<tr>
									<th className="px-4 py-2 text-white text-left">Rank</th>
									<th className="px-4 py-2 text-white text-left">Username</th>
									<th className="px-4 py-2 text-white text-left">Points</th>
								</tr>
							</thead>
							<tbody>
								{[
									{ rank: 1, username: 'Alice', points: 2000 },
									{ rank: 2, username: 'Bob', points: 1750 },
									{ rank: 3, username: 'Charlie', points: 1600 },
								].map(({ rank, username, points }) => (
									<tr key={username} className="border-t border-gray-200">
										<td className="px-4 py-2 text-gray-800">{rank}</td>
										<td className="px-4 py-2 text-gray-800">{username}</td>
										<td className="px-4 py-2 text-gray-800">{points}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

