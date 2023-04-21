import React, { useState, useEffect } from 'react'
import login from '../data/login.jpg'
import { Header } from '../components'
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [demo, setDemo] = useState(false)

    const handleSignIn = (e) => {
        e.preventDefault();
    
        // console.log(email, password);

        fetch('http://localhost:5555/login', {
            method:"POST",
            headers: {"Content-Type":'application/json'},
            body: JSON.stringify({email, password}),
            credentials: 'include'
        })
        .then(r => r.json())
        .then(data => {
            console.log(data);
            if (data.id) {
            navigate('/Home');
            } else if (data.error) {
            // Handle error
            console.log(data.error)
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const handleDemo = () => {
        setDemo(true)
    }
    const handleAdmin = () => {
        console.log('admin')
        fetch('http://localhost:5555/login/admin', {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            credentials: 'include'
        })
        .then(r => r.json())
        .then(data => {
            console.log(data);
            if (data.id) {
                navigate('/Home');
            } else if (data.error) {
                // Handle error
                console.log(data.error)
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        setDemo(false)
    }
    
    const handleUser = () => {
        console.log('user')
        fetch('http://localhost:5555/login/user', {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            credentials: 'include'
        })
        .then(r => r.json())
        .then(data => {
            console.log(data);
            if (data.id) {
                navigate('/Home');
            } else if (data.error) {
                // Handle error
                console.log(data.error)
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        setDemo(false)
    }
    

    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
          <div className='hidden sm:block'>
              <img className='w-full h-full object-cover' src={login} alt="" />
          </div>
  
          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
              <form className='max-w-[400px] w-full mx-auto rounded-lg bg-[#0f172a] p-8 px-8'>
                  <h2 className='text-4xl text-white font-bold text-center'>SIGN IN</h2>
                  <div className='flex flex-col text-gray-400 py-2'>
                      <label>Email</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} 
                       className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
                  </div>
                  <div className='flex flex-col text-gray-400 py-2'>
                      <label>Password</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)}
                       className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" />
                  </div>
                  <div className='flex justify-between text-gray-400 py-2'>
                      <p className='flex items-center'><input className='mr-2'
                       type="checkbox" /> Remember Me</p>
                      <p>Forgot Password</p>
                  </div>
                  <button onClick={handleSignIn} className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50
                    hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>SIGNIN</button>
                  <button className='w-full my-5 py-2 bg-teal-500 shadow-lg
                   shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>
                    <Link to = "/signup">
                        <span>REGISTER</span>
                    </Link>
                    </button>
                    {demo ? 
                    <>
                        <button onClick={handleAdmin} className=' w-1/3 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50
                        hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>Admin</button>
                        <button onClick={handleUser} className=' w-1/3 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50
                        hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>User</button>
                    </>
                    :
                    <button onClick={handleDemo} className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50
                    hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>DEMO</button>
                     }
                    {/* <button onClick={handleLogout}>Logout</button> */}
                  
              </form>
          </div>
      </div>
    )
  }