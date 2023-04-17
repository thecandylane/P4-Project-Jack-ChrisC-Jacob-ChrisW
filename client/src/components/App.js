import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import Navbar from "./NavBar";
import Login from "./Login";
import ProjectList from "./ProjectList";
import TaskList from "./TaskList";
import Profile from "./Profile";

function App() {

  const [login, setLogin] = useState(false)
  // const [user, setUser] = useState()
  const [userTasks, setUserTasks] = useState()

  function getUserTasks(user) {
    console.log(user)
  }

  return (
    <div className="App">
      <Router>
        <Navbar/>
          {/* <Route path="/login" component={Login } getUserTasks={getUserTasks} />  */}
          <Route path="/login" render={() => <Login getUserTasks={getUserTasks} />} /> 
          <Route exact path="/home" component={Dashboard } />
          <Route exact path="/projects" component={ProjectList} />
          <Route exact path="/tasks" component={TaskList} />
          <Route exact path="/profile" component={Profile} />
          {/* Add more routes for other pages/components as needed */}
      </Router>
    </div>
  );
}

export default App;

