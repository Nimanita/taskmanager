import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Grid, 
  IconButton 
} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';

const ViewTaskDialog = ({ open, handleClose, task }) => {
  if (!task) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Task Details
     
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Name</Typography>
            <Typography>{task.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Description</Typography>
            <Typography>{task.description}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Status</Typography>
            <Typography>{task.status}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Due Date</Typography>
            <Typography>{new Date(task.dueDate).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Category</Typography>
            <Typography>{task.category || 'N/A'}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewTaskDialog;


