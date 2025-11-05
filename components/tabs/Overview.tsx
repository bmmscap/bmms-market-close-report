
import React from 'react';
import { IndexData } from '../../types';

const indexData: IndexData[] = [
    { name: 'Dow Jones', value: '47,085.24', change: '-251.44', percentChange: '-0.53%', isPositive: false },
    { name: 'S&P 500', value: '6,771.55', change: '-80.42', percentChange: '-1.17%', isPositive: false },
    { name: 'Nasdaq', value: '23,348.64', change: '-486.09', percentChange: '-2.04%', isPositive: false },
    { name: 'Russell 2000', value: '2,427.34', change: '-43.90', percentChange: '-1.80%', isPositive: false },
];

const IndexCard: React.FC<{ data: IndexData }> = ({ data }) => {
    const cardBg = data.isPositive ? 'bg-green-50' : 'bg-red-50';
    const textColor = data.isPositive ? 'text-green-600' : 'text-red-600';

    return (
        <div className={`border border-gray-200 rounded-lg p-6 shadow-sm ${cardBg}`}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-base font-semibold text-gray-700">{data.name}</span>
                <span className={`font-bold text-lg ${textColor}`}>{data.percentChange}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.value}</p>
            <p className={`text-base font-medium ${textColor}`}>{data.change}</p>
        </div>
    );
};

const Overview: React.FC = () => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <p className="text-base text-gray-600">This section provides a high-level summary of the day's market performance, sentiment, and forward-looking conclusion, including any high-priority analyst notes.</p>
            
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Wall Street Trading Update</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {indexData.map(index => <IndexCard key={index.name} data={index} />)}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Market Overview & Sentiment</h2>
                    <p className="text-lg text-gray-700 mb-4">Today proved to be a significant pullback day, with major indices closing sharply lower after Wall Street leaders openly expressed caution regarding "stretched valuations," particularly in the high-flying technology sector. The initial lift from stronger-than-expected economic data (ADP jobs and ISM Services PMI beats) faded throughout the afternoon as profit-taking gained momentum.</p>
                    <p className="text-base text-gray-700">The market is balancing undeniable economic resilience against mounting valuation fears and geopolitical uncertainty stemming from the prolonged government shutdown. Technology was the clear victim, while defensives (Consumer Staples) and Financials showed comparative strength.</p>
                    <div className="mt-4">
                        <span className="text-sm font-medium text-gray-500 mr-2">Overall Sentiment:</span>
                        <span className="font-bold text-xl text-red-600">CAUTIOUS / RISK-OFF</span>
                    </div>
                </div>
                <div className="lg:col-span-1 bg-blue-50 border border-blue-200 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">Analyst Note</h3>
                    <p className="text-base text-blue-700">An alert from the desk today flagged that the massive sell-off in AI names (NVDA, SMCI) was likely **technical** and not indicative of a long-term shift, suggesting a short-term rebound is highly probable given the strong underlying ISM data. Monitor these names for a potential aggressive reversal in the coming sessions.</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conclusion & Look Ahead</h2>
                <p className="text-base text-gray-700 mb-4">The close today confirms a distinct risk-off rotation led by a tech rout. While economic fundamentals look resilient based on the recent private data, the focus has abruptly shifted to market structure and valuation. The government shutdown continues to cloud the outlook, making private data releases (like ADP and ISM) disproportionately important.</p>
                <p className="text-base text-gray-700">**Looking Ahead:** The market will be closely watching for any signs of movement on the government shutdown front. Key earnings reports continue to trickle in after the bell, and any weakness in forward guidance—as seen with PINS—will be met with severe selling. Tomorrow's trading will hinge on whether value investors step in to buy the dip in tech, or if the broader market follows the Nasdaq lower into a deeper consolidation phase.</p>
            </div>
        </div>
    );
};

export default Overview;
