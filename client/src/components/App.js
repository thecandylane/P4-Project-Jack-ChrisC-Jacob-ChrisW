import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          {/* Add more routes for other pages/components as needed */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

