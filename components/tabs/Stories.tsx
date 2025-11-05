import React from 'react';
import { Story, Sentiment, MarketReport } from '../../types';

interface StoriesProps {
    stories: MarketReport['stories'];
}

const getSentimentClasses = (sentiment: Sentiment) => {
    switch (sentiment) {
        case Sentiment.Positive: return 'bg-emerald-100 text-emerald-800';
        case Sentiment.Negative: return 'bg-rose-100 text-rose-800';
        case Sentiment.Mixed: return 'bg-amber-100 text-amber-800';
        case Sentiment.Neutral: return 'bg-slate-100 text-slate-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

const StoryCard: React.FC<{ story: Story }> = ({ story }) => {
    return (
        <div className="p-4 border border-slate-200 rounded-lg">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-slate-800">{story.id}. {story.title}</h3>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getSentimentClasses(story.sentiment)}`}>
                    {story.sentiment}
                </span>
            </div>
            <p className="text-sm text-slate-600">{story.description}</p>
        </div>
    );
};

const Stories: React.FC<StoriesProps> = ({ stories }) => {
    return (
        <div className="animate-fadeIn">
            <p className="text-base text-slate-600 mb-8">This section details the top narratives that moved the market, including a special focus on the day's standout stock.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">Top 5 Stories of the Day</h2>
                    <div className="space-y-4">
                        {stories.topStories.map(story => <StoryCard key={story.id} story={story} />)}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">Standout Stock: {stories.standoutStock.ticker}</h2>
                    <div className="flex items-center mb-4">
                        <span className="text-3xl font-bold text-slate-900">{stories.standoutStock.ticker}</span>
                        <span className={`ml-4 text-3xl font-bold ${stories.standoutStock.percentChange > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{stories.standoutStock.percentChange.toFixed(2)}%</span>
                    </div>
                    <p className="text-base text-slate-700" dangerouslySetInnerHTML={{ __html: stories.standoutStock.reason.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Stories;