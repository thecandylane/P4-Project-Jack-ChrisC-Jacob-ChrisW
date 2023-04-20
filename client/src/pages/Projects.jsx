 import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit,
Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

const Projects = () => {
  const [projectItem, setProjectItem]= useState([{
    'field': '',
    'id': 0,
    'description': ''
  }])

  // function handleRowSelected(args) {
  //   console.log(args.data.CustomerID); // logs the selected row data

  // }

  // function ProjectItem(){
    
    // let params = useParams()
    // console.log(params)
    useEffect(()=>{
      fetch('http://127.0.0.1:5555/projects')
      .then(res=>res.json()
      .then(data=>setProjectItem(data)))
    },[])
    console.log(Object.keys(projectItem[0]))
  // }


  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category = "Page" title="Projects" />
      <GridComponent
        
        dataSource={projectItem}
        allowPaging
        allowSorting
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true}}
        width="auto"
        // rowSelected={handleRowSelected}
      >
        <ColumnsDirective >
        {customersGrid.map((item, index) => (
          <ColumnDirective key={index} {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]}/>
      </GridComponent>
    </div>
  )
}


export default Projects