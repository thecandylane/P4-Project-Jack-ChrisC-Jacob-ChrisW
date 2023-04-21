import React, { useEffect, useState } from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import {KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban'
import { kanbanData, kanbanGrid } from '../data/dummy'

import { Stacked, Pie, Button, SparkLine } from '../components';

import { earningData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Userview = ({userId}) => {
  const [userViewItem, setUserViewItem] = useState({username: ''})
  const [tasks, setTasks] = useState([{id: ''}])
  const [projects, setProjects] = useState([{id: ''}])
  const navigate = useNavigate()

  useEffect(()=>{
    fetch(`http://localhost:5555/users/${userId}`)
    .then(res=>res.json())
    .then((data)=>{
      setUserViewItem(data)
      setTasks(data.tasks)
      setProjects(data.projects)
  })
  }, [])

console.log(userId)
console.log(userViewItem)
console.log(projects)
console.log(tasks)
  
const { currentColor } = useStateContext();
  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white
         dark:text-gray-200
          dark:bg-secondary-dark-bg
           h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-home-page bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400">Earnings</p>
                <p className= "text-2xl">$63,448.78</p>
                <p className= "text-2xl text-white" >{userViewItem.username}</p>

              </div>

            </div>
            <div className="mt-6">
              <button type="button" onClick={()=> navigate('/users')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" >Users List</button>
            </div>

        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div
            key={item.title}
            className="bg-white
            dark:text-gray-200
            dark:bg-secondary-dark-bg
            md:w-56
            p-4 pt-9 rounded-2xl"
            >
              <button type="button" style={{color:item.iconColor, backgroundColor: item.iconBg}}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl">
              {item.icon}


              </button>
              <p className='mt-3'>
                <span className="text-lg font-semibold">
                  {item.amount}
                </span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>

              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>

            </div>

          ))}

        </div>

      </div>

      <div className='flex gap-10 flex-wrap justify-center'>
        <div className="bg-white dark:text-gray-200
        dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
           <KanbanComponent
              id="kanban"
              dataSource={tasks} 
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

      </div>

    </div>
  )
}
  


export default Userview;