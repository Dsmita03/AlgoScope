import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useRef } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type SortChartProps = {
  times: { name: string; time: number }[];
};

const SortChart = ({ times }: SortChartProps) => {
  const chartRef = useRef<any>(null);

  const data = {
    labels: times.map((item) => item.name),
    datasets: [
      {
        label: '⏱ Time Taken (ms)',
        data: times.map((item) => item.time),
        backgroundColor: (context: any) => {
          const colors = [
            'rgba(99,102,241,0.9)', // indigo
            'rgba(139,92,246,0.9)', // violet
            'rgba(34,197,94,0.9)',  // green
            'rgba(14,165,233,0.9)', // sky
            'rgba(249,115,22,0.9)', // orange
            'rgba(239,68,68,0.9)',  // red
          ];
          return colors[context.dataIndex % colors.length];
        },
        borderColor: '#1f2937',
        borderWidth: 2,
        borderRadius: 12,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb',
          font: { size: 13, weight: 'bold' },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#818cf8',
        bodyColor: '#f9fafb',
        cornerRadius: 8,
        padding: 10,
        bodyFont: { weight: 'bold' },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#d1d5db',
          font: { size: 13, weight: '500' },
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#d1d5db',
          font: { size: 13, weight: '500' },
        },
        grid: {
          color: '#374151',
          borderDash: [6, 4],
        },
      },
    },
  };

  const handleDownloadImage = () => {
    if (chartRef.current) {
      const imageLink = chartRef.current.toBase64Image();
      const a = document.createElement('a');
      a.href = imageLink;
      a.download = 'sorting_chart.png';
      a.click();
    }
  };

  const handleDownloadCSV = () => {
    const csvRows = [['Algorithm', 'Time (ms)'], ...times.map(({ name, time }) => [name, time])];
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'sorting_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="w-full px-4 py-6 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
        <div className="p-5 sm:p-8">
          {/* Header + Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-white">
              📊 Sorting Algorithm Performance
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleDownloadImage}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md font-medium transition"
              >
                📷 Export Image
              </button>
              <button
                onClick={handleDownloadCSV}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-md font-medium transition"
              >
                📄 Export CSV
              </button>
            </div>
          </div>

          {/* Chart Container */}
          <div className="relative w-full h-[300px] sm:h-[400px] overflow-x-auto">
            <Bar ref={chartRef} data={data} options={options} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SortChart;
