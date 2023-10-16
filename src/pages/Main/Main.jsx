import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

function Main(props) {

    const [ content, setContent ] = useState("");
    const [ updateTodoState, setUpdateTodoState ] = useState(0);
    const [ updateContent, setUpdateContent ] = useState("");

    const todoList = useQuery(["todoList"], async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        try {
            const response = await axios.get("http://localhost:8080/todo/list", option);
            console.log(response);
            return response;
        }catch(error) {
            console.error(error);
        }
    });

    const handleContentInputChange = (e) => {
        setContent(e.target.value);
    }

    const handleAddTodo = async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        await axios.post("http://localhost:8080/todo", {content}, option);
        setContent("");
        todoList.refetch();
    }

    const handleDeleteTodo = async (todoId) => {
        // /todo/1
        try{
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            await axios.delete(`http://localhost:8080/todo/${todoId}`, option);
            todoList.refetch();
        }catch(error) {
            console.error(error);
        }

    }

    const handleUpdateContentInputChange = (e) => {
        setUpdateContent(e.target.value);
    }

    const handleUpdateTodoSubmit = async (todoId) => {
        try{
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            await axios.put(`http://localhost:8080/todo/${todoId}`, {updateContent}, option);
            todoList.refetch();
        }catch(error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div>
                <input type="text" onChange={handleContentInputChange} value={content} />
                <button onClick={handleAddTodo}>추가</button>
            </div>
            <ul>
                {todoList.isLoading ? "" : todoList?.data?.data.map(todo => 
                    <li key={todo.todoId}>
                        {todo.content}
                        {
                            updateTodoState === todo.todoId && (
                                <>
                                    <input type='text' 
                                        value={updateContent} 
                                        onChange={handleUpdateContentInputChange} />
                                    <button onClick={() => {
                                        if(todo.content !== updateContent) {
                                            handleUpdateTodoSubmit(todo.todoId)
                                        }
                                        setUpdateTodoState(0)
                                        setUpdateContent("");
                                    }}>확인</button>
                                </>
                            )
                        }
                        {
                            updateTodoState !== todo.todoId
                            ? <button onClick={() => {
                                setUpdateTodoState(todo.todoId);
                                setUpdateContent(todo.content);
                            }}>수정</button>
                            : <button onClick={() => {
                                setUpdateTodoState(0)
                                setUpdateContent("");
                            }}>취소</button>
                        }
                        <button onClick={() => { handleDeleteTodo(todo.todoId); }}>삭제</button>
                    </li>
                )} 
            </ul>
        </div>
    );
}

export default Main;