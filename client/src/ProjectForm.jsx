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
        <>
            <form onSubmit={handleSubmit}>
                <input name="name" type="text" onChange={(e) => handleChange(e)} placeholder="enter project name"></input>
                <input name="description" type="text" onChange={(e) => handleChange(e)} placeholder="enter project desc"></input>
                <input type='submit' value='Add Project' />
            </form>
        </>
    )
} 

export default ProjectForm