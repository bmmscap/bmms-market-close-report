import React from 'react';
import { IndexData, MarketReport } from '../../types';

interface OverviewProps {
    indices: IndexData[];
    overview: MarketReport['overview'];
}

const IndexCard: React.FC<{ data: IndexData }> = ({ data }) => {
    const borderColor = data.isPositive ? 'border-emerald-500/30' : 'border-rose-500/30';
    const textColor = data.isPositive ? 'text-emerald-500' : 'text-rose-500';

    return (
        <div className={`bg-slate-800 border ${borderColor} rounded-xl p-6 shadow-lg`}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-base font-semibold text-slate-300">{data.name}</span>
                <span className={`font-bold text-lg ${textColor}`}>{data.percentChange}</span>
            </div>
            <p className="text-2xl font-bold text-slate-50">{data.value}</p>
            <p className={`text-base font-medium ${textColor}`}>{data.change}</p>
        </div>
    );
};

const Overview: React.FC<OverviewProps> = ({ indices, overview }) => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <p className="text-base text-slate-400">This section provides a high-level summary of the day's market performance, sentiment, and forward-looking conclusion, including any high-priority analyst notes.</p>
            
            <div>
                <h2 className="text-2xl font-semibold text-slate-50 mb-4">Wall Street Trading Update</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {indices.map(index => <IndexCard key={index.name} data={index} />)}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <h2 className="text-2xl font-semibold text-slate-50 mb-4">Market Overview & Sentiment</h2>
                    <p className="text-lg text-slate-300 mb-4">{overview.summary}</p>
                    <p className="text-base text-slate-300">{overview.marketBalance}</p>
                    <div className="mt-4">
                        <span className="text-sm font-medium text-slate-400 mr-2">Overall Sentiment:</span>
                        <span className="font-bold text-xl text-rose-500">{overview.sentiment}</span>
                    </div>
                </div>
                <div className="lg:col-span-1 bg-slate-800 border border-fuchsia-500/30 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-fuchsia-300 mb-3">Analyst Note</h3>
                    <p className="text-base text-fuchsia-200">{overview.analystNote}</p>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                <h2 className="text-2xl font-semibold text-slate-50 mb-4">Conclusion & Look Ahead</h2>
                <p className="text-base text-slate-300 mb-4">{overview.conclusion}</p>
                <p className="text-base text-slate-300" dangerouslySetInnerHTML={{ __html: overview.lookAhead.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-100">$1</strong>') }}></p>
            </div>
        </div>
    );
};

export default Overview;