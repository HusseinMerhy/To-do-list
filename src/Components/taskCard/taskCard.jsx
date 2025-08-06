import React, { useState } from 'react';
import './styles.css';

const statusColors = {
  New: 'blue',
  Ongoing: 'orange',
  Done: 'green',
};

const TaskCard = ({ task, onMove, onRemove, allowedTransitions }) => {
  const [contextVisible, setContextVisible] = useState(false);

  const handleRightClick = (e) => {
    e.preventDefault();
    setContextVisible(!contextVisible);
  };

  const handleMove = (status) => {
    onMove(task.id, status);
    setContextVisible(false);
  };

  const handleRemove = () => {
    onRemove(task.id);
    setContextVisible(false);
  };

  const validStatuses = allowedTransitions?.[task.status] || [];

  return (
    <div className="task-card" onContextMenu={handleRightClick}>
      <h4 className="task-title">{task.title}</h4>
      <p className="task-desc">{task.description}</p>
      <span className={`task-label ${statusColors[task.status]}`}>{task.status}</span>

      {contextVisible && (
        <div className="context-menu">
          {validStatuses.map((s) => (
            <div key={s} onClick={() => handleMove(s)}>{`Move to ${s}`}</div>
          ))}
          <div className="remove-option" onClick={handleRemove}>🗑️ Remove Task</div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;