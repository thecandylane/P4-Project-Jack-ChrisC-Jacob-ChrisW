import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [admin, setAdmin] = useState(false)
    const navigate = useNavigate()
    const handleAdminChange = (e) => {
        setAdmin(e.target.value === 'admin')    
    }


    const handleSignUp = (e) => {
        e.preventDefault();
    
        console.log(username, password, email, admin)
        fetch('http://localhost:5555/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, email, password, admin })
        })
        .then(r => r.json())
        .then(data => {
            console.log(data);
            if (data.id) {
                navigate('/')

                // Registration is successful, you can update the state or redirect the user as needed
                // For example, you can automatically log in the user or show a success message
            } else if (data.error) {
                // Display an error message or handle the error as needed
            }
        });
    };
    
  return (
    <div>
        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-[#0f172a] p-8 px-8'>
                  <h2 className='text-4xl text-white font-bold text-center'>SIGNUP</h2>
                  <div className='flex flex-col text-gray-400 py-2'>
                      <label>Username</label>
                      <input value={username} onChange={(e) => setUsername(e.target.value)} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
                  </div>
                  <div className='flex flex-col text-gray-400 py-2'>
                      <label>Password</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" />
                
                  </div>
                  <div className='flex flex-col text-gray-400 py-2'>
                      <label>Email</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
                  </div>
                  <div className='flex justify-between text-gray-400 py-2'>
                      <p className='flex items-center'><input value='admin' name="userType" className='mr-2' type="radio" onChange={handleAdminChange} /> Admin</p>
                      <p className='flex items-center'><input value='user' name="userType" className='mr-2' type="radio" onChange={handleAdminChange} defaultChecked /> User</p>
                  </div>
                  
                  <button onClick={handleSignUp} className='w-full my-5 py-2 bg-teal-500 shadow-lg
                   shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>REGISTER</button>
                  
              </form>
    </div>
  )
}

export default Signup