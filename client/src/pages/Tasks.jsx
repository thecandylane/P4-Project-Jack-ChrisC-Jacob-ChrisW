import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, 
  ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Toolbar } from '@syncfusion/ej2-react-grids';
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import { useParams, useNavigate, Navigate } from 'react-router-dom'


const Tasks = () => {
  const navigate = useNavigate()

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

  // function handleDeleteChange(e){
  //   setDeleteChange('delete')
  // }

  // function handleSubmit(e){
  //   e.preventDefault()
  //   // console.log('submit click')
  //   // console.log(e.target.project.value)
  //   // console.log(deleteChange)
  //   if (deleteChange === 'search'){
  //     setProjectId(e.target.project.value)
  //     navigate(`/projects/${e.target.project.value}`)
  //   }
  //   else if(deleteChange === 'delete'){
  //     fetch(`http://localhost:4000/projects/${e.target.project.value}`, {
  //       method: "DELETE",
  //     })
  //     .then(res => res.json())
  //     .then(res => console.log(res))
  //     window.location.reload(false)
  //   }
  // }

  // useEffect(() => {
  //   fetch('http://127.0.0.1:5555/tasks')
  //   .then(res=>res.json())
  //   .then(data=>setTasks(data))
  // }, [])

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category = "Page" title="Tasks" />
      {/* <form onSubmit={handleSubmit}>
        <input name='project' placeholder='Enter Project ID'></input>
        <input type='radio' name='searchOrDelete' onChange={handleSearchChange} defaultChecked></input>
        <label> search</label>
        <input type='radio' name='searchOrDelete'onChange={handleDeleteChange}></input>
        <label> delete</label>
        <button type='submit'>Submit</button>
        <button type='submit' onClick={handleClick}>New Task</button>
      </form> */}
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