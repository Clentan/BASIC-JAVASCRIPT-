
import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function Thuso() {
	const [inputValue, setInputValue] = useState('');
	const [promptResponses, setPromptResponses] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isChatOpen, setIsChatOpen] = useState(false);
	const chatContainerRef = useRef(null);

	const genAI = new GoogleGenerativeAI('AIzaSyAwF4LvkcPAB1CkeC40QSI88htYAr1sFfs');

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const getResponseForGivenPrompt = async (prompt) => {
		const message = prompt || inputValue;
		if (!message) return;

		try {
			setLoading(true);
			const model = genAI.getGenerativeModel({ model: "gemini-pro" });
			const result = await model.generateContent(message);
			const text = result.response.text();

			setPromptResponses([...promptResponses, { user: "You", content: message }, { user: "Bot", content: text }]);
			setInputValue('');
			setLoading(false);
			scrollToBottom();
		} catch (error) {
			console.log("Something went wrong", error);
			setLoading(false);
		}
	};

	const scrollToBottom = () => {
		chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const suggestedQuestions = [
		"How can I apply for university scholarships?",
		"What are the best study tips for Matric exams?",
		"How do I choose the right university course?",
		"Can you help me with time management?",
		"What should I include in my university application?"
	];

	return (
		<div className='fixed bottom-10 right-5'>

			<div
				className={`transition-all transform ${isChatOpen ? 'w-[450px] h-[600px] p-5' : 'w-16 h-16 p-0'} bg-white shadow-lg rounded-lg flex flex-col justify-between border border-blue-500`}
			>
				{/* Chat Header */}
				<div className={`w-full ${isChatOpen ? 'block' : 'hidden'} `}>
					<div className="flex justify-between items-center mb-4">
						<h1 className="text-2xl font-bold text-blue-600">Thuso</h1>
						<button onClick={() => setIsChatOpen(false)} className="text-lg font-bold text-blue-500">
							✖
						</button>
					</div>

					{/* Chat Messages */}
					<div
						ref={chatContainerRef}
						className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm h-[400px] overflow-y-auto flex flex-col space-y-2"
					>
						{promptResponses.length === 0 && !loading ? (
							<div className="flex flex-col items-center justify-center h-full">
								<div className='p-8' />
								<h2 className="text-lg font-semibold text-blue-600 mb-2">Need help with anything?</h2>
								<p className="text-gray-500 mb-4">Click on a question below to get started:</p>
								<div className="space-y-2">
									{suggestedQuestions.map((question, index) => (
										<button
											key={index}
											onClick={() => getResponseForGivenPrompt(question)}
											className="block w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
										>
											{question}
										</button>
									))}
								</div>
							</div>
						) : (
							promptResponses.map((post, index) => (
								<div
									key={index}
									className={`flex ${post.user === "You" ? "justify-end" : "justify-start"}`}
								>
									<div className={`max-w-xl p-3 rounded-lg shadow-lg ${post.user === "You" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
										<p className="font-semibold">{post.user}:</p>
										<p>{post.content}</p>
									</div>
								</div>
							))
						)}
						{loading && (
							<div className="flex justify-start mb-2">
								<div className="max-w-xs p-3 rounded-lg bg-gray-200">
									<p className="font-semibold">Thuso:</p>
									<div className="spinner-border text-primary" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
								</div>
							</div>
						)}

						<div className='p-8' />
					</div>

					<div className="flex items-center space-x-2 w-full">
						<input
							type="text"
							value={inputValue}
							onChange={handleInputChange}
							placeholder="Ask me anything..."
							className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							onClick={() => getResponseForGivenPrompt()}
							className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex-shrink-0"
						>
							Send
						</button>
					</div>


				</div>

				{/* Chat Toggle Button */}
				<button
					className={`bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors ${isChatOpen ? 'hidden' : 'block'}`}
					onClick={() => setIsChatOpen(!isChatOpen)}
				>
					💬
				</button>
			</div>
		</div>
	);
}

