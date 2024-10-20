const Task = require('../models/Task');
const Category = require('../models/Category');

const createTask = async (req, res) => {
    const { name, description, status, dueDate, category } = req.body;
    try {

      const validStatuses = ['pending', 'in-progress', 'completed'];
      const taskStatus = validStatuses.includes(status) ? status : 'pending';
 
      
      if(category)
      {
        const categoryExists = await Category.findOne({ name: category, user: req.user._id });
        if (!categoryExists) {
          return res.status(404).json({ message: 'Category not found for this user' });
        }

      } 
      const task = new Task({ name, description, status:taskStatus , dueDate, category, user: req.user._id });
      await task.save();
      res.status(201).json({ message: 'Task created', task });
    } catch (error) {
      res.status(400).json({ message: 'Error creating task', error });
    }
  };
  
  const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user._id }).populate('category');
      res.json(tasks);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching tasks', error });
    }
  };
  
  const updateTask = async (req, res) => {
    const { _id , category , status} = req.body;
    console.log(req.body , _id , category , status)
    try {
      const validStatuses = ['pending', 'in-progress', 'completed'];
      const taskStatus = validStatuses.includes(status) ? status : 'pending';
      req.body["status"] = taskStatus

      const taskExists = await Task.findById(_id);
      if (!taskExists) {
        return res.status(404).json({ message: 'Task not found' });
      }
      if(category)
        {
          const categoryExists = await Category.findOne({ name: category, user: req.user._id });
          if (!categoryExists) {
            return res.status(404).json({ message: 'Category not found for this user' });
          }
  
        } 
      const task = await Task.findOneAndUpdate({ _id: _id, user: req.user._id }, req.body, { new: true });
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: 'Error updating task', error });
    }
  };
  
  const deleteTask = async (req, res) => {
    const { _id } = req.body;
    try {
      const taskExists = await Task.findById(_id);
      if (!taskExists) {
        return res.status(404).json({ message: 'Task not found' });
      }
      await Task.findOneAndDelete({ _id: _id, user: req.user._id });
      res.json({ message: 'Task deleted' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting task', error });
    }
  };
  
module.exports = { createTask, getTasks, updateTask, deleteTask };


// Other functions like updateTask, deleteTask, etc., go here.
