import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit,
Toolbar, Sort, Filter, Search} from '@syncfusion/ej2-react-grids'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


import { customersData, projectsGrid } from '../data/dummy';
import { Header } from '../components';

const Projects = ({setProjectId}) => {
  const navigate = useNavigate()

  const [projectItem, setProjectItem]= useState({})
  const [deleteChange, setDeleteChange] = useState('search')

  function handleClick(){
    navigate('/project-form')
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
      console.log(e.target.project.value)
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
      {/* <div className='py-5'>
        <form action="" className="relative mx-auto w-max" onSubmit={handleSubmit}>
          <input type="search" className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-black-300 focus:pl-16 focus:pr-4" />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-black-300 peer-focus:stroke-black-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div className="relative inline-block">
            <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span className="mr-1">Actions</span>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zM5 13a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"/></svg>
            </button>
            <ul className="absolute hidden text-gray-700 pt-1">
              <li><a href="#" className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Delete</a></li>
              <li><a href="#" className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Submit</a></li>
            </ul>
          </div>
        </form>
      </div> */}

      {/* <div className ='py-5'>
        <form action="" class="relative mx-auto w-max" onSubmit={handleSubmit}>
          <input type="search" 
                class="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-black-300 focus:pl-16 focus:pr-4" />
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-black-300 peer-focus:stroke-black-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>
      </div> */}

      
      <div>
        <form onSubmit={handleSubmit}>
          <div >
            <input className="border border-black-200 mr-2" name='project' placeholder='Enter Project ID'></input>
            <input type='radio' className="mr-2" name='searchOrDelete' onChange={handleSearchChange} defaultChecked></input>
            <label className="mr-4"> Search</label>
            <input type='radio' className="mr-2" name='searchOrDelete'onChange={handleDeleteChange}></input>
            <label className="mr-2"> Delete</label>
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold front-semibold hover:text-white px-4 border border-blue-500 rounded mr-2" type='submit'>Submit</button>
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold front-semibold hover:text-white px-4 border border-blue-500 rounded"  onClick={handleClick}>New Project</button>
          </div>
        </form>
      </div>

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
          <ColumnDirective key={index} {...item}/>
        ))}

        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter, Search]}/>
      </GridComponent>
    </div>
  )
}


export default Projects