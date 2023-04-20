import React, {useState, useEffect} from 'react';
import {KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban'
import { kanbanData, kanbanGrid } from '../data/dummy'
import { Header } from '../components'



const Kanban = () => {
  const [taskItem, setTaskItem]= useState([{}]);

  useEffect(()=>{
    fetch('http://127.0.0.1:5555/tasks')
    .then(res=>res.json()
    .then(data=>setTaskItem(data)))
  },[])

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Kanban" />
      <KanbanComponent
        id="kanban"
        dataSource={taskItem}
        cardSettings={{ contentField: 'description', headerField: 'title' }}
        keyField="status"
        
      
      >
        <ColumnsDirective>
          {kanbanGrid.map((item, index) =>
          <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  )
}

export default Kanban