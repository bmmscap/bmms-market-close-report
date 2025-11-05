import React from 'react';
import { Mover, RatingChange, Asset, MarketReport } from '../../types';

interface DetailsProps {
    details: MarketReport['details'];
}

const MoverCard: React.FC<{ mover: Mover, isWinner: boolean }> = ({ mover, isWinner }) => (
    <div className={`border rounded-xl p-4 shadow-lg bg-slate-800 ${isWinner ? 'border-emerald-500/30' : 'border-rose-500/30'}`}>
        <div className="flex justify-between items-baseline">
            <span className="text-lg font-bold text-slate-50">{mover.ticker}</span>
            <span className={`text-xl font-bold ${isWinner ? 'text-emerald-500' : 'text-rose-500'}`}>
                {mover.percentChange > 0 ? '+' : ''}{mover.percentChange.toFixed(2)}%
            </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">{mover.description}</p>
    </div>
);

const RatingCard: React.FC<{ rating: RatingChange }> = ({ rating }) => (
    <div className="border border-slate-700 rounded-xl p-4 bg-slate-800 shadow-lg">
        <p className="text-lg font-bold text-slate-50">{rating.company} ({rating.ticker})</p>
        <p className="text-sm text-slate-400">{rating.bank} | {rating.oldRating} &rarr; 
            <span className={`font-bold ${rating.isUpgrade ? 'text-emerald-500' : 'text-rose-500'}`}> {rating.newRating}</span>
        </p>
        <p className="text-lg font-semibold text-slate-300 mt-1">PT: {rating.priceTarget}</p>
    </div>
);

const AssetCard: React.FC<{ asset: Asset }> = ({ asset }) => (
    <div className="border border-slate-700 rounded-xl p-6 bg-slate-800 shadow-lg">
        <p className="text-base font-semibold text-slate-300 mb-2">{asset.name}</p>
        <p className="text-3xl font-bold text-slate-50">{asset.value}</p>
        <p className={`text-base font-medium ${asset.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>{asset.change}</p>
        <p className="text-xs text-slate-500 mt-2">{asset.description}</p>
    </div>
);


const Details: React.FC<DetailsProps> = ({ details }) => {
    return (
        <div className="animate-fadeIn space-y-8">
            <p className="text-base text-slate-400">This section provides granular data on the day's biggest stock movers, analyst rating changes, and key asset performance across commodities and forex.</p>
            
            <div>
                <h2 className="text-2xl font-semibold text-slate-50 mb-4">Biggest Movers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold text-emerald-500 mb-3">Winners</h3>
                        <div className="space-y-3">
                            {details.winners.map(mover => <MoverCard key={mover.ticker} mover={mover} isWinner={true} />)}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-rose-500 mb-3">Losers</h3>
                        <div className="space-y-3">
                            {details.losers.map(mover => <MoverCard key={mover.ticker} mover={mover} isWinner={false} />)}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-slate-50 mb-4">Analyst Upgrades & Downgrades</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold text-fuchsia-400 mb-3">Upgrades</h3>
                        <div className="space-y-3">
                            {details.upgrades.map(rating => <RatingCard key={rating.ticker} rating={rating} />)}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-amber-500 mb-3">Downgrades</h3>
                        <div className="space-y-3">
                            {details.downgrades.map(rating => <RatingCard key={rating.ticker} rating={rating} />)}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-slate-50 mb-4">Treasuries, Currencies & Commodities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {details.assets.map(asset => <AssetCard key={asset.name} asset={asset} />)}
                </div>
            </div>
        </div>
    );
};

export default Details;