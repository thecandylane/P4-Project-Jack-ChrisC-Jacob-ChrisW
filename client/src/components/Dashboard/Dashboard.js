import React from 'react';
import ProjectList from './ProjectList';
import TaskList from './TaskList';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <ProjectList />
      <TaskList />
    </div>
  );
};

export default Dashboard;