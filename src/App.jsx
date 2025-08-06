import React, { useState, useEffect } from 'react';
import Column from './Components/Column/Column';
import './App.css';

const App = () => {
 const [tasks, setTasks] = useState([
  { id: 1, title: 'Study React', description: 'Complete LYXA task', status: 'New', dueDate: null, isOverdueNotified: false },
  { id: 2, title: 'Work on CSS', description: 'Improve styling for all components', status: 'Ongoing', dueDate: null, isOverdueNotified: false },
  { id: 3, title: 'Submit Task', description: 'Make final submission to LYXA', status: 'Done', dueDate: null, isOverdueNotified: false },
  { id: 4, title: 'Write Unit Tests', description: 'Cover core logic with Jest tests', status: 'New', dueDate: null, isOverdueNotified: false },
  { id: 5, title: 'Fix Navbar Bug', description: 'Resolve dropdown issue in mobile view', status: 'Ongoing', dueDate: null, isOverdueNotified: false },
  { id: 6, title: 'Deploy to Netlify', description: 'Push final build to production', status: 'Done', dueDate: null, isOverdueNotified: false },
  { id: 7, title: 'Design Login Page', description: 'Create responsive layout and form', status: 'New', dueDate: null, isOverdueNotified: false },
  { id: 8, title: 'Optimize Images', description: 'Compress assets for faster load time', status: 'Ongoing', dueDate: null, isOverdueNotified: false },
  { id: 9, title: 'Update README', description: 'Add setup instructions and screenshots', status: 'Done', dueDate: null, isOverdueNotified: false }
]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });

  const allowedTransitions = {
    New: ['Ongoing', 'Done'],
    Ongoing: ['Done'],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      tasks.forEach(task => {
        if (task.status === 'Ongoing' && task.dueDate && new Date(task.dueDate) < now && !task.isOverdueNotified) {
          alert(`Task "${task.title}" is overdue!`);
          setTasks(prevTasks =>
            prevTasks.map(t =>
              t.id === task.id ? { ...t, isOverdueNotified: true } : t
            )
          );
        }
      });
    }, 30000);
    return () => clearInterval(interval);
  }, [tasks]);

  const handleAddTask = () => setShowForm(true);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    const newTask = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      status: 'New',
      dueDate: null,
      isOverdueNotified: false
    };
    setTasks([newTask, ...tasks]);
    setFormData({ title: '', description: '' });
    setShowForm(false);
  };

  const moveTask = (id, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === id && allowedTransitions[task.status]?.includes(newStatus)) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  const removeTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const setTaskDueDate = (taskId, dueDate) => {
    setTasks(tasks.map(t => (t.id === taskId ? { ...t, dueDate, isOverdueNotified: false } : t)));
  };

  const taskByStatus = (status) => tasks.filter(t => t.status === status);

  return (
    <div className="app">
      <h1>React Kanban Todo</h1>
      <div className="board">
        <Column
          title="New"
          tasks={taskByStatus('New')}
          onMove={moveTask}
          onRemove={removeTask}
          allowedTransitions={allowedTransitions}
          isNewColumn
          onAddTask={handleAddTask}
        />
        <Column
          title="Ongoing"
          tasks={taskByStatus('Ongoing')}
          onMove={moveTask}
          onRemove={removeTask}
          allowedTransitions={allowedTransitions}
          setTaskDueDate={setTaskDueDate}
        />
        <Column
          title="Done"
          tasks={taskByStatus('Done')}
          onMove={moveTask}
          onRemove={removeTask}
          allowedTransitions={allowedTransitions}
          readOnly
        />
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Task</h3>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
            <div className="modal-actions">
              <button onClick={handleSubmit}>Add Task</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;