import React from 'react';
import IndexPerformanceChart from '../charts/IndexPerformanceChart';
import MoversChart from '../charts/MoversChart';
import { MarketReport, IndexData, Mover } from '../../types';

interface AnalysisProps {
    analysis: MarketReport['analysis'];
    indices: IndexData[];
    movers: {
        winners: Mover[];
        losers: Mover[];
    };
}

const Analysis: React.FC<AnalysisProps> = ({ analysis, indices, movers }) => {
    return (
        <div className="animate-fadeIn space-y-8">
            <p className="text-base text-slate-400">This section provides qualitative insights into market psychology and visualizes the day's key data points through interactive charts.</p>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                <h2 className="text-2xl font-semibold text-slate-50 mb-4">Trading Psychology Lesson</h2>
                <h3 className="text-xl font-semibold text-slate-200 mb-2">{analysis.tradingPsychology.title}</h3>
                <div className="space-y-3 text-base text-slate-300">
                    <p dangerouslySetInnerHTML={{ __html: analysis.tradingPsychology.lesson.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-100">$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }}></p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-slate-50 mb-6">Data Visualizations</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                        <h3 className="text-xl font-semibold text-slate-50 mb-2">Index Performance Comparison</h3>
                        <p className="text-sm text-slate-400 mb-4">Daily percentage change of the major indices, highlighting the tech-led selloff.</p>
                        <div className="relative w-full h-64 md:h-96 max-w-4xl mx-auto">
                            <IndexPerformanceChart data={indices} />
                        </div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                        <h3 className="text-xl font-semibold text-slate-50 mb-2">Biggest Movers (% Change)</h3>
                        <p className="text-sm text-slate-400 mb-4">Visual comparison of the top 3 winners and top 3 losers of the day.</p>
                        <div className="relative w-full h-64 md:h-96 max-w-4xl mx-auto">
                            <MoversChart data={movers} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analysis;