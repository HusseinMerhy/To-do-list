import React from 'react';
import TaskCard from '../taskCard/taskCard';
import './styles.css';

const Column = ({ title, tasks, onMove, onRemove, isNewColumn, onAddTask, setTaskDueDate, allowedTransitions }) => {
  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>

      {Array.isArray(tasks) && tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onMove={onMove}
          onRemove={onRemove}
          setTaskDueDate={setTaskDueDate}
          allowedTransitions={allowedTransitions}
        />
      ))}

      {isNewColumn && (
        <button className="add-btn" onClick={onAddTask}>＋ Add Task</button>
      )}
    </div>
  );
};

export default Column;