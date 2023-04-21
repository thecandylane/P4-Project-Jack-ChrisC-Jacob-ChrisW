import React, {useEffect, useState} from 'react';
import {KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban'
import { kanbanData, kanbanGrid } from '../data/dummy'
import { Header } from '../components'
import { useNavigate } from 'react-router-dom';



const Kanban = () => {
  const navigate = useNavigate()
  const [taskItem, setTaskItem] = useState([{}])
  useEffect(() => {
    fetch('http://localhost:5555/@me',{
      'credentials':'include'
    })
    .then(r => {
      if (r.ok){
        r.json().then(data => {
          console.log(data)
          console.log(data.tasks)
          setTaskItem(data.tasks)
        })
    } else{
        navigate('/')
    }
      
    })
  },[])
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Kanban" />
      <KanbanComponent
        id="kanban"
        dataSource={taskItem} 
        cardSettings={{ contentField: 'description', headerField: 'title' }}
        keyField="status"
        enablePersistence
        
      
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