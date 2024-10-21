import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  MenuItem, 
  Grid, 
  Box,
  Typography
} from '@mui/material';
import { PlusOutlined } from '@ant-design/icons';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

export default function NewTask() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [task, setTask] = useState({
    name: '',
    description: '',
    status: 'pending',
    category: '',
    dueDate: null
  });
  const API_URL = import.meta.env.VITE_APP_API_URL || 'https://taskmanager-tcy7.onrender.com';

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const fetchCategories = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/categories/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const categoryNames = response.data.map(category => category.name);
      setCategories(categoryNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addCategory = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(
        `${API_URL}/api/categories/`,
        { name: newCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setCategories(prev => [...prev, newCategory]);
      setTask(prev => ({ ...prev, category: newCategory }));
      setNewCategory('');
      setIsAddingCategory(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'category' && value === 'add_new') {
      setIsAddingCategory(true);
      return;
    }
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setTask(prev => ({ ...prev, dueDate: date }));
  };
  
  const handleAddTask = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(
          `${API_URL}/api/tasks/`,
          { ...task }, // Adding the name field in the request body
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log("addtask" , response)
        handleClose();

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
  };

  const handleClose = () => {
    setOpen(false);
    setTask({
      name: '',
      description: '',
      status: 'pending',
      category: '',
      dueDate: null
    });
  };

  return (
    
     <Box  sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <Button 
        variant="contained" 
        startIcon={<PlusOutlined />}
        onClick={() => setOpen(true)}
        sx={{ backgroundColor: '#1976d2'}}
      >
        Add Task
      </Button>
     
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Add New Task
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={task.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={task.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={task.status}
                onChange={handleChange}
              >
                {['completed', 'pending', 'in-progress'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Due Date"
                  value={task.dueDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={task.category}
                onChange={handleChange}
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
                <MenuItem value="add_new">
                  Add New Category
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTask} color="primary">Add Task</Button>
        </DialogActions>

        {isAddingCategory && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: '1'
            }}
          >
            <Box
              sx={{
                backgroundColor: 'background.paper',
                padding: 3,
                borderRadius: 1,
                width: '80%',
                maxWidth: 400,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Add New Category
              </Typography>
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                label="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addCategory();
                  }
                }}
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => setIsAddingCategory(false)} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button onClick={addCategory} color="primary" variant="contained">
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Dialog>
    
      </Box>
  );
};


