import { useState } from "react";

const TaskForm = () => {

    const [addTask, setAddTask] = useState({
        'title': '',
        'description': '',
        'status': '',
        'priority': '',
        'due_date': '',
        'user_id': '',
        'project_id': ''
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setAddTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    }

    function handleAddTask(e) {
        e.preventDefault()

        const dueDate = new Date(addTask.due_date)
        const formattedDueDate = dueDate.toISOString().split('T')[0];
        const newTask = {
            ...addTask,
            due_date: formattedDueDate,
            priority: parseInt(addTask.priority),
            user_id: parseInt(addTask.user_id),     // Parse user_id as integer
            project_id: parseInt(addTask.project_id) // Parse project_id as integer
        };

        fetch('http://localhost:5555/tasks', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Error:', response.status, response.statusText);
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
            console.log(newTask)


    }




    return (
        <form onSubmit={(e) => handleAddTask(e)} >
            <input style={{ 'padding': '5px' }} type='text' name='title' onChange={handleChange} placeholder='Task title'></input>
            <input style={{ 'padding': '5px' }} type='text' name='description' onChange={handleChange} placeholder='Task description'></input>
            <select style={{ 'padding': '5px' }} name="status" defaultValue='' onChange={handleChange}>
                <option value="" disabled >Select Status</option>
                <option value="todo">To-Do</option>
                <option value="inprogress">In Progress</option>
                <option value="testing">Testing</option>
                <option value="done">Done</option>
            </select>
            <input style={{ 'width': '90px', 'padding': '5px' }} type="number" name="priority" min="1" max="10" placeholder='Priority' onChange={handleChange}></input>
            <input style={{ 'padding': '5px' }} type='date' name='due_date' onChange={handleChange} placeholder='Task due date'></input>
            <input style={{ 'padding': '5px' }} type='number' name='user_id' onChange={handleChange} placeholder='User ID'></input>
            <input style={{ 'padding': '5px' }} type='number' name='project_id' onChange={handleChange} placeholder='Project ID'></input>
            <input style={{ 'padding': '5px' }} type='submit' value='Add Task' />
        </form>
    )
}

export default TaskForm