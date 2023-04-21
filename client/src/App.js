import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Home, Tasks, Calendar, Users, Stacked, Pyramid, Projects, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';
import Login from './pages/Login';
import Projectview from './pages/Projectview';
import Userview from './pages/Userview';
import Taskview from './pages/Taskview';
import Signup from './pages/Signup';
import TaskForm from './pages/TaskForm';
import { useStateContext } from './contexts/ContextProvider';
import './App.css'
import { Theme } from '@syncfusion/ej2-react-charts';
import ProjectForm from './ProjectForm';


const App = () => {
    const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();
    const [projectId, setProjectId] = useState()
    const [userId, setUserId]= useState()
    

    // const [user, setUser] = useState({})

    // useEffect(() => {
    //     fetch('http://localhost:5555/@me')
    //     .then(r => r.json())
    //     .then(data => console.log(data))
    // },[])


  return (
    <div className={currentMode === 'Dark' ? 'dark': ''}>
        <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
                    <TooltipComponent content="Settings" position="Top">
                        <button type="button" className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white" 
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%'}}>
                            <FiSettings />
                        </button>
                    </TooltipComponent>
                </div>
                {activeMenu ? (
                    <div className="w-72 fixed sidebar
                    dark:bg-secondary-dark-bg bg-white">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <Sidebar />
                    </div>
                )
            }
             <div className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }>
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                    <Navbar />
                </div>

             
             <div>
                {themeSettings && <ThemeSettings />}
                <Routes>
                    {/* Dashboard */}
                    <Route path="/" element={<Login/>} />
                    <Route path="/home" element={<Home />} />

                    {/* Products */}
                    <Route path="/tasks" element={<Tasks />} />

                    {/* <Route path="/tasks/params.id" element={<Tasks />} /> */}
                    <Route path="/users" element={<Users setUserId={setUserId}/>} />
                    <Route path="/projects"  element={<Projects setProjectId={setProjectId} />} />
                    {/* <Route path="/projects/id" element={<Projects />} /> */}

                    {/* Apps */}
                    <Route path="/kanban" element={<Kanban />} />
                    <Route path="/editor" element={<Editor />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/color-picker" element={<ColorPicker />} />

                    {/* Charts */}
                    <Route path="/line" element={<Line />} />
                    <Route path="/area" element={<Area />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/financial" element={<Financial />} />
                    <Route path="/color-mapping" element={<ColorMapping />} />
                    <Route path="/pyramid" element={<Pyramid />} />
                    <Route path="/stacked" element={<Stacked />} />

                    {/* {extra views} */}
                    <Route path="/projects/:id" element={<Projectview projectId={projectId}/>} />
                    <Route path="/tasks/:id" element={<Taskview />} />
                    <Route path="/users/:id" element={<Userview userId={userId}/>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path='/task-form' element={<TaskForm/>}/>
                    <Route path='/project-form' element={<ProjectForm/>} />
                    
                </Routes>
             </div>
            </div>
            </div>
        </BrowserRouter>
    </div>
  )
}

export default App