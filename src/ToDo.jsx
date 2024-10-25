import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./UserLoginContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";

export default function ToDo() {
	const modal = useRef();
	const navigate = useNavigate();
	const todoId = useParams().todoid;
	const loggeduser = useContext(UserContext);
	const getToDoUrl = `https://todoassbackend-1.onrender.com/todo/${todoId}`;
	const [error, setError] = useState("");
	const [todo, setToDo] = useState(null);
	const [isLoading, setIsloading] = useState(false);

	const userToken = loggeduser ? loggeduser.token : undefined;

	useEffect(() => {
		if (loggeduser && loggeduser.token) {
			const fetchTodo = async () => {
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
					setError("Error fetching Todo");
				}
				setIsloading(false);
			};

			fetchTodo();
		} else {
			setError("You Need to Login");
			modal.current.close();
			navigate("/");
		}
	}, [loggeduser, navigate, userToken, getToDoUrl]);

	const handleDeleteTodo = async () => {
		const options = {
			method: "DELETE",
			headers: { authorization: `Bearer ${userToken}` },
		};

		try {
			setIsloading(true);
			const response = await fetch(getToDoUrl, options);

			if (!response.ok) {
				setError("Error deleting data");
			} else {
				modal.current.close();
				navigate("/todolist");
			}
		} catch (err) {
			setError("Error deleting Todo");
		}
		setIsloading(false);
	};

	const handleModalDelete = () => {
		modal.current.open();
	};

	const handleModalCancel = () => {
		modal.current.close();
	};

	return (
		<section className="w-full pt-4 mx-auto flex flex-col items-center bg-gray-50 min-h-screen">
			{error && (
				<h6 className="text-center text-red-600 mt-4 p-2 border-2 border-red-500 rounded-md w-5/6 mx-auto bg-red-100">
					{error}
				</h6>
			)}
			<h1 className="text-center text-4xl font-extrabold text-blue-600 mt-16">View Single Todo</h1>
			<NavLink
				className="w-4/12 mt-8 bg-blue-400 text-white p-2 text-center rounded-md hover:bg-blue-500 transition duration-200"
				to="/todolist"
			>
				View All To Dos
			</NavLink>

			{loggeduser && (
				<h2 className="text-center text-2xl font-bold text-gray-800 mt-8">{loggeduser.user}</h2>
			)}

			{isLoading && <h3 className="text-gray-600">Loading....</h3>}

			{loggeduser && !isLoading && todo && (
				<div className="drop-shadow-lg w-3/4 border border-blue-600 rounded-md p-4 my-2 bg-white flex flex-col gap-4">
					<h3 className="text-3xl font-semibold text-blue-600">Title: {todo.title}</h3>
					<p className="text-2xl font-semibold text-gray-800">Completed: {todo.completed.toString()}</p>
					<div className="modify flex justify-between mt-4">
						<NavLink to={`/todo/${todo._id}/edit`}>
							<p className="text-lg font-semibold text-blue-500 cursor-pointer hover:underline">Edit</p>
						</NavLink>
						<p
							className="text-lg font-semibold text-red-500 cursor-pointer hover:underline"
							onClick={handleModalDelete}
						>
							Delete
						</p>
					</div>
				</div>
			)}

			{loggeduser && (
				<NavLink
					className="w-4/12 mt-8 border border-blue-200 rounded-md bg-blue-500 text-white p-2 text-center hover:bg-blue-600 transition duration-200"
					to="/addtodo"
				>
					Add To Do
				</NavLink>
			)}

			<Modal
				ref={modal}
				handleModalStateClose={() => {
					modal.current.close();
				}}
			>
				<aside className="w-full flex flex-col p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md">
					<h3 className="w-full text-xl font-bold text-gray-800">Are you sure?</h3>
					<div className="button-group flex justify-between items-center mt-4">
						<button
							className="p-2 border border-green-600 rounded-md text-green-600 hover:bg-green-100 transition duration-200 min-w-24"
							onClick={handleDeleteTodo}
						>
							Confirm
						</button>
						<button
							onClick={handleModalCancel}
							className="p-2 border border-gray-600 rounded-md text-gray-600 hover:bg-gray-200 transition duration-200 min-w-24"
						>
							Cancel
						</button>
					</div>
				</aside>
			</Modal>
		</section>
	);
}
