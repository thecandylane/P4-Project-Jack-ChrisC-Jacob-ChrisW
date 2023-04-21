import React, { useEffect, useState } from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import { Stacked, Pie, Button, SparkLine } from '../components';
import { BiTask } from 'react-icons/bi'

import { earningData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Projectview = ({projectId}) => {
  const [projectViewItem, setProjectViewItem] = useState({name: ""})
  const [tasks, setTasks] = useState([{id: ''}])
  const navigate = useNavigate();
  

useEffect(()=>{
  fetch(`http://localhost:5555/projects/${projectId}`)
  .then(res=>res.json())
  .then((data)=>{
    setProjectViewItem(data)
    setTasks(data.tasks)
  })
},[])

console.log(projectId)
console.log(projectViewItem.tasks)
console.log(tasks)

// console.log(projectViewItem.name)
// console.log(projectViewItem.description)
// console.log(projectViewItem.id)
// console.log(projectViewItem.tasks)
// console.log(projectViewItem.users)

const { currentColor } = useStateContext();

  let params = useParams()
  useEffect(() => 
    fetch(`http://127.0.0.1:5555/projects/${params.id}`)
    .then(resp => resp.json())
    .then(data => data)
    , [])
  console.log(params.id)

  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white
         dark:text-gray-200
          dark:bg-secondary-dark-bg
           h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-white">Project</p>
                <p className= "text-2xl text-white font-bold">{projectViewItem.name}</p>

              </div>

            </div>
            <div className="mt-6">
              <button type="button" onclick={()=> navigate('/projects')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" >ProjectList</button>
              <button type="button" onclick={()=> navigate('/projects')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Task List</button>


            </div>

        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {tasks.map((item) => (
            <div
            key={item.title}
            className="bg-white
            dark:text-gray-200
            dark:bg-secondary-dark-bg
            md:w-56
            p-4 pt-9 rounded-2xl
            border"
            >
              <button type="button" 
              className="bg-[#E5FAFB] text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl">
                <BiTask/>


              </button>
              <p className='mt-3'>
                <span className="text-lg font-semibold">
                  {item.description}
                </span>
                {/* <span className={`text-sm text-red ml-2`}>
                  {item.percentage}
                </span> */}

              </p>
              <div className="flex flex-row">
                <p className="text-sm text-gray-400 mt-1 mr-4">{item.title}</p>
                <p className="text-sm text-gray-400 mt-1">User</p>

              </div>
              

            </div>

          ))}

        </div>

      </div>



    </div>
  )
}
  


export default Projectview;