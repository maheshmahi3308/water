import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

interface WaterFlowChartProps {
  type?: 'line' | 'bar';
  timeframe?: 'daily' | 'weekly' | 'monthly';
}

export default function WaterFlowChart({ type = 'line', timeframe = 'daily' }: WaterFlowChartProps) {
  const dailyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Water Collected (L)',
        data: [120, 45, 200, 0, 180, 320, 95],
        borderColor: 'hsl(var(--success))',
        backgroundColor: 'hsl(var(--success) / 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Water Used (L)',
        data: [85, 92, 78, 105, 88, 110, 75],
        borderColor: 'hsl(var(--warning))',
        backgroundColor: 'hsl(var(--warning) / 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const weeklyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Water Collected (L)',
        data: [960, 745, 890, 1240],
        borderColor: 'hsl(var(--success))',
        backgroundColor: 'hsl(var(--success) / 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Water Used (L)',
        data: [638, 702, 589, 756],
        borderColor: 'hsl(var(--warning))',
        backgroundColor: 'hsl(var(--warning) / 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const getData = () => {
    switch (timeframe) {
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Water Collected (L)',
              data: [3200, 2890, 3450, 4200, 3800, 4100],
              borderColor: 'hsl(var(--success))',
              backgroundColor: 'hsl(var(--success) / 0.1)',
              tension: 0.4,
              fill: true,
            },
            {
              label: 'Water Used (L)',
              data: [2500, 2200, 2800, 3100, 2900, 3200],
              borderColor: 'hsl(var(--warning))',
              backgroundColor: 'hsl(var(--warning) / 0.1)',
              tension: 0.4,
              fill: true,
            }
          ],
        };
      default:
        return dailyData;
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: `Water Flow - ${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} View`,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        backgroundColor: 'hsl(var(--popover))',
        titleColor: 'hsl(var(--popover-foreground))',
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'hsl(var(--border))',
        },
        ticks: {
          callback: function(value: any) {
            return value + 'L';
          },
        },
      },
      x: {
        grid: {
          color: 'hsl(var(--border))',
        },
      },
    },
  };

  const ChartComponent = type === 'bar' ? Bar : Line;

  return (
    <div className="h-[300px] w-full">
      <ChartComponent data={getData()} options={options} />
    </div>
  );
}