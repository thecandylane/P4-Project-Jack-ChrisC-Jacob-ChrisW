import React, { useEffect, useState } from "react";
import './App.css';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" element={<Dashboard />} />
          {/* Add more routes for other pages/components as needed */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

