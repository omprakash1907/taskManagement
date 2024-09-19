import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { getTasks, deleteTask, updateTask } from '../api'; // Ensure deleteTask API exists
import { AuthContext } from '../auth';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000'); // Ensure backend URL is correct

const TaskList = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks(token);
      setTasks(fetchedTasks);
    };

    fetchTasks();

    socket.on('taskCreated', (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    });

    socket.on('taskDeleted', (deletedTaskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deletedTaskId));
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, [token]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId, token); 
      
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
 
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };
  

  const handleUpdate = (taskId) => {
    navigate(`/edit/${taskId}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Task List</h2>
      <div className="row">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="col-md-4 mb-4" key={task._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                  <p className="card-text">
                    <strong>Category: </strong> {task.category}
                  </p>
                  <p className="card-text">
                    <strong>Due Date: </strong> {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleUpdate(task._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
