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
  IconButton,
  Box,
  Typography
} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

const EditTaskDialog = ({ open, handleClose, task, onSave }) => {
  const [editedTask, setEditedTask] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.VITE_APP_API_URL || 'https://taskmanager-tcy7.onrender.com';

  useEffect(() => {
    if (open && task) {
        setIsLoading(true);
        console.log(task.status)
        setEditedTask({
            ...task,
            status: task.status,
            category: task.category || '',
            dueDate: task.dueDate ? new Date(task.dueDate) : null
          });
        console.log(editedTask , task)
        setIsLoading(false);
        fetchCategories();
    }
  }, [open, task]);

  const fetchCategories = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/categories/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      const categoryNames = response.data.map(category => category.name);
      setCategories(categoryNames);
      console.log(categoryNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addCategories = async (newCategory) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/api/categories/`,
        { name: newCategory }, // Adding the name field in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("addcategory" , response)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setEditedTask(prev => ({ ...prev, dueDate: date }));
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      addCategories(newCategory)
      setCategories(prev => [...prev, newCategory]);
      setEditedTask(prev => ({ ...prev, category: newCategory }));
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  const handleSave = () => {
    onSave(editedTask);
    console.log("saved" , editedTask)
    handleClose();
  };

  const handleDialogClose = () => {
    setNewCategory('');
    setIsAddingCategory(false);
    handleClose();
  };

  if (!editedTask) return null;

  return (
    <Dialog 
      open={open} 
      onClose={handleDialogClose} 
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle >
        Edit Task
    
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} pt={1}>
          <Grid item xs={12} >
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={editedTask.name}
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
              value={editedTask.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Status"
              name="status"
              value={editedTask.status || "pending"}
              onChange={handleChange}
            >
              {['completed', 'pending', 'in-progress'].map((option) => (
                <MenuItem key={option} value={option} selected={option === editedTask.status}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Due Date"
                value={editedTask.dueDate}
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
              value={editedTask.category}
              onChange={handleChange}
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
              <MenuItem value="add_new" onClick={() => setIsAddingCategory(true)}>
                Add New Category
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
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
            zIndex : '1'
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
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddCategory();
                }
              }}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsAddingCategory(false)} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory} color="primary" variant="contained">
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default EditTaskDialog;