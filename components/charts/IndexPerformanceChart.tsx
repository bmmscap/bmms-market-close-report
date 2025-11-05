import React, { useEffect, useRef } from 'react';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { IndexData } from '../../types';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

interface IndexPerformanceChartProps {
    data: IndexData[];
}

const IndexPerformanceChart: React.FC<IndexPerformanceChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current && data.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                const sortedData = [...data].sort((a, b) => parseFloat(a.percentChange) - parseFloat(b.percentChange));

                chartInstanceRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: sortedData.map(d => d.name),
                        datasets: [{
                            label: '% Change',
                            data: sortedData.map(d => parseFloat(d.percentChange)),
                            backgroundColor: sortedData.map(d => d.isPositive ? '#10b981' : '#f43f5e'),
                            borderColor: sortedData.map(d => d.isPositive ? '#059669' : '#e11d48'),
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
                                grid: { color: '#e2e8f0' },
                                ticks: { 
                                    color: '#475569',
                                    callback: (value) => `${value}%`
                                }
                            },
                            y: {
                                grid: { display: false },
                                ticks: { 
                                    color: '#0f172a',
                                    // FIX: Changed font weight from string '600' to number 600 to match Chart.js type definitions.
                                    font: { weight: 600 }
                                }
                            }
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: '#0f172a',
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

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [data]);

    return <canvas ref={chartRef}></canvas>;
};

export default IndexPerformanceChart;