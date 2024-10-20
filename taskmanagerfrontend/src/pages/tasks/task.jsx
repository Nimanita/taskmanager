import Typography from '@mui/material/Typography';

// project import
import { EditFilled, EyeFilled , DeleteFilled, DeleteColumnOutlined } from '@ant-design/icons';
import { Card, IconButton } from '@mui/material';

import MainCard from 'components/MainCard';
import React, { useEffect, useState } from "react";
import { TableSortLabel } from "@mui/material";
import { 
  
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  CircularProgress,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  
} from "@mui/material";
import axios from "axios";
import ViewTaskDialog from './ViewTaskDialog';
import EditTaskDialog from './EditTaskDialog';
import DeleteTaskDialog from './DeleteTaskDialog';
// ==============================|| SAMPLE PAGE ||============================== //

export default function Task() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortDirection, setSortDirection] = useState('asc'); // or 'desc'
    const [sortColumn, setSortColumn] = useState('dueDate');
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const uniqueCategories = ["all", ...new Set(tasks.map(task => task.category || "N/A"))];
    const uniqueStatuses = ["all", ...new Set(tasks.map(task => task.status))];
    const API_URL = import.meta.env.VITE_APP_API_URL || 'https://taskmanager-tcy7.onrender.com';

   

    const sortTasks = (tasks) => {
        return tasks.sort((a, b) => {
          const aValue = a[sortColumn] instanceof Date ? a[sortColumn] : a[sortColumn].toLowerCase();
          const bValue = b[sortColumn] instanceof Date ? b[sortColumn] : b[sortColumn].toLowerCase();
          
          if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        });
      };

    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = async () => {
        try {
          const token = sessionStorage.getItem('token'); // Retrieve the token from session storage
          const response = await axios.get(`${API_URL}/api/tasks/`, {
            headers: {
              Authorization: `Bearer ${token}` // Include the token in the authorization header
            }
          });
          console.log(response)
          setTasks(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          setLoading(false);
        }
      };
      
      const handleViewTask = (task) => {
        setSelectedTask(task);
        setViewDialogOpen(true);
      };
      
      const handleEditTask = (task) => {
        setSelectedTask(task);
        setEditDialogOpen(true);
      };
      
      const handleSaveTask = async (editedTask) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.put(
              `${API_URL}/api/tasks/`,
              { ...editedTask }, // Adding the name field in the request body
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );
            console.log("updatetask" , response)
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
      };

      const handleDeleteClick = (task) => {
        setSelectedTask(task);
        setDeleteDialogOpen(true);
      };
      
      const handleConfirmDelete = async (task) => {
        try {
          const token = sessionStorage.getItem('token');
          console.log(token, task);
          const response = await axios.delete(
            `${API_URL}/api/tasks/${task._id}`, // Include the task ID in the URL
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log(response);
          // Refresh the tasks list
          fetchTasks();
          setDeleteDialogOpen(false);
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      };

    const handleSearchChange = (event) => {
      setSearch(event.target.value);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const filteredTasks = sortTasks(tasks.filter((task) => {
      const matchesSearch = 
          task.name.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()) ||
          task.status.toLowerCase().includes(search.toLowerCase()) ||
          new Date(task.dueDate).toLocaleDateString().includes(search.toLowerCase()) ||
          (task.category || "N/A").toLowerCase().includes(search.toLowerCase());

      const matchesCategory = categoryFilter === "all" || (task.category || "N/A") === categoryFilter;
      const matchesStatus = statusFilter === "all" || task.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
  }));

  // Keep all your existing handlers...
  // Just add these new handlers for filters:
  const handleCategoryFilterChange = (event) => {
      setCategoryFilter(event.target.value);
      setPage(0);
  };

  const handleStatusFilterChange = (event) => {
      setStatusFilter(event.target.value);
      setPage(0);
  };


      
  
    return (
        <Box sx={{ padding: 2 }} >
          <Grid container spacing={3} sx={{ overflowX: 'auto' , mb:3 }}>
            <Grid item xs={12} md={4} lg={3}>
              <TextField
                label="Search"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel>Category Filter</InputLabel>
                        <Select
                            value={categoryFilter}
                            label="Category Filter"
                            onChange={handleCategoryFilterChange}
                        >
                            {uniqueCategories.map(category => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel>Status Filter</InputLabel>
                        <Select
                            value={statusFilter}
                            label="Status Filter"
                            onChange={handleStatusFilterChange}
                        >
                            {uniqueStatuses.map(status => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            
            <Grid item xs={12} sx={{ overflowX: 'auto' }}>
              {loading ? (
                <CircularProgress style={{ margin: "20px auto", display: "block" }} />
              ) : (
                <Box >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <TableSortLabel
                              active={sortColumn === 'name'}
                              direction={sortColumn === 'name' ? sortDirection : 'asc'}
                              onClick={() => { setSortColumn('name'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}
                            >
                              Name
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={sortColumn === 'status'}
                              direction={sortColumn === 'status' ? sortDirection : 'asc'}
                              onClick={() => { setSortColumn('status'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}
                            >
                              Status
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={sortColumn === 'dueDate'}
                              direction={sortColumn === 'dueDate' ? sortDirection : 'asc'}
                              onClick={() => { setSortColumn('dueDate'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}
                            >
                              Due Date
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={sortColumn === 'category'}
                              direction={sortColumn === 'category' ? sortDirection : 'asc'}
                              onClick={() => { setSortColumn('category'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}
                            >
                              Category
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredTasks
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((task) => (
                            <TableRow key={task._id}>
                              <TableCell style={{maxWidth : '100px'}}>
                                <Typography fullWidth style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{task.name}</Typography>
                              </TableCell>
                              <TableCell style={{maxWidth : '100px'}}>
                                <Typography  fullWidth style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{task.description}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography noWrap>{task.status}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography noWrap>{new Date(task.dueDate).toLocaleDateString()}</Typography>
                              </TableCell>
                              <TableCell style={{maxWidth : '100px'}}>
                                <Typography fullWidth style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{task.category || "N/A"}</Typography>
                              </TableCell>
                              <TableCell>
                            <IconButton onClick={() => handleViewTask(task)}>
                                <EyeFilled />
                            </IconButton>
                            <IconButton onClick={() => handleEditTask(task)}>
                                <EditFilled />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteClick(task)}>
                                <DeleteFilled />
                            </IconButton>
                            </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      component="div"
                      count={filteredTasks.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableContainer>
                  <ViewTaskDialog 
                    open={viewDialogOpen} 
                    handleClose={() => setViewDialogOpen(false)} 
                    task={selectedTask} 
                    />
                    <EditTaskDialog 
                    open={editDialogOpen} 
                    handleClose={() => setEditDialogOpen(false)} 
                    task={selectedTask}
                    onSave={handleSaveTask}
                    />
                      <DeleteTaskDialog 
                      open={deleteDialogOpen}
                      handleClose={() => setDeleteDialogOpen(false)}
                      handleConfirmDelete={handleConfirmDelete}
                      task={selectedTask}
                      taskName={selectedTask?.name || ''}
                    />
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      );
    }