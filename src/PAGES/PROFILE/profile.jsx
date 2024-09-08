

import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from "../../DATABASE/firebase";
import { useAuth } from "../../PROVIDERS/DataProvider";

const StudentPage = () => {
	const { currentUser } = useAuth()
	const [formData, setFormData] = useState({
		personalInfo: {
			firstName: '',
			surname: '',
			dob: '01/01/2000',
			gender: 'Male',
		},
		academicResults: {
			term1Results: { subject: 'Math', grade: 'A' },
			term2Results: { subject: 'Science', grade: 'B' },
			term3Results: { subject: 'History', grade: 'A' },
			term4Results: { subject: 'Geography', grade: 'C' },
		},
		careerGoals: {
			shortTermGoals: { description: 'Pass all exams', targetDate: '31/12/2024' },
			longTermGoals: { description: 'Become a software engineer', targetDate: '31/12/2030' },
		},
		additionalInfo: {
			extracurricularActivities: 'Basketball, Coding Club',
			hobbiesAndInterests: 'Reading, Traveling',
			academicAchievements: 'Top of the class in Math and Science',
		},
	});

	const [editMode, setEditMode] = useState({
		personalInfo: false,
		academicResults: false,
		careerGoals: false,
		additionalInfo: false,
	});

	const toggleEditMode = (section) => {
		setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name.split('.')[0]]: {
				...prev[name.split('.')[0]],
				[name.split('.')[1]]: value,
			},
		}));
	};

	useEffect(() => {
		if (currentUser) {
			// If userDataProvider is available, set formData with the fetched user data
			setFormData({
				...formData,
				personalInfo: currentUser.personalInfo,
			});
		}
	}, [currentUser]);

	const handleDateChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name.split('.')[0]]: {
				...prev[name.split('.')[0]],
				[name.split('.')[1]]: value,
			},
		}));
	};

	const handleSave = async (section) => {
		console.log(`${section} Data:`, formData[section]);
		toggleEditMode(section);

		const userRef = doc(db, "users", currentUser.uid);
		await updateDoc(userRef, {
			[`${section}`]: formData[section]
		});
	};

	return (
		<div className="p-6">
			{/* Personal Information */}
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-4">Personal Information</h2>
				{editMode.personalInfo ? (
					<>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">First Name</label>
							<input
								type="text"
								name="personalInfo.firstName"
								value={formData.personalInfo.firstName}
								onChange={handleChange}
								className="w-full p-2 border rounded-md shadow-sm"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Surname</label>
							<input
								type="text"
								name="personalInfo.surname"
								value={formData.personalInfo.surname}
								onChange={handleChange}
								className="w-full p-2 border rounded-md shadow-sm"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Date of Birth</label>
							<input
								type="text"
								name="personalInfo.dob"
								value={formData.personalInfo.dob}
								onChange={handleDateChange}
								placeholder="DD/MM/YYYY"
								className="w-full p-2 border rounded-md shadow-sm"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Gender</label>
							<select
								name="personalInfo.gender"
								value={formData.personalInfo.gender}
								onChange={handleChange}
								className="w-full p-2 border rounded-md shadow-sm"
							>
								<option value="">Select Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<button
							onClick={() => toggleEditMode('personalInfo')}
							className="bg-green-600 text-white px-4 py-2 rounded-md shadow mt-4 hover:bg-green-800 transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={() => handleSave('personalInfo')}
							className="bg-green-600 text-white px-4 py-2 rounded-md shadow mt-2 ml-2 hover:bg-green-800 transition-colors"
						>
							Save
						</button>
					</>
				) : (
					<>
						<div className="p-2 border rounded-md shadow-sm bg-gray-100 mb-4">
							<p><strong>First Name:</strong> {formData.personalInfo.firstName}</p>
							<p><strong>Last Name:</strong> {formData.personalInfo.surname}</p>
							<p><strong>Date of Birth:</strong> {formData.personalInfo.dob}</p>
							<p><strong>Gender:</strong> {formData.personalInfo.gender}</p>
							<p><strong>Email:</strong> {formData.personalInfo.email}</p>
						</div>
						<button
							onClick={() => toggleEditMode('personalInfo')}
							className="bg-green-600 text-white px-4 py-2 rounded-md shadow mt-4 hover:bg-green-800 transition-colors"
						>
							Edit
						</button>
					</>
				)}
			</div>

			{/* Academic Results */}
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-4">Academic Results</h2>
				{editMode.academicResults ? (
					<>
						{['term1Results', 'term2Results', 'term3Results', 'term4Results'].map((term, index) => (
							<div key={term} className="mb-4">
								<label className="block text-sm font-medium mb-1">{`Term ${index + 1} Subject`}</label>
								<input
									type="text"
									name={`${term}.subject`}
									value={formData.academicResults[term].subject}
									onChange={handleChange}
									className="w-full p-2 border rounded-md shadow-sm"
								/>
								<label className="block text-sm font-medium mt-2 mb-1">{`Term ${index + 1} Grade`}</label>
								<input
									type="text"
									name={`${term}.grade`}
									value={formData.academicResults[term].grade}
									onChange={handleChange}
									className="w-full p-2 border rounded-md shadow-sm"
								/>
							</div>
						))}
						<button
							onClick={() => toggleEditMode('academicResults')}
							className="bg-green-600 text-white px-4 py-2 rounded-md shadow mt-4 hover:bg-green-800 transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={() => handleSave('academicResults')}
							className="bg-green-600 text-white px-4 py-2 rounded-md shadow mt-2 ml-2 hover:bg-green-800 transition-colors"
						>
							Save
						</button>
					</>
				) : (
					<>
						<div className="p-2 border rounded-md shadow-sm bg-gray-100 mb-4">
							{['term1Results', 'term2Results', 'term3Results', 'term4Results'].map((term, index) => (
								<p key={term}>
									<strong>{`Term ${index + 1} - Subject: `}</strong> {formData.academicResults[term].subject}
									<br />
									<strong>{`Grade: `}</strong> {formData.academicResults[term].grade}
								</p>
							))}
						</div>
						<button
							onClick={() => toggleEditMode('academicResults')}
							className="bg-green-600 text-white px-4 py-2 rounded-md shadow mt-4 hover:bg-green-800 transition-colors"
						>
							Edit
						</button>
					</>
				)}
			</div>

			{/* Career Goals */}
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-4">Career Goals</h2>
				{editMode.careerGoals ? (
					<>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Short-Term Goals Description</label>
							<textarea
								name="careerGoals.shortTermGoals.description"
								value={formData.careerGoals.shortTermGoals.description}
								onChange={handleChange}
								className="w-full p-2 border rounded-md shadow-sm"
							/>
							<label className="block text-sm font-medium mt-2 mb-1">Target Completion Date</label>
							<input
								type="text"
								name="careerGoals.shortTermGoals.targetDate"
								value={formData.careerGoals.shortTermGoals.targetDate}
								onChange={handleDateChange}
								placeholder="DD/MM/YYYY"
								className="w-full p-2 border rounded-md shadow-sm"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Long-Term Goals Description</label>
							<textarea
								name="careerGoals.longTermGoals.description"
								value={formData.careerGoals.longTermGoals.description}
								onChange={handleChange}
								className="w-full p-2 border rounded-md shadow-sm"
							/>
							<label className="block text-sm font-medium mt-2 mb-1">Target Completion Date</label>
							<input
								type="text"
								name="careerGoals.longTermGoals.targetDate"
								value={formData.careerGoals.longTermGoals.targetDate}
								onChange={handleDateChange}
								placeholder="DD/MM/YYYY"
								className="w-full p-2 border rounded-md shadow-sm"
							/>
						</div>
						<button
							onClick={() => toggleEditMode('careerGoals')}
							className="bg-green-600 text-white px-4 py-2 rounded-md shadow mt-4 hover:bg-green-800 transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={() => handleSave('careerGoals')}
							className="bg-green-600 text-white px-4 py-2 rounded-md shadow mt-2 ml-2 hover:bg-green-800 transition-colors"
						>
							Save
						</button>
					</>
				) : (
					<>
						<div className="p-2 border rounded-md shadow-sm bg-gray-100 mb-4">
							<p>
								<strong>Short-Term Goals:</strong> {formData.careerGoals.shortTermGoals.description}
								<br />
								<strong>Target Completion Date:</strong> {formData.careerGoals.shortTermGoals.targetDate}
							</p>
							<p>
								<strong>Long-Term Goals:</strong> {formData.careerGoals.longTermGoals.description}
								<br />
								<strong>Target Completion Date:</strong> {formData.careerGoals.longTermGoals.targetDate}
							</p>
						</div>
						<button
							onClick={() => toggleEditMode('careerGoals')}
							className="bg-green-600 text-white px-4 py-2 rounded-md shadow mt-4 hover:bg-green-800 transition-colors"
						>
							Edit
						</button>
					</>
				)}
			</div>

			{/* Additional Information */}
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-4">Additional Information</h2>
				{editMode.additionalInfo ? (
					<>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Extracurricular Activities</label>
							<textarea
								name="additionalInfo.extracurricularActivities"
								value={formData.additionalInfo.extracurricularActivities}
								onChange={handleChange}
								className="w-full p-2 border rounded-md shadow-sm"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Hobbies and Interests</label>
							<textarea
								name="additionalInfo.hobbiesAndInterests"
								value={formData.additionalInfo.hobbiesAndInterests}
								onChange={handleChange}
								className="w-full p-2 border rounded-md shadow-sm"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Academic Achievements</label>
							<textarea
								name="additionalInfo.academicAchievements"
								value={formData.additionalInfo.academicAchievements}
								onChange={handleChange}
								className="w-full p-2 border rounded-md shadow-sm"
							/>
						</div>
						<button
							onClick={() => toggleEditMode('additionalInfo')}
							className="bg-green-600 text-white px-4 py-2 rounded-md shadow mt-4 hover:bg-green-800 transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={() => handleSave('additionalInfo')}
							className="bg-green-600 text-white px-4 py-2 rounded-md shadow mt-2 ml-2 hover:bg-green-800 transition-colors"
						>
							Save
						</button>
					</>
				) : (
					<>
						<div className="p-2 border rounded-md shadow-sm bg-gray-100 mb-4">
							<p><strong>Extracurricular Activities:</strong> {formData.additionalInfo.extracurricularActivities}</p>
							<p><strong>Hobbies and Interests:</strong> {formData.additionalInfo.hobbiesAndInterests}</p>
							<p><strong>Academic Achievements:</strong> {formData.additionalInfo.academicAchievements}</p>
						</div>
						<button
							onClick={() => toggleEditMode('additionalInfo')}
							className="bg-green-600 text-white px-4 py-2 rounded-md shadow mt-4 hover:bg-green-800 transition-colors"
						>
							Edit
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default StudentPage;

