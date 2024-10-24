import React from "react";

export default function Form({
	handleAuthentication,
	closeModal,
	user,
	setUser,
	heading,
	buttonText,
}) {
	const handleSubmit = (evt) => {
		evt.preventDefault(); // Prevent default form submission
		handleAuthentication(); // Call the authentication function
	};

	return (
		<div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 border border-gray-300">
			<h3 className="text-center text-3xl font-bold text-blue-700 mb-6">{heading}</h3>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<label htmlFor="username" className="text-gray-800 font-medium">Enter Username</label>
				<input
					className="border border-gray-300 rounded-md text-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
				<label htmlFor="password" className="text-gray-800 font-medium">Enter Password</label>
				<input
					className="border border-gray-300 rounded-md text-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
				<button
					type="submit"
					className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 font-semibold shadow-lg"
				>
					{buttonText}
				</button>
			</form>
			<button
				className="mt-4 w-full border border-gray-300 rounded-md bg-gray-200 text-gray-800 p-2 hover:bg-gray-300 transition duration-200 font-medium"
				onClick={closeModal}
			>
				Close
			</button>
		</div>
	);
}
