import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserLoginContext";

export default function Home({
	handleAuthentication,
	user,
	setUser,
	authType,
	setAuthType,
	isLoading,
	errorMessage,
}) {
	const navigate = useNavigate();
	const loggeduser = useContext(UserContext);

	useEffect(() => {
		if (loggeduser) {
			navigate("/todolist");
		}
	}, [loggeduser, navigate]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-violet-500">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
				<h3 className="text-3xl font-bold text-center text-gray-700 mb-6">
					{authType.toUpperCase()}
				</h3>
				<div className="auth-options mb-4">
					{authType === "login" ? (
						<button
							onClick={() => setAuthType("signup")}
							className="text-blue-500 hover:underline"
							aria-label="Switch to Signup"
						>
							Don't Have an account?
						</button>
					) : (
						<button
							onClick={() => setAuthType("login")}
							className="text-blue-500 hover:underline"
							aria-label="Switch to Login"
						>
							Already Have an account?
						</button>
					)}
				</div>

				{isLoading ? (
					<h3 className="text-xl text-gray-600 text-center">Loading...</h3>
				) : (
					<form
						className="flex flex-col gap-6"
						onSubmit={handleAuthentication}
					>
						<label htmlFor="username" className="font-semibold text-gray-700">
							Enter Username
						</label>
						<input
							className="border border-gray-300 rounded-md text-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
							type="text"
							id="username"
							name="username"
							value={user.username}
							onChange={(evt) => {
								setUser((curUser) => ({
									...curUser,
									username: evt.target.value,
								}));
							}}
							required
							aria-label="Username"
						/>
						<label htmlFor="password" className="font-semibold text-gray-700">
							Enter Password
						</label>
						<input
							className="border border-gray-300 rounded-md text-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
							type="password"
							id="password"
							name="password"
							value={user.password}
							onChange={(evt) => {
								setUser((curUser) => ({
									...curUser,
									password: evt.target.value,
								}));
							}}
							required
							aria-label="Password"
						/>
						<button className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 font-medium">
							{authType === "login" ? "Log In" : "Sign Up"}
						</button>
						{errorMessage && (
							<p className="text-red-600 text-center">{errorMessage}</p>
						)}
					</form>
				)}
			</div>
		</div>
	);
}
