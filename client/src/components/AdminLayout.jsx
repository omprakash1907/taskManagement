// src/components/AdminLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom'; 

const AdminLayout = ({ title }) => {
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      
      {/* Main content area */}
      <div id="content-wrapper" className="flex-grow-1">
        <Header title={title} />
        
        <div className="container mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
