import React, { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TaskItem from './TaskItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from your backend API
    // You can use the Fetch API or a library like axios
    fetch('http://localhost:8080/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleEdit = (taskId) => {
    // Add logic for editing a task, e.g., navigate to an edit page
    console.log('Edit task with id:', taskId);
  };

  const handleDelete = async (taskId) => {
    try {
      // Make a DELETE request to your API
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle the successful response
      if (response.ok) {
        // Update the UI by removing the deleted task
        setTasks(tasks.filter(task => task.id !== taskId));
        // Show a success toast message
        toast.success('Task deleted successfully!', { position: toast.POSITION.TOP_RIGHT });
      } else {
        // Show an error toast message
        toast.error('Failed to delete task. Please try again.', { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      // Show an error toast message
      toast.error('Failed to delete task. Please try again.', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  const handleMarkAsCompleted = async (taskId) => {
    try {
      // Make a PUT request to your API to mark the task as completed
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
      });

      // Handle the successful response
      if (response.ok) {
        // Update the UI by marking the task as completed
        setTasks(tasks.map(task => (task.id === taskId ? { ...task, completed: true } : task)));
        // Show a success toast message
        toast.success('Task marked as completed!', { position: toast.POSITION.TOP_RIGHT });
      } else {
        // Show an error toast message
        toast.error('Failed to mark task as completed. Please try again.', { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      console.error('Error marking task as completed:', error);
      // Show an error toast message
      toast.error('Failed to mark task as completed. Please try again.', { position: toast.POSITION.TOP_RIGHT });
    }
  };


  return (
    <div>
      <h1>Task List</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(task.id)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(task.id)}>
                    Delete
                  </Button>
                  {!task.completed && (
                    <Button variant="outlined" onClick={() => handleMarkAsCompleted(task.id)}>
                      Mark as Completed
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskList;
