
import React, { useEffect, useRef } from 'react';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

const IndexPerformanceChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                // Destroy previous chart instance if it exists
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                chartInstanceRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Nasdaq', 'Russell 2000', 'S&P 500', 'Dow Jones'],
                        datasets: [{
                            label: '% Change',
                            data: [-2.04, -1.80, -1.17, -0.53],
                            backgroundColor: ['#ef4444', '#f87171', '#fb923c', '#fca5a5'],
                            borderColor: ['#dc2626', '#e11d48', '#f97316', '#ef4444'],
                            borderWidth: 1,
                            barPercentage: 0.7,
                            categoryPercentage: 0.8
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y',
                        scales: {
                            x: {
                                beginAtZero: false,
                                grid: { color: '#e5e7eb' },
                                ticks: { 
                                    color: '#4b5563',
                                    callback: (value) => `${value}%`
                                }
                            },
                            y: {
                                grid: { display: false },
                                ticks: { 
                                    color: '#1f2937',
                                    font: { weight: '600' }
                                }
                            }
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: '#1f2937',
                                titleColor: '#ffffff',
                                bodyColor: '#ffffff',
                                callbacks: {
                                    label: (context) => `${context.dataset.label || ''}: ${context.parsed.x.toFixed(2)}%`
                                }
                            }
                        }
                    }
                });
            }
        }

        // Cleanup function to destroy chart instance on component unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, []);

    return <canvas ref={chartRef}></canvas>;
};

export default IndexPerformanceChart;
