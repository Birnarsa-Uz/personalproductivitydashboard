import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

interface Goal {
  id: string;
  text: string;
  target: number;
  current: number;
  completed: boolean;
}

interface Stats {
  completedTasks: number;
  totalPomodoroTime: number;
}

interface AppState {
  tasks: Task[];
  goals: Goal[];
  stats: Stats;
  selectedCategory: string | null;
}

const loadStateFromLocalStorage = (): AppState => {
  const savedState = localStorage.getItem('productivityState');
  return savedState ? JSON.parse(savedState) : {
    tasks: [],
    goals: [],
    stats: { completedTasks: 0, totalPomodoroTime: 0 },
    selectedCategory: null,
  };
};

const initialState: AppState = loadStateFromLocalStorage();

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
      localStorage.setItem('productivityState', JSON.stringify(state));
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        if (task.completed) state.stats.completedTasks += 1;
      }
      localStorage.setItem('productivityState', JSON.stringify(state));
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task && task.completed) state.stats.completedTasks -= 1;
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      localStorage.setItem('productivityState', JSON.stringify(state));
    },
    editTask: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.text = action.payload.text;
      localStorage.setItem('productivityState', JSON.stringify(state));
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      localStorage.setItem('productivityState', JSON.stringify(state));
    },
    addGoal: (state, action: PayloadAction<Omit<Goal, 'id' | 'completed' | 'current'>>) => {
      state.goals.push({
        id: crypto.randomUUID(),
        completed: false,
        current: 0,
        ...action.payload,
      });
      localStorage.setItem('productivityState', JSON.stringify(state));
    },
    updateGoalProgress: (state, action: PayloadAction<{ id: string; current: number }>) => {
      const goal = state.goals.find((g) => g.id === action.payload.id);
      if (goal) {
        goal.current = Math.min(action.payload.current, goal.target);
        goal.completed = goal.current >= goal.target;
      }
      localStorage.setItem('productivityState', JSON.stringify(state));
    },
    deleteGoal: (state, action: PayloadAction<string>) => {
      state.goals = state.goals.filter((g) => g.id !== action.payload);
      localStorage.setItem('productivityState', JSON.stringify(state));
    },
    addPomodoroTime: (state, action: PayloadAction<number>) => {
      state.stats.totalPomodoroTime += action.payload;
      localStorage.setItem('productivityState', JSON.stringify(state));
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  editTask,
  setCategory,
  addGoal,
  updateGoalProgress,
  deleteGoal,
  addPomodoroTime,
} = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;