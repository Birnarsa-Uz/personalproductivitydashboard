import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, toggleTask, deleteTask, editTask } from '../redux/store';

const TodoList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  const startEditing = (task: { id: string; text: string }) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      dispatch(editTask({ id, text: editText }));
    }
    setEditingId(null);
    setEditText('');
  };

  return (
    <div>
      <p>{filteredTasks.length > 0 ? `Jami: ${filteredTasks.length} ta vazifa` : 'Vazifalar yo‘q'}</p>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            {editingId === task.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => saveEdit(task.id)}
                onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
                autoFocus
              />
            ) : (
              <span onDoubleClick={() => startEditing(task)}>
                {task.text} ({task.category})
              </span>
            )}
            <button onClick={() => dispatch(deleteTask(task.id))}>O‘chirish</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;