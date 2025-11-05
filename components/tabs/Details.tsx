
import React from 'react';
import { Mover, RatingChange, Asset } from '../../types';

const winnersData: Mover[] = [
    { ticker: 'SLDP', percentChange: 52.00, description: 'Continuation of recent battery tech momentum; high volume activity.' },
    { ticker: 'LMND', percentChange: 33.52, description: 'Likely short-squeeze activity following analyst notes and technical rebound.' },
    { ticker: 'RIVN', percentChange: 25.39, description: 'High-volume bounce, potentially tied to upcoming EV production news or short covering.' },
];

const losersData: Mover[] = [
    { ticker: 'TREX', percentChange: -30.51, description: 'Significant post-earnings slump on weak housing demand or guidance cut.' },
    { ticker: 'SLNO', percentChange: -29.60, description: 'Large volume sell-off, likely adverse drug trial news or regulatory setback.' },
    { ticker: 'PINS', percentChange: -22.41, description: 'Missed earnings per share consensus and provided disappointing forward guidance.' },
];

const upgradesData: RatingChange[] = [
    { company: 'Apple', ticker: 'AAPL', bank: 'DZ Bank', oldRating: 'Hold', newRating: 'Buy', priceTarget: '$300', isUpgrade: true },
    { company: 'Waste Management', ticker: 'WM', bank: 'Robert W. Baird', oldRating: 'Neutral', newRating: 'Outperform', priceTarget: '$242', isUpgrade: true },
    { company: 'Inspire Med Sys', ticker: 'INSP', bank: 'Wells Fargo', oldRating: 'Equal Weight', newRating: 'Overweight', priceTarget: '$90', isUpgrade: true },
];

const downgradesData: RatingChange[] = [
    { company: 'AbbVie', ticker: 'ABBV', bank: 'DZ Bank', oldRating: 'Buy', newRating: 'Hold', priceTarget: '$237', isUpgrade: false },
    { company: 'DraftKings', ticker: 'DKNG', bank: 'BofA Securities', oldRating: 'Buy', newRating: 'Neutral', priceTarget: '$35', isUpgrade: false },
    { company: 'Kimberly-Clark', ticker: 'KMB', bank: 'Evercore ISI', oldRating: 'Outperform', newRating: 'In-line', priceTarget: '$120', isUpgrade: false },
];

const assetsData: Asset[] = [
    { name: '10-Year Treasury Yield', value: '4.16%', change: '+7 bps', isPositive: false, description: 'Rose significantly, hitting a four-week high.' },
    { name: 'US Dollar Index (DXY)', value: '100.23', change: '+0.04%', isPositive: true, description: 'Stable. The greenback held firm as rising yields countered jitters.' },
    { name: 'WTI Crude Oil Futures', value: '$60.40', change: '-0.53%', isPositive: false, description: 'Pulled back slightly, suggesting supply fears are temporarily muted.' },
    { name: 'Gold Futures', value: '$4,000/oz', change: '+0.8%', isPositive: true, description: 'Rallied back above a critical psychological level.' },
];


const MoverCard: React.FC<{ mover: Mover, isWinner: boolean }> = ({ mover, isWinner }) => (
    <div className={`border rounded-lg p-4 shadow-sm ${isWinner ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <div className="flex justify-between items-baseline">
            <span className="text-lg font-bold text-gray-900">{mover.ticker}</span>
            <span className={`text-xl font-bold ${isWinner ? 'text-green-600' : 'text-red-600'}`}>
                {mover.percentChange > 0 ? '+' : ''}{mover.percentChange.toFixed(2)}%
            </span>
        </div>
        <p className="text-sm text-gray-600">{mover.description}</p>
    </div>
);

const RatingCard: React.FC<{ rating: RatingChange }> = ({ rating }) => (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        <p className="text-lg font-bold">{rating.company} ({rating.ticker})</p>
        <p className="text-sm text-gray-500">{rating.bank} | {rating.oldRating} &rarr; 
            <span className={`font-bold ${rating.isUpgrade ? 'text-green-600' : 'text-red-600'}`}> {rating.newRating}</span>
        </p>
        <p className="text-lg font-semibold text-gray-700 mt-1">PT: {rating.priceTarget}</p>
    </div>
);

const AssetCard: React.FC<{ asset: Asset }> = ({ asset }) => (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <p className="text-base font-semibold text-gray-700 mb-2">{asset.name}</p>
        <p className="text-3xl font-bold text-gray-900">{asset.value}</p>
        <p className={`text-base font-medium ${asset.isPositive ? 'text-green-600' : 'text-red-600'}`}>{asset.change}</p>
        <p className="text-xs text-gray-500 mt-2">{asset.description}</p>
    </div>
);


const Details: React.FC = () => {
    return (
        <div className="animate-fadeIn space-y-8">
            <p className="text-base text-gray-600">This section provides granular data on the day's biggest stock movers, analyst rating changes, and key asset performance across commodities and forex.</p>
            
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Biggest Movers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Winners</h3>
                        <div className="space-y-3">
                            {winnersData.map(mover => <MoverCard key={mover.ticker} mover={mover} isWinner={true} />)}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Losers</h3>
                        <div className="space-y-3">
                            {losersData.map(mover => <MoverCard key={mover.ticker} mover={mover} isWinner={false} />)}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analyst Upgrades & Downgrades</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Upgrades</h3>
                        <div className="space-y-3">
                            {upgradesData.map(rating => <RatingCard key={rating.ticker} rating={rating} />)}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Downgrades</h3>
                        <div className="space-y-3">
                            {downgradesData.map(rating => <RatingCard key={rating.ticker} rating={rating} />)}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Treasuries, Currencies & Commodities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {assetsData.map(asset => <AssetCard key={asset.name} asset={asset} />)}
                </div>
            </div>
        </div>
    );
};

export default Details;
