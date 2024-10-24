import React, { useContext } from "react";
import { UserContext } from "./UserLoginContext";

export default function Header({ logout }) {
	const loggeduser = useContext(UserContext);

	return (
		<div className="bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-between p-4 shadow-lg">
			<div className="flex flex-col items-center w-full">
				<h1 className="text-4xl font-extrabold text-white text-center">
					Your TODoAPP
				</h1>
				{loggeduser && (
					<h3 className="text-lg text-white font-semibold mt-1">
						Welcome, {loggeduser.user}
					</h3>
				)}
			</div>
			{loggeduser && (
				<button
					className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-200"
					onClick={() => logout("user", { path: "/" })}
				>
					LogOut
				</button>
			)}
		</div>
	);
}
