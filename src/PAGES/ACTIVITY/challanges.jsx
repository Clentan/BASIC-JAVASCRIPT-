
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../PROVIDERS/DataProvider';
import { db } from '../../DATABASE/firebase';

export default function Challenges() {

	const { currentUser } = useAuth();
	const { subject, topic } = useParams(); // Get the subject and topic from the URL
	const [quizQuestions, setQuizQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswer, setUserAnswer] = useState('');
	const [feedback, setFeedback] = useState(null);
	const [score, setScore] = useState(0);
	const [quizFinished, setQuizFinished] = useState(false);
	const [submitHighlighted, setSubmitHighlighted] = useState(false);
	const [loading, setLoading] = useState(false);

	// Handle AI quiz generation based on topic
	const handleGenerateQuiz = async () => {
		setLoading(true);
		await getResponseForGivenPrompt(topic);
		setLoading(false);
	};

	const genAI = new GoogleGenerativeAI('AIzaSyAwF4LvkcPAB1CkeC40QSI88htYAr1sFfs');

	const getResponseForGivenPrompt = async (prompt) => {
		try {
			const message = `
        Generate a quiz with 5 questions and 4 choices on each question:
return in this structure
        [
          {
            "question": "question text",
            "choices": [
              {
                "answer": "choice 1",
                "isCorrect": true or false
              },
              {
                "answer": "choice 2",
                "isCorrect": true or false
              }
              // More choices
            ]
          }
          // More questions
        ]
        Please generate a quiz based on the topic: ${prompt}, this user is a grade 12 student in South Africa and the topic is from the subject ${subject}.
      `;

			const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
			const result = await model.generateContent(message);
			const text = await result.response.text();
			const quizData = convertJsonToObject(text);

			if (quizData) {
				setQuizQuestions(quizData);
			} else {
				console.error('Failed to generate quiz with the topic provided.');
			}
		} catch (error) {
			console.error('Error generating content:', error);
		}
	};



	const handleSubmitAnswer = async () => {
		const currentQuestion = quizQuestions[currentQuestionIndex];
		const selectedChoice = currentQuestion.choices.find(choice => choice.answer === userAnswer);

		// Track correct answers
		if (selectedChoice && selectedChoice.isCorrect) {
			setCorrectAnswers(prev => prev + 1);
			setFeedback('Correct!');
		} else {
			setFeedback(`Incorrect! The correct answer was ${currentQuestion.choices.find(choice => choice.isCorrect).answer}`);
		}

		setTimeout(async () => {
			setFeedback(null);
			setUserAnswer('');
			setSubmitHighlighted(false);

			// Move to the next question or finish the quiz
			if (currentQuestionIndex < quizQuestions.length - 1) {
				setCurrentQuestionIndex(prevIndex => prevIndex + 1);
			} else {
				setQuizFinished(true);

				// Determine if the user answered all questions correctly
				if (correctAnswers === quizQuestions.length) {
					// Award points (4 points) since all answers are correct
					try {
						const userRef = doc(db, "users", currentUser.userId);

						// Update the "points" field within the "activity" document
						await updateDoc(userRef, {
							"activity.points": currentUser.activity.points + 4, // Award 4 points
						});

						console.log('Points updated successfully.');
					} catch (error) {
						console.error('Error updating points:', error);
					}
				} else {
					console.log('Not all answers were correct. No points awarded.');
				}
			}
		}, 2000);
	};



	const handleOptionChange = (option) => {
		setUserAnswer(option);
		setSubmitHighlighted(true);
	};

	useEffect(() => {
		if (topic) {
			handleGenerateQuiz();
		}
	}, [topic]);


	return (
		<div className="p-6">
			{/* Loading Spinner */}
			{loading ? (
				<div className="text-center mt-4">
					<p>Generating quiz... Please wait.</p>
				</div>
			) : (
				<>
					{/* Quiz Heading */}
					{!quizFinished && quizQuestions.length > 0 && (
						<div className="text-center pb-6">
							<h1 className="text-4xl font-bold text-[#0496ff]">
								{subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz
							</h1>
							<p className="mt-2 text-gray-600">Answer the questions below one by one.</p>
						</div>
					)}

					{/* Quiz Content */}
					{!quizFinished && quizQuestions.length > 0 && (
						<div className="bg-white shadow-xl rounded-lg p-6">
							<h3 className="text-lg font-bold text-gray-800">
								{quizQuestions[currentQuestionIndex].question}
							</h3>
							<div className="mt-4">
								{quizQuestions[currentQuestionIndex].choices.map((choice, i) => (
									<label key={i} className="block mb-2">
										<input
											type="radio"
											name={`question-${currentQuestionIndex}`}
											value={choice.answer}
											onChange={() => handleOptionChange(choice.answer)}
											className="mr-2"
											checked={userAnswer === choice.answer}
										/>
										{choice.answer}
									</label>
								))}
							</div>

							{/* Submit Button */}
							<div className="text-center mt-6">
								<button
									className={`px-6 py-3 rounded-lg text-white ${submitHighlighted
										? 'bg-[#0496ff] hover:bg-[#0384e6]'
										: 'bg-gray-300 cursor-not-allowed'
										}`}
									onClick={handleSubmitAnswer}
									disabled={!userAnswer}
								>
									Submit Answer
								</button>
							</div>

							{/* Feedback for the current question */}
							{feedback && (
								<div className="text-center mt-6">
									<h2 className="text-xl font-bold text-[#0496ff]">{feedback}</h2>
								</div>
							)}
						</div>
					)}

					{quizFinished && (
						<div className="text-center">
							<h2 className="text-2xl font-bold text-[#0496ff]">Quiz Finished!</h2>
							<p className="mt-4 text-gray-600">
								Your final score is: {score}/{quizQuestions.length * 4} {/* Total possible points */}
							</p>
						</div>
					)}

				</>
			)}
		</div>
	);
}

const convertJsonToObject = (jsonString) => {
	try {
		// Clean the input string if needed
		let cleanedString = jsonString;

		// Check if the response is surrounded by triple backticks (indicating code block)
		if (cleanedString.startsWith('```') && cleanedString.endsWith('```')) {
			cleanedString = cleanedString.slice(3, -3); // Remove the leading and trailing backticks
		}

		// Try to parse the cleaned string as JSON
		const jsonObject = JSON.parse(cleanedString);

		// Validate the expected structure of the parsed object
		if (
			Array.isArray(jsonObject) &&
			jsonObject.every(q =>
				q.question &&
				Array.isArray(q.choices) &&
				q.choices.every(choice => choice.answer && typeof choice.isCorrect === 'boolean')
			)
		) {
			return jsonObject;
		} else {
			throw new Error("Invalid JSON structure");
		}
	} catch (error) {
		console.error("Error parsing JSON:", error);
		console.error("Received JSON:", jsonString); // Log the received JSON for debugging
		return null;
	}
};


