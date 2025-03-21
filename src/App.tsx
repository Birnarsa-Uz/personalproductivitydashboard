import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, RootState } from './redux/store';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import PomodoroTimer from './components/PomodoroTimer';
import GoalTracker from './components/GoalTracker';
import Stats from './components/Stats';
import './App.css';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('todo');
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory);

  const renderSection = () => {
    switch (activeSection) {
      case 'todo':
        return (
          <>
            <TodoInput />
            <TodoList />
          </>
        );
      case 'timer':
        return <PomodoroTimer />;
      case 'goals':
        return <GoalTracker />;
      case 'stats':
        return <Stats />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <h1>Productivity Dashboard</h1>
      <div className="layout">
        <div className="sidebar">
          <button onClick={() => setActiveSection('todo')}>Vazifalar</button>
          <button onClick={() => setActiveSection('timer')}>Taymer</button>
          <button onClick={() => setActiveSection('goals')}>Maqsadlar</button>
          <button onClick={() => setActiveSection('stats')}>Statistika</button>
          <div className="category-filter">
            <h3>Kategoriyalar</h3>
            <button onClick={() => dispatch(setCategory(null))}>Barchasi</button>
            <button onClick={() => dispatch(setCategory('Ish'))}>Ish</button>
            <button onClick={() => dispatch(setCategory('Shaxsiy'))}>Shaxsiy</button>
            <button onClick={() => dispatch(setCategory('Boshqa'))}>Boshqa</button>
          </div>
        </div>
        <div className="main-content">{renderSection()}</div>
      </div>
    </div>
  );
};

export default App;