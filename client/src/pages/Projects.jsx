// import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit,
Toolbar, Sort, Filter, Search} from '@syncfusion/ej2-react-grids'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


import { projectsGrid } from '../data/dummy';
import { Header } from '../components';

const Projects = ({setProjectId, setProjectViewItem, projectId}) => {
  const navigate = useNavigate()

  const [projectItem, setProjectItem]= useState({})
  const [deleteChange, setDeleteChange] = useState('search')

  function handleClick(){
    navigate('/')
  }

  function handleSearchChange(e){
    setDeleteChange('search')
  }

  function handleDeleteChange(e){
    setDeleteChange('delete')
  }

  function handleSubmit(e){
    e.preventDefault()
    // console.log('submit click')
    // console.log(e.target.project.value)
    // console.log(deleteChange)
    if (deleteChange === 'search'){
      setProjectId(e.target.project.value)
      navigate(`/projects/${e.target.project.value}`)
    }
    else if(deleteChange === 'delete'){
      fetch(`http://localhost:4000/projects/${e.target.project.value}`, {
        method: "DELETE",
      })
      .then(res => res.json())
      .then(res => console.log(res))
      window.location.reload(false)
    }
  }

    useEffect(()=>{
      fetch('http://localhost:5555/projects')
      .then(res=>res.json()
      .then(data=>setProjectItem(data)))
    },[])




  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category = "Page" title="Projects" />
      <form onSubmit={handleSubmit}>
        <input name='project' placeholder='Enter Project ID'></input>
        <input type='radio' name='searchOrDelete' onChange={handleSearchChange} defaultChecked></input>
        <label> search</label>
        <input type='radio' name='searchOrDelete'onChange={handleDeleteChange}></input>
        <label> delete</label>
        <button type='submit'>Submit</button>
        <button type='submit' onClick={handleClick}>New Task</button>
      </form>
      <GridComponent
        
        dataSource={projectItem}
        allowPaging
        allowSorting
        toolbar={['Delete', 'Search']}
        editSettings={{ allowDeleting: true, allowEditing: true}}
        width="auto"
        
        // rowSelected={handleRowSelected}
      >
        <ColumnsDirective >
        {projectsGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} 
          // onClick = {handleClick}
          />
        ))}

        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter, Search]}/>
      </GridComponent>
    </div>
  )
}


export default Projects