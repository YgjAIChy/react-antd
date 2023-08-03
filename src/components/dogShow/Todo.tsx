import React from "react";
import fetchData from "../fetchData/fetchData";

const data = fetchData('https://jsonplaceholder.typicode.com/todos/1')

const Todo: React.FC = () => {
    const todoData = data.read();
    return (
        <h1>{todoData.title}</h1>
    )
}

export default Todo