import React, { useEffect, useRef } from 'react';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Mover } from '../../types';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

interface MoversChartProps {
    data: {
        winners: Mover[];
        losers: Mover[];
    };
}

const MoversChart: React.FC<MoversChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current && (data.winners.length > 0 || data.losers.length > 0)) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                const sortedData = [...data.winners, ...data.losers].sort((a,b) => a.percentChange - b.percentChange);

                chartInstanceRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: sortedData.map(d => d.ticker),
                        datasets: [{
                            label: '% Change',
                            data: sortedData.map(d => d.percentChange),
                            backgroundColor: sortedData.map(d => d.percentChange > 0 ? '#10b981' : '#f43f5e'),
                            borderColor: sortedData.map(d => d.percentChange > 0 ? '#059669' : '#e11d48'),
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
                                beginAtZero: true,
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

export default MoversChart;