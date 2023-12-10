import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const TaskItem = ({ task }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography>{task.description}</Typography>
        <Typography color={task.completed ? 'textSecondary' : 'error'}>
          {task.completed ? 'Completed' : 'Incomplete'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
