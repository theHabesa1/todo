// src/components/TaskForm.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './TaskList';

const TaskForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || { title: '', description: '', completed: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your API
      const response = await axios.post('http://localhost:8080/api/tasks', formData);

      // Handle the successful response
      if (response.status === 201) {
        toast.success('Task created successfully!', { position: toast.POSITION.TOP_RIGHT });

        // Clear the form
        setFormData({ title: '', description: '', completed: false });
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task. Please try again.', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        variant="outlined"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Save Task
      </Button>
    </form>

    <TaskList/>
    </>
  );
};

export default TaskForm;
