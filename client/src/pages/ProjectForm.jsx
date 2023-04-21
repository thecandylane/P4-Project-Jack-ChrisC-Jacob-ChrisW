import { useState } from "react"



const ProjectForm = () => {
    const [Project, setProject] = useState({
        'name':'',
        'description':''
    })
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setProject(prevProj => ({
            ...prevProj,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:5555/projects', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(Project)
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }

    return(
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            
            <form className='max-w-[400px] w-full mx-auto rounded-lg bg-[#0f172a] p-8 px-8'onSubmit={handleSubmit}>
            <h2 className='text-4xl text-white font-bold text-center'>PROJECT FORM</h2>
                <div className='flex flex-col text-gray-400 py-2'>
                    <input name="name" type="text" onChange={(e) => handleChange(e)} placeholder="Enter Project Name"></input>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <input name="description" type="text" onChange={(e) => handleChange(e)} placeholder="Enter Project Description"></input>
                </div>
               
                
                <input className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg' type='submit' value='Add Project' />
            </form>
        </div>
    )
} 

export default ProjectForm