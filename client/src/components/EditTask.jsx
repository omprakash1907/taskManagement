// src/components/EditTask.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, updateTask } from '../api'; // API methods
import { AuthContext } from '../auth';

const EditTask = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams(); // Get task ID from route parameters
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Fetch the existing task data by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await getTaskById(id, token); // Fetch task by ID
        setTitle(task.title);
        setDescription(task.description);
        setCategory(task.category);
        setDueDate(new Date(task.dueDate).toISOString().split('T')[0]); // Format date to yyyy-mm-dd
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  }, [id, token]);
  console.log(title)

  // Handle form submission to update the task
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTaskData = {
      title,
      description,
      category,
      dueDate,
    };

    try {
      await updateTask(id, updatedTaskData, token); // Update task by ID
      navigate('/tasks'); // Navigate back to task list after successful update
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
