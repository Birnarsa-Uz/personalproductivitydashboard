import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/store';

const TodoInput: React.FC = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Ish');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTask({ text, category }));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Vazifa kiriting"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Ish">Ish</option>
        <option value="Shaxsiy">Shaxsiy</option>
        <option value="Boshqa">Boshqa</option>
      </select>
      <button type="submit">Qo‘shish</button>
    </form>
  );
};

export default TodoInput;