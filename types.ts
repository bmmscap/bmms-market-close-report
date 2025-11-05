export type Tab = 'overview' | 'stories' | 'details' | 'analysis';

export interface IndexData {
    name: string;
    value: string;
    change: string;
    percentChange: string;
    isPositive: boolean;
}

export enum Sentiment {
    Positive = 'Positive',
    Negative = 'Negative',
    Mixed = 'Mixed',
    Neutral = 'Neutral/Caution',
}

export interface Story {
    id: number;
    title: string;
    sentiment: Sentiment;
    description: string;
}

export interface Mover {
    ticker: string;
    percentChange: number;
    description: string;
}

export interface RatingChange {
    company: string;
    ticker: string;
    bank: string;
    oldRating: string;
    newRating: string;
    priceTarget: string;
    isUpgrade: boolean;
}

export interface Asset {
    name: string;
    value: string;
    change: string;
    isPositive: boolean;
    description: string;
}

export interface MarketReport {
    reportDate: string;
    indices: IndexData[];
    overview: {
        summary: string;
        marketBalance: string;
        sentiment: string;
        analystNote: string;
        conclusion: string;
        lookAhead: string;
    };
    stories: {
        topStories: Story[];
        standoutStock: {
            ticker: string;
            percentChange: number;
            reason: string;
        };
    };
    details: {
        winners: Mover[];
        losers: Mover[];
        upgrades: RatingChange[];
        downgrades: RatingChange[];
        assets: Asset[];
    };
    analysis: {
        tradingPsychology: {
            title: string;
            lesson: string;
        };
    };
}
