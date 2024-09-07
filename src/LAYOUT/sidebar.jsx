
import { Link, useLocation, useMatch } from "react-router-dom";

export default function Sidebar() {
	const location = useLocation();

	const dashboardMatch = useMatch("/dashboard/*");
	const thusoMatch = useMatch("/thuso/*");
	const subjectsMatch = useMatch("/subjects/*");
	const forumsMatch = useMatch("/forums/*");
	const activityMatch = useMatch("/activity/*");

	const getActiveClass = (match) => (match ? "bg-[#0496ff] text-white shadowed-btn" : "text-gray-700 hover:text-green-600");
	const DashboardIcon = (match) => (match ? "white" : "black");

	return (
		<aside className="w-full bg-white p-3 h-full">
			<div className="text-center">
				<h1 className="text-2xl">WELI</h1>
			</div>
			<ul className="px-2 mt-[5dvh]">
				<Link to="/dashboard">
					<li className={`flex gap-2 py-2 px-2 rounded-md ${getActiveClass(dashboardMatch)} `}>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={20}
							height={20}
							color={DashboardIcon}
							fill={"none"}
						>
							<path
								d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V8C10 9.88562 10 10.8284 9.41421 11.4142C8.82843 12 7.88562 12 6 12C4.11438 12 3.17157 12 2.58579 11.4142C2 10.8284 2 9.88562 2 8V6Z"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<path
								d="M2 19C2 18.0681 2 17.6022 2.15224 17.2346C2.35523 16.7446 2.74458 16.3552 3.23463 16.1522C3.60218 16 4.06812 16 5 16H7C7.93188 16 8.39782 16 8.76537 16.1522C9.25542 16.3552 9.64477 16.7446 9.84776 17.2346C10 17.6022 10 18.0681 10 19C10 19.9319 10 20.3978 9.84776 20.7654C9.64477 21.2554 9.25542 21.6448 8.76537 21.8478C8.39782 22 7.93188 22 7 22H5C4.06812 22 3.60218 22 3.23463 21.8478C2.74458 21.6448 2.35523 21.2554 2.15224 20.7654C2 20.3978 2 19.9319 2 19Z"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<path
								d="M14 16C14 14.1144 14 13.1716 14.5858 12.5858C15.1716 12 16.1144 12 18 12C19.8856 12 20.8284 12 21.4142 12.5858C22 13.1716 22 14.1144 22 16V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V16Z"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<path
								d="M14 5C14 4.06812 14 3.60218 14.1522 3.23463C14.3552 2.74458 14.7446 2.35523 15.2346 2.15224C15.6022 2 16.0681 2 17 2H19C19.9319 2 20.3978 2 20.7654 2.15224C21.2554 2.35523 21.6448 2.74458 21.8478 3.23463C22 3.60218 22 4.06812 22 5C22 5.93188 22 6.39782 21.8478 6.76537C21.6448 7.25542 21.2554 7.64477 20.7654 7.84776C20.3978 8 19.9319 8 19 8H17C16.0681 8 15.6022 8 15.2346 7.84776C14.7446 7.64477 14.3552 7.25542 14.1522 6.76537C14 6.39782 14 5.93188 14 5Z"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>


						<div className="text-lg">Dashboard</div>
					</li>
				</Link>
				<Link to="/thuso">
					<li className={`flex gap-1 my-3 ${getActiveClass(thusoMatch)}`}>
						<div className="mt-1 py-2 px-2">
							{/* Thuso Icon */}

							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width={20}
								height={20}
								color={"#000000"}
								fill={"none"}
							>
								<path
									d="M11 8H13C15.8284 8 17.2426 8 18.1213 8.87868C19 9.75736 19 11.1716 19 14C19 16.8284 19 18.2426 18.1213 19.1213C17.2426 20 15.8284 20 13 20H12C12 20 11.5 22 8 22C8 22 9 20.9913 9 19.9827C7.44655 19.9359 6.51998 19.7626 5.87868 19.1213C5 18.2426 5 16.8284 5 14C5 11.1716 5 9.75736 5.87868 8.87868C6.75736 8 8.17157 8 11 8Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinejoin="round"
								/>
								<path
									d="M19 11.5H19.5C20.4346 11.5 20.9019 11.5 21.25 11.701C21.478 11.8326 21.6674 12.022 21.799 12.25C22 12.5981 22 13.0654 22 14C22 14.9346 22 15.4019 21.799 15.75C21.6674 15.978 21.478 16.1674 21.25 16.299C20.9019 16.5 20.4346 16.5 19.5 16.5H19"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinejoin="round"
								/>
								<path
									d="M5 11.5H4.5C3.56538 11.5 3.09808 11.5 2.75 11.701C2.52197 11.8326 2.33261 12.022 2.20096 12.25C2 12.5981 2 13.0654 2 14C2 14.9346 2 15.4019 2.20096 15.75C2.33261 15.978 2.52197 16.1674 2.75 16.299C3.09808 16.5 3.56538 16.5 4.5 16.5H5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinejoin="round"
								/>
								<path
									d="M13.5 3.5C13.5 4.32843 12.8284 5 12 5C11.1716 5 10.5 4.32843 10.5 3.5C10.5 2.67157 11.1716 2 12 2C12.8284 2 13.5 2.67157 13.5 3.5Z"
									stroke="currentColor"
									strokeWidth="1.5"
								/>
								<path
									d="M12 5V8"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M9 12V13M15 12V13"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M10 16.5C10 16.5 10.6667 17 12 17C13.3333 17 14 16.5 14 16.5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>


						</div>
						<div className="text-lg mt-2">Thuso</div>
					</li>
				</Link>
				<Link to="/subjects">
					<li className={`flex gap-1 my-3 ${getActiveClass(subjectsMatch)}`}>
						<div className="mt-1 py-2 px-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width={20}
								height={20}
								color={"#000000"}
								fill={"none"}
							>
								<path
									d="M8 13.5H16M8 8.5H12"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>						</div>
						<div className="text-lg mt-2">Subjects</div>
					</li>
				</Link>
				<Link to="/forums">
					<li className={`flex gap-1 my-3 ${getActiveClass(forumsMatch)}`}>
						<div className="mt-1 py-2 px-2">
							{/* Forums Icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width={20}
								height={20}
								color={"#000000"}
								fill={"none"}
							>
								<path
									d="M8 13.5H16M8 8.5H12"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>


						</div>
						<div className="text-lg mt-2">Forums</div>
					</li>
				</Link>
				<Link to="/activity">
					<li className={`flex gap-1 my-3 ${getActiveClass(activityMatch)}`}>
						<div className="mt-1 py-2 px-2">
							{/* Activity Icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width={20}
								height={20}
								color={"#000000"}
								fill={"none"}
							>
								<path
									d="M4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M7 14L9.79289 11.2071C10.1834 10.8166 10.8166 10.8166 11.2071 11.2071L12.7929 12.7929C13.1834 13.1834 13.8166 13.1834 14.2071 12.7929L17 10"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>



						</div>
						<div className="text-lg mt-2">Activity</div>
					</li>
				</Link>
			</ul>
		</aside>
	);
}

