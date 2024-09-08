
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from "../../DATABASE/firebase";
import { useAuth } from "../../PROVIDERS/DataProvider";

const subjectsList = [
	{ name: 'Mathematics', id: 0 },
	{ name: 'Mathematical Literacy', id: 1 },
	{ name: 'Physical Sciences', id: 2 },
	{ name: 'Geography', id: 3 },
	{ name: 'History', id: 4 },
	{ name: 'Business Studies', id: 5 },
	{ name: 'Economics', id: 6 },
	{ name: 'Accounting', id: 7 },
	{ name: 'English Home Language', id: 8 },
	{ name: 'Afrikaans First Additional Language', id: 9 },
	{ name: 'IsiZulu First Additional Language', id: 10 },
];

const StudentPage = () => {
	const { currentUser } = useAuth();
	const [formData, setFormData] = useState({
		personalInfo: {
			firstName: '',
			surname: '',
			dob: '01/01/2000',
			gender: 'Male',
		},
		grade: {
			subjects: [], // Array of selected subjects
			grade: '' // Single grade input for all subjects
		}
	});

	const [editMode, setEditMode] = useState({
		personalInfo: false,
		grade: false,
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
	const handleSubjectChange = (e) => {
		const { value, checked } = e.target;
		const subjectId = parseInt(value, 10);
		setFormData((prev) => {
			const subjects = [...prev.grade.subjects];
			if (checked) {
				if (!subjects.includes(subjectId)) {
					subjects.push(subjectId);
				}
			} else {
				const index = subjects.indexOf(subjectId);
				if (index > -1) {
					subjects.splice(index, 1);
				}
			}
			return {
				...prev,
				grade: {
					...prev.grade,
					subjects
				}
			};
		});
	};

	useEffect(() => {
		if (currentUser) {
			setFormData({
				personalInfo: currentUser.personalInfo || formData.personalInfo,
				grade: {
					subjects: currentUser.grade?.subjects || [],
					grade: currentUser.grade?.grade || ''
				}
			});
		}
	}, [currentUser]);

	const handleSave = async (section) => {
		console.log(`${section} Data:`, formData[section]);
		toggleEditMode(section);

		const userRef = doc(db, "users", currentUser.uid);
		await updateDoc(userRef, {
			[section]: formData[section]
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
								onChange={handleChange}
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
							<p><strong>Surname:</strong> {formData.personalInfo.surname}</p>
							<p><strong>Date of Birth:</strong> {formData.personalInfo.dob}</p>
							<p><strong>Gender:</strong> {formData.personalInfo.gender}</p>
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


			{/* Grade Section */}
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-4">Grade</h2>
				{editMode.grade ? (
					<>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Grade for All Selected Subjects</label>
							<input
								type="text"
								name="grade.grade"
								value={formData.grade.grade}
								onChange={handleChange}
								className="w-full p-2 border rounded-md shadow-sm"
								placeholder="Enter grade"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Select Subjects</label>
							<div className="space-y-2">
								{subjectsList.map((subject) => (
									<div key={subject.id} className="flex items-center">
										<input
											type="checkbox"
											value={subject.id}
											checked={formData.grade.subjects.includes(subject.id)}
											onChange={handleSubjectChange}
											className="mr-2"
										/>
										<label>{subject.name}</label>
									</div>
								))}
							</div>
						</div>
						<button
							onClick={() => toggleEditMode('grade')}
							className="bg-blue-600 text-white px-4 py-2 rounded-md shadow mt-4 hover:bg-blue-800 transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={() => handleSave('grade')}
							className="bg-blue-600 text-white px-4 py-2 rounded-md shadow mt-2 ml-2 hover:bg-blue-800 transition-colors"
						>
							Save
						</button>
					</>
				) : (
					<>
						<div className="p-2 border rounded-md shadow-sm bg-gray-100 mb-4">
							<p><strong>Grade for All Selected Subjects:</strong> {formData.grade.grade || 'N/A'}</p>
							<p><strong>Selected Subjects:</strong></p>
							<ul className="list-disc pl-5">
								{formData.grade.subjects.length > 0 ? (
									formData.grade.subjects.map((subjectId) => {
										const subject = subjectsList.find(s => s.id === subjectId);
										return (
											<li key={subjectId} className="mb-1">
												{subject ? subject.name : 'Unknown Subject'}
											</li>
										);
									})
								) : (
									<li>No subjects selected</li>
								)}
							</ul>
						</div>
						<button
							onClick={() => toggleEditMode('grade')}
							className="bg-blue-600 text-white px-4 py-2 rounded-md shadow mt-4 hover:bg-blue-800 transition-colors"
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

