import React, {useState} from 'react';


function Login({setUser, getUserTasks}){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleUserChange(e) {
    setUsername(e.target.value)
    console.log(username)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  
  function handleSubmit(e) {
    e.preventDefault()

    fetch('http://localhost:5555/users')
      .then(r => r.json())
      .then(data => {
        const user = data.find((user) => user.username === username && user.password === password)
        // setUser(user)
        // console.log(user)
        getUserTasks(user)
      })
  }

  return(
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input placeholder="Enter Username" type='text' value={username} onChange={(e) => handleUserChange(e)}></input>
          <label>Username</label>
        </div>
        <div className="input">
          <input placeholder="Enter Password" type='password' value={password} onChange={(e) => handlePasswordChange(e)}></input>
          <label>Password</label>
        </div>
        <div className='logInButton'>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login;
