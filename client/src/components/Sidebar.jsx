import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav id="sidebar" className="bg-light sidebar">
      <div className="sidebar-header p-3">
        <h4>Task Management</h4>
      </div>
      <ul className="list-unstyled components">
        <li>
          <Link to="/tasks" className="nav-link">
            <i className="bi bi-list-task"></i> Tasks
          </Link>
        </li>
        <li>
          <Link to="/create" className="nav-link">
            <i className="bi bi-plus-circle"></i> Add Task
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
