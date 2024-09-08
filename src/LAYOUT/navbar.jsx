import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
	User,
} from "@nextui-org/react";
import { Navigate } from "react-router-dom";
import { auth } from "../DATABASE/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../PROVIDERS/DataProvider";


const handleLogOut = () => {
	signOut(auth)
		.then(() => {
			Navigate("/signin");
		})
		.catch((error) => {
			console.error("Error signing out: ", error);
		});
};




export default function Navbar() {

	const { currentUser, loading } = useAuth();



	return (
		<div className="fixed bg-white  top-0 left-0 right-0  p-4   rounded w-full ">


			<div className="flex justify-end">
				<div>
					<Dropdown placement="bottom-start">
						<DropdownTrigger>
							<User
								as="button"
								avatarProps={{
									isBordered: true,
									src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
								}}
								className="transition-transform"
								description={currentUser.username}
								name={currentUser.name}

							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="User Actions" variant="flat">
							<DropdownItem key="profile" className="h-14 gap-2">
								<p className="font-bold">Signed in as</p>
								<p className="font-bold">{currentUser.username}</p>

							</DropdownItem>
							<DropdownItem key="settings">My Settings</DropdownItem>
							<DropdownItem key="team_settings">Team Settings</DropdownItem>
							<DropdownItem key="analytics">Analytics</DropdownItem>
							<DropdownItem key="system">System</DropdownItem>
							<DropdownItem key="configurations">Configurations</DropdownItem>
							<DropdownItem key="help_and_feedback">
								Help & Feedback
							</DropdownItem>
							<DropdownItem onClick={handleLogOut} key="logout" color="danger">
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		</div>
	)
}
