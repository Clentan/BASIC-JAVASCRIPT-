
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../DATABASE/firebase";

export default function AddForum() {
	const { register, handleSubmit, reset } = useForm();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [tags, setTags] = useState([]);
	const [tagInput, setTagInput] = useState('');

	// Handle input change for the tag input field
	const handleTagInputChange = (e) => {
		setTagInput(e.target.value);
	};

	// Handle adding tags
	const handleAddTag = (e) => {
		e.preventDefault();
		if (tagInput && !tags.includes(tagInput)) {
			setTags([...tags, tagInput]);
			setTagInput('');
		}
	};

	// Handle removing a tag
	const handleRemoveTag = (tagToRemove) => {
		setTags(tags.filter(tag => tag !== tagToRemove));
	};

	// Form submission
	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const forumRef = doc(collection(db, "forums"));
			await setDoc(forumRef, {
				name: data.name,
				description: data.description,
				posts: [],
				tags: tags, // Include the tags in the form submission
				forumId: forumRef.id,
			});
			reset();
			setTags([]); // Clear tags after submission
		} catch (err) {
			console.log(err);
			setError("Failed to create forum");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-4 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-4">Create a New Forum</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
				<div className="mb-4">
					<label htmlFor="name" className="block text-gray-700">
						Forum Name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						{...register("name", { required: "Forum name is required" })}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="description" className="block text-gray-700">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						{...register("description", { required: "Description is required" })}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
					/>
				</div>

				{/* Tags Section */}
				<div className="mb-4">
					<label htmlFor="tags" className="block text-gray-700">Tags</label>
					<div className="flex items-center">
						<input
							type="text"
							id="tags"
							value={tagInput}
							onChange={handleTagInputChange}
							placeholder="Add a tag"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
						/>
						<button
							onClick={handleAddTag}
							className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Add Tag
						</button>
					</div>
					{/* Display the added tags */}
					<div className="mt-2 flex flex-wrap">
						{tags.length > 0 && tags.map((tag, index) => (
							<div key={index} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center mr-2 mb-2">
								<span>{tag}</span>
								<button
									type="button"
									className="ml-2 text-red-500 hover:text-red-700"
									onClick={() => handleRemoveTag(tag)}
								>
									&times;
								</button>
							</div>
						))}
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"

				>
					{loading ? "Creating..." : "Create Forum"}
				</button>
				{error && <p className="mt-2 text-red-600">{error}</p>}
			</form>
		</div>
	);
}

