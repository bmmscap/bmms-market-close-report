
import React from 'react';
import IndexPerformanceChart from '../charts/IndexPerformanceChart';
import MoversChart from '../charts/MoversChart';

const Analysis: React.FC = () => {
    return (
        <div className="animate-fadeIn space-y-8">
            <p className="text-base text-gray-600">This section provides qualitative insights into market psychology and visualizes the day's key data points through interactive charts.</p>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Trading Psychology Lesson</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">The Power of the Narratives (The FOMO/FUD Cycle)</h3>
                <div className="space-y-3 text-base text-gray-700">
                    <p>Today was a classic example of the market *choosing* which narrative to follow. The day started with highly optimistic **economic data (ADP/ISM)**, which suggested accelerating growth—a fundamentally positive driver. However, the market ultimately responded to the narrative of **Fear, Uncertainty, and Doubt (FUD)**, amplified by the cautious words from bank CEOs and the continued weakness in the high-multiple tech sector.</p>
                    <p className="font-semibold italic">*The Lesson:* Price action often follows the dominant narrative, even if counter-narratives exist. The key is to recognize when the market *switches* its focus. When big-name leaders voice caution after a massive run, the psychology shifts from **Fear of Missing Out (FOMO)** to **Fear of Overvaluation (FOO)**, leading to indiscriminate selling across the most extended names.</p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Visualizations</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Index Performance Comparison</h3>
                        <p className="text-sm text-gray-600 mb-4">Daily percentage change of the major indices, highlighting the tech-led selloff.</p>
                        <div className="relative w-full h-64 md:h-96 max-w-4xl mx-auto">
                            <IndexPerformanceChart />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Biggest Movers (% Change)</h3>
                        <p className="text-sm text-gray-600 mb-4">Visual comparison of the top 3 winners and top 3 losers of the day.</p>
                        <div className="relative w-full h-64 md:h-96 max-w-4xl mx-auto">
                            <MoversChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analysis;
