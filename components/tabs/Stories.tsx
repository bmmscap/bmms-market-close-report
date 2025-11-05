import React from 'react';
import { Story, Sentiment, MarketReport } from '../../types';

interface StoriesProps {
    stories: MarketReport['stories'];
}

const getSentimentClasses = (sentiment: Sentiment) => {
    switch (sentiment) {
        case Sentiment.Positive: return 'bg-emerald-500/10 text-emerald-400';
        case Sentiment.Negative: return 'bg-rose-500/10 text-rose-400';
        case Sentiment.Mixed: return 'bg-amber-500/10 text-amber-400';
        case Sentiment.Neutral: return 'bg-slate-500/10 text-slate-400';
        default: return 'bg-slate-500/10 text-slate-400';
    }
};

const StoryCard: React.FC<{ story: Story }> = ({ story }) => {
    return (
        <div className="p-4 border border-slate-700 rounded-lg transition-all duration-300 hover:bg-slate-700/50 hover:border-slate-600">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-slate-200">{story.id}. {story.title}</h3>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getSentimentClasses(story.sentiment)}`}>
                    {story.sentiment}
                </span>
            </div>
            <p className="text-sm text-slate-400">{story.description}</p>
        </div>
    );
};

const Stories: React.FC<StoriesProps> = ({ stories }) => {
    return (
        <div className="animate-fadeIn">
            <p className="text-base text-slate-400 mb-8">This section details the top narratives that moved the market, including a special focus on the day's standout stock.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <h2 className="text-2xl font-semibold text-slate-50 mb-4">Top 5 Stories of the Day</h2>
                    <div className="space-y-4">
                        {stories.topStories.map(story => <StoryCard key={story.id} story={story} />)}
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <h2 className="text-2xl font-semibold text-slate-50 mb-4">Standout Stock: {stories.standoutStock.ticker}</h2>
                    <div className="flex items-center mb-4">
                        <span className="text-3xl font-bold text-slate-50">{stories.standoutStock.ticker}</span>
                        <span className={`ml-4 text-3xl font-bold ${stories.standoutStock.percentChange > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{stories.standoutStock.percentChange.toFixed(2)}%</span>
                    </div>
                    <p className="text-base text-slate-300" dangerouslySetInnerHTML={{ __html: stories.standoutStock.reason.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-100">$1</strong>') }}>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Stories;