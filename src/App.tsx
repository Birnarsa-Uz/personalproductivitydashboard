import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, RootState } from './redux/store';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory);

  return (
    <div className="app">
      <h1>Productivity Dashboard</h1>
      <div>
        <button onClick={() => dispatch(setCategory(null))}>Barchasi</button>
        <button onClick={() => dispatch(setCategory('Ish'))}>Ish</button>
        <button onClick={() => dispatch(setCategory('Shaxsiy'))}>Shaxsiy</button>
        <button onClick={() => dispatch(setCategory('Boshqa'))}>Boshqa</button>
      </div>
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default App;