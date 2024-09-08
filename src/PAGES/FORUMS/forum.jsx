

import { arrayUnion, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../PROVIDERS/DataProvider";
import { db } from "../../DATABASE/firebase";

export default function Forum() {
	const { id } = useParams();
	const { currentUser } = useAuth();
	const user = currentUser.personalInfo
	const [forum, setForum] = useState(null);
	const [posts, setPosts] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const chatContainerRef = useRef(null);

	useEffect(() => {
		const docRef = doc(db, "forums", id);

		const unsubscribe = onSnapshot(docRef, (docSnap) => {
			if (docSnap.exists()) {
				const data = docSnap.data();
				setForum(data);
				setPosts(data.posts || []);
			}
		});

		// Cleanup on unmount
		return () => unsubscribe();
	}, [id]);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [posts]);

	const handleSendMessage = async () => {
		if (newMessage.trim()) {
			const newPost = {
				id: Date.now(), // Unique ID for each post
				user: `${user.name}`,
				content: newMessage,
			};

			const postRef = doc(db, "forums", id);
			await updateDoc(postRef, {
				posts: arrayUnion(newPost)
			});

			setNewMessage("");
		}
	};

	const handleSendMessageAndScroll = () => {
		handleSendMessage();
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	};

	if (!forum) {
		return <div>loading</div>;
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
						className={`mb-2 rounded flex ${post.user === `${user.username}` ? "justify-end" : "justify-start"}`}
					>
						<div className={`max-w-xs p-2 ${post.user === `${user.username}` ? "bg-blue-100" : "bg-gray-100"}`}>
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
					onClick={handleSendMessageAndScroll}
					className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-800 transition-colors"

				>
					Send
				</button>
			</div>
		</div>
	);
}

