import React, {useState, useEffect} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective,  
    Page, Search, Inject, Toolbar, Sort } from '@syncfusion/ej2-react-grids';

import {employeesGrid} from '../data/dummy';
import { Header } from '../components';

const Users = () => {
  const [userItem, setUserItem]= useState([{}]);

  useEffect(()=>{
    fetch('http://127.0.0.1:5555/users')
    .then(res=>res.json()
    .then(data=>setUserItem(data)))
  },[])
  console.log(Object.keys(userItem[0]))

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category = "Page" title="Users" />
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