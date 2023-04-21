import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, 
  ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Toolbar } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import { useParams, useNavigate } from 'react-router-dom'


const Tasks = () => {
  const [tasks, setTasks] = useState({})
  const [taskId, setTaskId]= useState()
  const navigate = useNavigate()

  function handleSearchChange(e){
    setTaskId(e.target.value)
  }

  function handleClick(){
    navigate('/task-form')
  }

  function handleDelete(e){
    e.preventDefault()
    console.log(taskId)
      fetch(`http://localhost:4000/tasks/${taskId}`, {
        method: "DELETE",
      })
      .then(res => res.json())
      .then(res => console.log(res))
      window.location.reload(false)
    }

  useEffect(() => {
    fetch('http://127.0.0.1:5555/tasks')
    .then(res=>res.json())
    .then(data=>setTasks(data))
  }, [])

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category = "Page" title="Tasks" />
      <form>
        <input className="border border-black-200 mr-2" name='task' placeholder='Enter Task ID' onChange={handleSearchChange}></input>
        <button class="bg-transparent hover:bg-blue-500 front-semibold hover:text-white px-4 border border-blue-500 rounded mr-2" type='submit' onClick={handleDelete}>Delete</button>
        <button class="bg-transparent hover:bg-blue-500 front-semibold hover:text-white px-4 border border-blue-500 rounded" type='submit' onClick={handleClick}>New Task</button>
      </form>
      <GridComponent
        id="gridcomp"
        dataSource={tasks}
        allowPaging
        allowSorting
        toolbar={['Search']}
      
      >
        <ColumnsDirective>
        {ordersGrid.map((item, index) => (
          <ColumnDirective key={index} {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]}/>
      </GridComponent>
    </div>
  )
}

export default Tasks