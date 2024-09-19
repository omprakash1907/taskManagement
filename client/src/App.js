// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider, AuthContext } from './auth';
import EditTask from './components/EditTask';

const App = () => {
  const { isAuthenticated, logout } = React.useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout title="Task Management Dashboard" />}>
          {isAuthenticated ? (
            <>
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/create" element={<CreateTask />} />
              <Route path="/edit/:id" element={<EditTask />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Route>
      </Routes>
    </Router>
  );
};

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
