
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const CurrentUser = {
	personalInfo: {
		firstName: "John",
		surname: "Doe",
		email: "john.doe@example.com",
		avatar: "https://example.com/avatar.jpg",
		role: "student",
	},
};

export default function Forum() {
	const { id } = useParams();
	const user = CurrentUser.personalInfo;
	const [forum, setForum] = useState(null);
	const [posts, setPosts] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const chatContainerRef = useRef(null);

	// Mock forum data
	const mockForums = [
		{
			id: "1",
			name: "Mathematics Discussion",
			description: "Discuss all things related to mathematics.",
			posts: [
				{ id: "101", user: "John Doe", content: "What is the quadratic formula?" },
				{ id: "102", user: "Jane Smith", content: "It's x = (-b ± √(b² - 4ac)) / 2a." },
			],
		},
		{
			id: "2",
			name: "Science Help",
			description: "A place to talk about science subjects.",
			posts: [
				{ id: "201", user: "Mark Taylor", content: "What’s the difference between speed and velocity?" },
				{ id: "202", user: "Alice Johnson", content: "Velocity includes direction, speed doesn’t." },
			],
		},
	];

	useEffect(() => {
		// Simulate fetching forum from mock data by ID
		const foundForum = mockForums.find((forum) => forum.id === id);
		if (foundForum) {
			setForum(foundForum);
			setPosts(foundForum.posts || []);
		}
	}, [id]);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [posts]);

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			const newPost = {
				id: Date.now().toString(), // Unique ID for each post
				user: `${user.firstName} ${user.surname}`,
				content: newMessage,
			};

			setPosts((prevPosts) => [...prevPosts, newPost]);
			setNewMessage("");

			if (chatContainerRef.current) {
				chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
			}
		}
	};

	if (!forum) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-full mx-auto">
			<h1 className="text-3xl text-mygreen font-bold mb-4">{forum.name}</h1>
			<p className="text-gray-600 mb-6">{forum.description}</p>

			<div
				ref={chatContainerRef}
				className="mb-6 p-4 border rounded shadow-sm h-[350px] overflow-y-auto flex flex-col"
			>
				{posts.map((post) => (
					<div
						key={post.id}
						className={`mb-2 rounded flex ${post.user === `${user.firstName} ${user.surname}` ? "justify-end" : "justify-start"
							}`}
					>
						<div
							className={`max-w-xs p-2 ${post.user === `${user.firstName} ${user.surname}` ? "bg-blue-100" : "bg-gray-100"
								}`}
						>
							<p className="font-semibold">{post.user}:</p>
							<p>{post.content}</p>
						</div>
					</div>
				))}
			</div>
			<div className="flex items-center space-x-2">
				<input
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder="Type a message..."
					className="flex-1 p-2 border rounded shadow-sm"
				/>
				<button
					onClick={handleSendMessage}
					className="bg-mygreen text-white px-4 py-2 rounded shadow hover:bg-green-800 transition-colors"
				>
					Send
				</button>
			</div>
		</div>
	);
}

