import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserLoginContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function AddToDo() {
    const navigate = useNavigate();
    const [todo, setToDo] = useState({
        title: "",
    });
    const loggeduser = useContext(UserContext);
    const userToken = loggeduser ? loggeduser.token : undefined;
    const getToDoUrl = "http://localhost:3000/todo";
    const [error, setError] = useState();
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        if (!loggeduser) {
            setError("Invalid Token");
            navigate("/");
        }
    }, [loggeduser, navigate]);

    async function handleAddTodo(evt) {
        evt.preventDefault();

        const options = {
            method: "POST",
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
            setError("Error fetching Todos");
        } finally {
            setIsloading(false);
        }
    }

    return (
        <section className="w-full pt-4 mx-auto flex flex-col items-center bg-gray-100 min-h-screen">
            {error && (
                <h6 className="text-center text-red-600 mt-4 p-2 border-2 border-red-500 rounded-md w-5/6 mx-auto">
                    {error}
                </h6>
            )}
            <h1 className="text-center text-5xl font-bold mt-16 text-indigo-600">Add Todo</h1>
            {loggeduser && (
                <h2 className="text-center text-2xl font-semibold mt-4 text-gray-700">
                    Welcome, {loggeduser.user}
                </h2>
            )}
            <NavLink
                className="mt-6 text-blue-600 hover:underline"
                to={"/todolist"}
            >
                View All To Dos
            </NavLink>
            {isLoading && <h3 className="text-gray-500">Loading....</h3>}
            {loggeduser && !isLoading && (
                <form onSubmit={handleAddTodo} className="flex flex-col gap-4 mt-8 w-5/12 bg-white shadow-lg rounded-lg p-6">
                    <label htmlFor="title" className="text-gray-700 font-semibold">Enter Title</label>
                    <input
                        className="border border-gray-300 rounded-md text-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        type="text"
                        id="title"
                        name="title"
                        value={todo.title}
                        onChange={(evt) => {
                            setToDo((curToDo) => ({
                                ...curToDo,
                                title: evt.target.value,
                            }));
                        }}
                        required
                    />
                    <button
                        className="border rounded-md bg-indigo-600 text-white p-2 text-lg hover:bg-indigo-700 transition-colors"
                        type="submit"
                    >
                        Add ToDo
                    </button>
                </form>
            )}
        </section>
    );
}
