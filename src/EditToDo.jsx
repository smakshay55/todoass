import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserLoginContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";

export default function EditToDo() {
	const navigate = useNavigate();
	const [todo, setToDo] = useState({
		title: "",
		completed: false,
	});

	const todoId = useParams().todoid;
	const loggeduser = useContext(UserContext);
	const userToken = loggeduser ? loggeduser.token : undefined;
	const getToDoUrl = `https://todoassbackend-1.onrender.com/todo/${todoId}`;

	const [error, setError] = useState();
	const [isLoading, setIsloading] = useState(false);

	useEffect(() => {
		if (loggeduser && loggeduser.token) {
			async function getToDo() {
				const options = {
					method: "GET",
					headers: { authorization: `Bearer ${userToken}` },
				};
				try {
					setIsloading(true);
					const response = await fetch(getToDoUrl, options);
					const responseData = await response.json();
					if (!response.ok) {
						setError(responseData.message);
					} else {
						setError("");
						setToDo(responseData);
					}
				} catch (err) {
					setError("Error fetching Todo. Please try again later.");
				} finally {
					setIsloading(false);
				}
			}

			getToDo();
		} else {
			setError("You need to log in to edit this Todo.");
			navigate("/");
		}
	}, [loggeduser, navigate]);

	async function handleEditTodo(evt) {
		evt.preventDefault();

		if (!todo.title.trim()) {
			setError("Title cannot be empty.");
			return;
		}

		const options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${userToken}`,
			},
			body: JSON.stringify(todo),
		};

		try {
			setIsloading(true);
			const response = await fetch(getToDoUrl, options);
			const responseData = await response.json();
			if (!response.ok) {
				setError(responseData.error);
			} else {
				navigate("/todolist");
			}
		} catch (err) {
			setError("Error updating Todo. Please try again.");
		} finally {
			setIsloading(false);
		}
	}

	return (
		<section className="w-full max-w-lg mx-auto pt-4 flex flex-col items-center bg-gradient-to-b from-green-300 to-blue-500 rounded-lg shadow-lg p-6">
			{error && (
				<h6 className="text-center text-red-600 mt-4 p-2 border-2 border-red-500 rounded-md w-full">
					{error}
				</h6>
			)}
			<h1 className="text-center text-4xl font-bold text-white mt-4">Edit Todo</h1>
			{loggeduser && (
				<h2 className="text-center text-2xl font-semibold text-white mt-2">
					{loggeduser.user}
				</h2>
			)}
			<NavLink
				className="mt-4 text-white p-2 hover:underline"
				to={"/todolist"}
			>
				View All To Dos
			</NavLink>
			{isLoading && <h3 className="text-center text-white">Loading...</h3>}
			{loggeduser && !isLoading && (
				<form
					onSubmit={handleEditTodo}
					className="flex flex-col gap-4 mt-4 w-full"
				>
					<label htmlFor="title" className="text-white">Enter Title</label>
					<input
						className="border border-gray-200 rounded-md text-lg px-2 py-1 outline-blue-500"
						type="text"
						id="title"
						name="title"
						value={todo.title}
						onChange={(e) => setToDo({ ...todo, title: e.target.value })}
					/>
					<label htmlFor="completed" className="text-white">Completed:</label>
					<select
						id="completed"
						name="completed"
						className="border border-gray-200 rounded-md text-lg px-2 py-1 outline-blue-500 focus:outline-blue-500"
						value={todo.completed}
						onChange={(evt) =>
							setToDo((curToDo) => ({
								...curToDo,
								completed: evt.target.value === "true",
							}))
						}
					>
						<option value={true}>True</option>
						<option value={false}>False</option>
					</select>
					<button
						type="submit"
						className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition-colors"
					>
						Update ToDo
					</button>
				</form>
			)}
		</section>
	);
}
