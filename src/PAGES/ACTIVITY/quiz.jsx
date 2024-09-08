
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Quiz() {
	const { subject } = useParams(); // Get the subject from the URL
	const [quizQuestions, setQuizQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // To track the current question
	const [userAnswer, setUserAnswer] = useState('');
	const [feedback, setFeedback] = useState(null); // Feedback for the current question
	const [score, setScore] = useState(0);
	const [quizFinished, setQuizFinished] = useState(false);
	const [submitHighlighted, setSubmitHighlighted] = useState(false); // To track button highlight

	// Sample questions for different subjects
	const allQuizData = {
		math: [
			{
				question: 'What is 2 + 2?',
				options: ['3', '4', '5', '6'],
				correctAnswer: '4',
			},
			{
				question: 'Solve for x: 5x = 25',
				options: ['3', '4', '5', '6'],
				correctAnswer: '5',
			},
		],
		science: [
			{
				question: 'Which planet is known as the Red Planet?',
				options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
				correctAnswer: 'Mars',
			},
			{
				question: 'What is the chemical symbol for water?',
				options: ['H2O', 'O2', 'CO2', 'N2'],
				correctAnswer: 'H2O',
			},
		],
	};

	// Load the questions for the selected subject
	useEffect(() => {
		if (subject && allQuizData[subject]) {
			setQuizQuestions(allQuizData[subject]);
		} else {
			setQuizQuestions([]);
		}
	}, [subject]);

	// Handle answer submission for each question
	const handleSubmitAnswer = () => {
		const currentQuestion = quizQuestions[currentQuestionIndex];
		if (userAnswer === currentQuestion.correctAnswer) {
			setScore(score + 1);
			setFeedback('Correct!');
		} else {
			setFeedback(`Incorrect! The correct answer was ${currentQuestion.correctAnswer}`);
		}

		// Move to the next question after 2 seconds
		setTimeout(() => {
			setFeedback(null);
			setUserAnswer('');
			setSubmitHighlighted(false); // Reset the button highlight

			// Check if there are more questions left
			if (currentQuestionIndex < quizQuestions.length - 1) {
				setCurrentQuestionIndex(currentQuestionIndex + 1);
			} else {
				setQuizFinished(true);
			}
		}, 1000); // Wait 2 seconds before showing the next question
	};

	// Handle the option selection and highlight the submit button
	const handleOptionChange = (option) => {
		setUserAnswer(option);
		setSubmitHighlighted(true); // Highlight the submit button after selection
	};

	return (
		<div className="p-6">
			{/* Quiz Heading */}
			{!quizFinished &&
				<div className="text-center pb-6">
					<h1 className="text-4xl font-bold text-[#0496ff]">{subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz</h1>
					<p className="mt-2 text-gray-600">Answer the questions below one by one.</p>
				</div>}

			{/* Quiz Content */}
			{!quizFinished ? (
				<div className="bg-white shadow-xl rounded-lg p-6">
					{quizQuestions.length > 0 && (
						<>
							<h3 className="text-lg font-bold text-gray-800">{quizQuestions[currentQuestionIndex].question}</h3>
							<div className="mt-4">
								{quizQuestions[currentQuestionIndex].options.map((option, i) => (
									<label key={i} className="block mb-2">
										<input
											type="radio"
											name={`question-${currentQuestionIndex}`}
											value={option}
											onChange={() => handleOptionChange(option)}
											className="mr-2"
											checked={userAnswer === option}
										/>
										{option}
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
									disabled={!userAnswer} // Disabled if no option is selected
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
						</>
					)}
				</div>
			) : (
				<div className="text-center">
					<h2 className="text-2xl font-bold text-[#0496ff]">Quiz Finished!</h2>
					<p className="mt-4 text-gray-600">Your final score is: {score}/{quizQuestions.length}</p>
				</div>
			)}
		</div>
	);
}

