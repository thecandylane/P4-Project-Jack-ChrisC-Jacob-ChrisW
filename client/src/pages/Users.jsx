import React, {useState, useEffect} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective,  
    Page, Search, Inject, Toolbar, Sort } from '@syncfusion/ej2-react-grids';

import {employeesGrid} from '../data/dummy';
import { Header } from '../components';
import { useNavigate } from 'react-router-dom';

const Users = ({setUserId}) => {
  const navigate = useNavigate()
  const [userItem, setUserItem]= useState([{}]);
  const [deleteChange, setDeleteChange] = useState('search')

  function handleSearchChange(e){
    setDeleteChange('search')
  }

  function handleDeleteChange(e){
    setDeleteChange('delete')
  }

  function handleSubmit(e){
    e.preventDefault()
    if (deleteChange === 'search'){
      // console.log(e.target.user.value)
      setUserId(e.target.user.value)
      navigate(`/users/${e.target.user.value}`)
    }
    else if(deleteChange === 'delete'){
      fetch(`http://localhost:4000/user/${e.target.user.value}`, {
        method: "DELETE",
      })
      .then(res => res.json())
      .then(res => console.log(res))
      window.location.reload(false)
    }
  }

  useEffect(()=>{
    fetch('http://127.0.0.1:5555/users')
    .then(res=>res.json()
    .then(data=>setUserItem(data)))
  },[])
  // console.log(Object.keys(userItem[0]))

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category = "Page" title="Users" />
      <form onSubmit={handleSubmit}>
        <div >
          <input className="border border-black-200 mr-2" name='user' placeholder='Enter Project ID'></input>
          <input type='radio' name='searchOrDelete' onChange={handleSearchChange} defaultChecked></input>
          <label className="mr-2"> Search</label>
          <input type='radio' name='searchOrDelete' onChange={handleDeleteChange}></input>
          <label className="mr-2"> Delete</label>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold front-semibold hover:text-white px-4 border border-blue-500 rounded" type='submit'>Submit</button>
        </div>
      </form>
      <GridComponent
        
        dataSource={userItem}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width="auto"
      
      >
        <ColumnsDirective>
        {employeesGrid.map((item, index) => (
          <ColumnDirective key={index} {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Sort]}/>
      </GridComponent>
    </div>
  )
}

export default Users