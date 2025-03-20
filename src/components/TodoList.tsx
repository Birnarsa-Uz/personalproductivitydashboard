import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, toggleTask, deleteTask, updateTask } from '../redux/store';

const TodoList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory);
  const dispatch = useDispatch();

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;
  const [isEditing, setEditing] = React.useState<boolean>(false);
  const tasksLength = tasks.length;
  return (
    <ul>
      {
        filteredTasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleTask(task.id))}
          />
          <span onDoubleClick={() => setEditing(true)}>{isEditing ? <input type='text' onChange={(e) => dispatch(updateTask({id: task.id, text: e.target.value}))} onBlur={() => setEditing(false)} value={task.text}/> : task.text} ({task.category})</span>
          <button onClick={() => dispatch(deleteTask(task.id))}>O‘chirish</button>
        </li>
        ))}
      <li>{tasksLength != 0 ? `Jami: ${tasksLength} ta vazifa` : null }</li>
    </ul>
  );
};

export default TodoList;