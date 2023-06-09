import React, { useEffect, useState } from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import { Stacked, Pie, Button, SparkLine } from '../components';
import { BiTask } from 'react-icons/bi'

import { earningData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Projectview = ({projectId, projectViewItem, setProjectViewItem}) => {
  // const [projectViewItem, setProjectViewItem] = useState({name: ""})
  const [tasks, setTasks] = useState([{id: ''}])
  const [users, setUsers] = useState([{id: ''}])
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState()
  useEffect(() => {
    fetch('http://localhost:5555/@me',{
      'credentials':'include'
    })
    .then(r => {
      if (r.ok){
      r.json().then(data => setCurrentUserId(data.id))
    } else{
      navigate('/')
    }
      
    })
  },[])

useEffect(()=>{
  fetch(`http://localhost:5555/projects/${projectId}`)
  .then(res=>res.json())
  .then((data)=>{
    setProjectViewItem(data)
    setTasks(data.tasks)
    setUsers(data.users)
  })
},[])

// console.log(projectId)
// console.log(projectViewItem.tasks)
// console.log(tasks)
// console.log(users[0].username)

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
  // console.log(params.id)
  // console.log(params.id)

  const handleJoinProject = () => {
    console.log(projectViewItem)
    const {id} = projectViewItem
    console.log(id)
    fetch('http://localhost:5555/user_projects', {
      method:"POST",
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify({"project_id": id, "user_id": currentUserId})
    })
  }

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
                <p className= "text-5xl text-white font-bold drop-shadow-lg">{projectViewItem.name}</p>

              </div>

            </div>
            <div className="mt-6">
              <button type="button" onClick={()=> navigate('/projects')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" >Projects List</button>
              <button type="button" onClick={()=> navigate('/tasks')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Tasks List</button>
              <button type="button" onClick={handleJoinProject} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Join Project</button>


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
            <div className="flex flex-row">
              <button type="button" 
              className="bg-white border text-5xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mr-10">
                <BiTask/>


              </button>
              <div>
                {item.status}
              </div>
            </div>
              <p className='mt-3'>
                <span className="text-lg font-semibold">
                  {item.title}
                </span>
                {/* <span className={`text-sm text-red ml-2`}>
                  {item.percentage}
                </span> */}

              </p>
              <div className="flex flex-row">
                <div className="text-sm text-gray-400 mt-1 mr-4">{item.description}</div>
                <div className="text-sm text-gray-400 mt-1">
                  {users.map((item)=> (
                    <div
                    key={item.username}
                    className="bg-white
                    dark:text-gray-200
                    dark:bg-secondary-dark-bg
                    md:w-35
                    p-4 pt-9 rounded-2xl
                    border"
                    >
                      {item.username}
                    </div>
                  ))}
                </div>

              </div>
              

            </div>

          ))}

        </div>
        <div className="mt-10 flex gap flex-wrap justify-center">

        </div>

      </div>



    </div>
  )
}
  


export default Projectview;