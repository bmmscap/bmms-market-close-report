
import React from 'react';
import { Story, Sentiment } from '../../types';

const storiesData: Story[] = [
    { id: 1, title: 'Tech Sector Plunge & Valuation Concerns', sentiment: Sentiment.Negative, description: "Warnings from high-profile CEOs about market exuberance led to widespread profit-taking in the tech and AI-related momentum stocks, driving the Nasdaq's steep decline." },
    { id: 2, title: 'Strong Economic Data Beats (ADP & ISM)', sentiment: Sentiment.Mixed, description: 'The ADP private jobs report (+42k) and ISM Services PMI (52.4) both beat estimates, reigniting fears of persistent inflation and keeping long-term yields elevated.' },
    { id: 3, title: 'Government Shutdown Ties Record Length', sentiment: Sentiment.Negative, description: 'The protracted US government shutdown has tied the record for the longest ever, severely limiting the release of official economic data and heightening general market anxiety.' },
    { id: 4, title: 'Consumer Sentiment Disparity', sentiment: Sentiment.Neutral, description: 'A new Fall 2025 Consumer Sentiment Report highlights a growing financial gap, with higher-income households feeling optimistic while all consumers actively pursue budget-stretching strategies.' },
    { id: 5, title: 'Gold Breaks Above Key Level', sentiment: Sentiment.Positive, description: 'Gold futures rallied, surpassing the $4,000/ounce mark, suggesting a flight to safety trade is accelerating amid equity volatility and geopolitical risks.' },
];

const getSentimentClasses = (sentiment: Sentiment) => {
    switch (sentiment) {
        case Sentiment.Positive: return 'bg-green-100 text-green-800';
        case Sentiment.Negative: return 'bg-red-100 text-red-800';
        case Sentiment.Mixed: return 'bg-yellow-100 text-yellow-800';
        case Sentiment.Neutral: return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const StoryCard: React.FC<{ story: Story }> = ({ story }) => {
    return (
        <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-800">{story.id}. {story.title}</h3>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getSentimentClasses(story.sentiment)}`}>
                    {story.sentiment}
                </span>
            </div>
            <p className="text-sm text-gray-600">{story.description}</p>
        </div>
    );
};

const Stories: React.FC = () => {
    return (
        <div className="animate-fadeIn">
            <p className="text-base text-gray-600 mb-8">This section details the top narratives that moved the market, including a special focus on the day's standout stock.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Top 5 Stories of the Day</h2>
                    <div className="space-y-4">
                        {storiesData.map(story => <StoryCard key={story.id} story={story} />)}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Standout Stock: Pinterest (PINS)</h2>
                    <div className="flex items-center mb-4">
                        <span className="text-3xl font-bold text-gray-900">PINS</span>
                        <span className="ml-4 text-3xl font-bold text-red-600">-22.41%</span>
                    </div>
                    <p className="text-base text-gray-700">
                        **Pinterest (PINS)** took center stage today, tumbling over 22% after releasing mixed quarterly results. While the company succeeded in beating analyst estimates for Global Monthly Active Users (MAUs), this positive point was completely overshadowed by an **earnings per share miss** and, crucially, **weaker-than-expected guidance** for the current quarter. In a market already sensitive to valuation and growth projections, the disappointment in future outlook signaled by PINS served as a clear proxy for the broader caution gripping the high-growth tech and social media space.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Stories;
