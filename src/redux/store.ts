import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

interface AppState {
  tasks: Task[];
  selectedCategory: string | null;
}

const initialState: AppState = {
  tasks: [],
  selectedCategory: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'completed'>>) => {
      state.tasks.push({
        id: crypto.randomUUID(),
        completed: false,
        ...action.payload,
      });
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    updateTask: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id)
      if (task) task.text = action.payload.text;
    },
  },
});

export const { addTask, toggleTask, deleteTask, setCategory, updateTask } = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;