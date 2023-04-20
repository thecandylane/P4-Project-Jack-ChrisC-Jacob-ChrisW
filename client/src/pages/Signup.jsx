import React from 'react'

const Signup = () => {
  return (
    <div>
        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-[#0f172a] p-8 px-8'>
                  <h2 className='text-4xl text-white font-bold text-center'>SIGNUP</h2>
                  <div className='flex flex-col text-gray-400 py-2'>
                      <label>Username</label>
                      <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
                  </div>
                  <div className='flex flex-col text-gray-400 py-2'>
                      <label>Password</label>
                      <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" />
                
                  </div>
                  <div className='flex flex-col text-gray-400 py-2'>
                      <label>Email</label>
                      <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
                  </div>
                  <div className='flex justify-between text-gray-400 py-2'>
                      <p className='flex items-center'><input className='mr-2' type="checkbox" /> Admin</p>
                      <p className='flex items-center'><input className='mr-2' type="checkbox" /> User</p>
                  </div>
                  
                  <button className='w-full my-5 py-2 bg-teal-500 shadow-lg
                   shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>REGISTER</button>
                  
              </form>
    </div>
  )
}

export default Signup