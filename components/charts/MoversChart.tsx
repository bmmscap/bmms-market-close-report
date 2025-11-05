
import React, { useEffect, useRef } from 'react';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

const MoversChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                chartInstanceRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['SLDP', 'LMND', 'RIVN', 'PINS', 'SLNO', 'TREX'],
                        datasets: [{
                            label: '% Change',
                            data: [52.00, 33.52, 25.39, -22.41, -29.60, -30.51],
                            backgroundColor: [
                                '#22c55e', '#4ade80', '#86efac', 
                                '#ef4444', '#dc2626', '#b91c1c'
                            ],
                            borderColor: [
                                '#16a34a', '#16a34a', '#16a34a',
                                '#991b1b', '#991b1b', '#991b1b'
                            ],
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
        
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, []);

    return <canvas ref={chartRef}></canvas>;
};

export default MoversChart;
