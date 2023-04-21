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
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-[#0f172a] p-8 px-8' onSubmit={(e) => handleAddTask(e)} >
            <h2 className='text-4xl text-white font-bold text-center'>TASK FORM</h2>
            <div className='flex flex-col text-gray-400 py-2'>
                <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" style={{ 'padding': '5px' }} type='text' name='title' onChange={handleChange} placeholder='Task title'></input>
            </div>
            <div className='flex flex-col text-gray-400 py-2'>
                <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" style={{ 'padding': '5px' }} type='text' name='description' onChange={handleChange} placeholder='Task description'></input>
            </div>
            <div className='flex flex-col text-gray-400 py-2'>

            </div>
            <div className='flex flex-col text-gray-400 py-2'>
                <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" style={{ 'padding': '5px' }} type='date' name='due_date' onChange={handleChange} placeholder='Task due date'></input>

            </div>
            <div className='flex flex-col text-gray-400 py-2'>
                <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" style={{ 'padding': '5px' }} type='number' name='user_id' onChange={handleChange} placeholder='User ID'></input>

            </div>
            <div className='flex flex-col text-gray-400 py-2'>
                <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" style={{ 'padding': '5px' }} type='number' name='project_id' onChange={handleChange} placeholder='Project ID'></input>

            </div>
            <div className=' flex flex-row text-gray-400 py-2'>
                <div>
                <select className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" style={{ 'padding': '5px' }} name="status" defaultValue='' onChange={handleChange}>
                    <option value="" disabled >Select Status</option>
                    <option value="todo">To-Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="testing">Testing</option>
                    <option value="done">Done</option>
                </select>

                </div>
                <div className='px-10'>
                    <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" style={{ 'width': '90px', 'padding': '5px' }} type="number" name="priority" min="1" max="10" placeholder='Priority' onChange={handleChange}></input>

                </div>

                
            </div>
            <div>
            <input className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg' type='submit' value='Add Task' />
               
                
            </div>
            
        </form>
    </div>
    )
}

export default TaskForm