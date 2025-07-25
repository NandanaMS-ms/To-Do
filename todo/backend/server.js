// server.js
const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = {
  new: [],
  working: [],
  completed: [],
  deleted: [],
};

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add new task
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  const newTask = { id: uuid(), text };
  tasks.new.push(newTask);
  res.status(201).json(newTask);
});

// Update task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { text, status } = req.body;

  let found = false;
  Object.keys(tasks).forEach(zone => {
    tasks[zone] = tasks[zone].filter(task => {
      if (task.id === id) {
        found = true;
        return false; // remove from old zone
      }
      return true;
    });
  });

  if (!found) return res.status(404).json({ error: 'Task not found' });

  const updatedTask = { id, text };
  tasks[status].push(updatedTask);
  res.json(updatedTask);
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  let foundTask = null, originZone = '';

  Object.keys(tasks).forEach(zone => {
    tasks[zone] = tasks[zone].filter(task => {
      if (task.id === id) {
        foundTask = task;
        originZone = zone;
        return false;
      }
      return true;
    });
  });

  if (foundTask) {
    tasks.deleted.push({ ...foundTask, origin: originZone });
    res.json({ message: 'Task deleted', deleted: foundTask });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
