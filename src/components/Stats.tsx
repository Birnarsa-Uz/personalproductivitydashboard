import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Chart.js komponentlarini ro‘yxatdan o‘tkazish
ChartJS.register(ArcElement, Tooltip, Legend);

const Stats: React.FC = () => {
  const { tasks, goals, stats } = useSelector((state: RootState) => state);

  const completedTasks = stats.completedTasks;
  const totalTasks = tasks.length;
  const totalPomodoroTime = stats.totalPomodoroTime;
  const goalsProgress = goals.length
    ? goals.reduce((sum, goal) => sum + (goal.current / goal.target), 0) / goals.length
    : 0;

  const pieData = {
    labels: ['Bajarilgan Vazifalar', 'Bajarilmagan Vazifalar'],
    datasets: [
      {
        data: [completedTasks, totalTasks - completedTasks],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  return (
    <div className="stats">
      <h2>Statistika</h2>
      <div className="stats-details">
        <p>Bajarilgan vazifalar: {completedTasks}/{totalTasks}</p>
        <p>Pomodoro vaqti: {totalPomodoroTime} daqiqa</p>
        <p>Maqsadlar o‘rtacha progressi: {(goalsProgress * 100).toFixed(1)}%</p>
      </div>
      <div className="stats-chart">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Stats;