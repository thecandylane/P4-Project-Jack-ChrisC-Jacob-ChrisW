import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import Navbar from "./NavBar";
import LoginButton from "./Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" element={<LoginButton />} /> 
          <Route exact path="/home" element={<Dashboard />} />
          {/* Add more routes for other pages/components as needed */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

