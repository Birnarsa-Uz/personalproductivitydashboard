import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, addGoal, updateGoalProgress, deleteGoal } from '../redux/store';

const GoalTracker: React.FC = () => {
  const goals = useSelector((state: RootState) => state.goals);
  const dispatch = useDispatch();

  const [text, setText] = useState<string>('');
  const [target, setTarget] = useState<number>(0);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && target > 0) {
      dispatch(addGoal({ text, target }));
      setText('');
      setTarget(0);
    }
  };

  const handleUpdateProgress = (id: string, current: number) => {
    dispatch(updateGoalProgress({ id, current }));
  };

  return (
    <div className="goal-tracker">
      <h2>Maqsadlar</h2>
      <form onSubmit={handleAddGoal} className="goal-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Maqsadni kiriting"
        />
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          placeholder="Maqsad miqdori"
          min="1"
        />
        <button type="submit">Qo‘shish</button>
      </form>
      <ul className="goal-list">
        {goals.map((goal) => (
          <li key={goal.id} className={goal.completed ? 'completed' : ''} style={{ backgroundColor: goal.completed ? 'lightgreen' : 'red' }}>
            <span>{goal.text} ({goal.current}/{goal.target})</span>
            <div className="progress-bar">
              <div
                style={{ width: `${(goal.current / goal.target) * 100}%`}}
              ></div>
            </div>
            <input
              type="number"
              min="0"
              max={goal.target}
              value={goal.current}
              onChange={(e) => handleUpdateProgress(goal.id, Number(e.target.value))}
            />
            <span className="progress">Progress {goal.current / goal.target * 100 }%</span>
            <button onClick={() => dispatch(deleteGoal(goal.id))}>O‘chirish</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalTracker;