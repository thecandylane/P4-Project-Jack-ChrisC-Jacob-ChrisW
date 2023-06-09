import React, {useEffect, useState} from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { BiTask } from 'react-icons/bi'

import { Stacked, Pie, Button, SparkLine } from '../components';

import { earningData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({projects:[]})
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  useEffect(() => {
    fetch('http://localhost:5555/@me',{
      'credentials':'include'
    })
    .then(r => {
      if (r.ok){
      r.json().then((data) => {
        setCurrentUser(data)
        setProjects(data.projects)
        setTasks(data.tasks)
      })
    } else{
      navigate('/')
    }
      
    })
  },[])

  console.log(currentUser)
  console.log(currentUser.projects)
  console.log(currentUser.setTasks)
  



  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white
         dark:text-gray-200
          dark:bg-secondary-dark-bg
           h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400"></p>
                <p className= "text-2xl">{currentUser.username}</p>

              </div>

            </div>
            <div className="mt-6">
              <button type="button" onClick={()=> navigate('/users')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" >Users List</button>


            </div>

        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {tasks.map((item) => (
            <div
            key={item.id}
            className="bg-white
            dark:text-gray-200
            dark:bg-secondary-dark-bg
            md:w-56
            p-4 pt-9 rounded-2xl"
            >
            <div>
              <button type="button"className="bg-white border text-5xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mr-10">
                <BiTask/>


              </button>
            </div>

              <p className="text-sm text-black mt-1">{item.title}</p>

            </div>

          ))}


        </div>
        <div>
        {projects.map((item) => (
            <div
            key={item.name}
            className="bg-white
            dark:text-gray-200
            dark:bg-secondary-dark-bg
            md:w-56
            p-4 pt-9 rounded-2xl"
            >
            <div>
              <button type="button"className="bg-white border text-5xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl mr-10">
                <BiTask/>


              </button>
            </div>

              <p className="text-sm text-black mt-1">{item.name}</p>

            </div>

          ))}
        </div>

      </div>

      <div className='flex gap-10 flex-wrap justify-center'>
        <div className="bg-white dark:text-gray-200
        dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span><GoPrimitiveDot /></span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-green-200 hover:drop-shadow-xl">
                <span><GoPrimitiveDot /></span>
                <span>Budget</span>
              </p>

            </div>

          </div>
          <div className="mt-10 flex gap flex-wrap justify-center">
            <div className="border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">$93,438</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">23%</span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>

              </div>
              <div className="mt-8">
                <p>
                  <span className="text-3xl font-semibold">$48,438</span>
                  
                </p>
                <p className="text-gray-500 mt-1">Expense</p>

              </div>
              <div className='mt-5'>
              

              </div>
              <div className="mt-10">
                <Button 
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius = "10px"
                />

              </div>

            </div>
            <div>
             

            </div>

          </div>


        </div>

      </div>

    </div>
  )
}

export default Home