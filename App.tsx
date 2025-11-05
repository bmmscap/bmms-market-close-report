import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import Header from './components/Header';
import Navigation from './components/Navigation';
import Overview from './components/tabs/Overview';
import Stories from './components/tabs/Stories';
import Details from './components/tabs/Details';
import Analysis from './components/tabs/Analysis';
import { Tab, MarketReport } from './types';

// The schema definition for the Gemini API call
const reportSchema = {
  type: Type.OBJECT,
  properties: {
    reportDate: { type: Type.STRING, description: "Today's date, e.g., 'November 5, 2025'" },
    indices: {
      type: Type.ARRAY,
      description: "Data for 4 major stock indices.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          value: { type: Type.STRING },
          change: { type: Type.STRING },
          percentChange: { type: Type.STRING },
          isPositive: { type: Type.BOOLEAN },
        },
        required: ["name", "value", "change", "percentChange", "isPositive"]
      }
    },
    overview: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING, description: "A paragraph summarizing the day's market action." },
        marketBalance: { type: Type.STRING, description: "A paragraph on what the market is balancing." },
        sentiment: { type: Type.STRING, description: "A short, capitalized sentiment string, e.g., 'CAUTIOUS / RISK-OFF'." },
        analystNote: { type: Type.STRING, description: "A short, insightful note from an analyst." },
        conclusion: { type: Type.STRING, description: "A paragraph concluding the day's events." },
        lookAhead: { type: Type.STRING, description: "A paragraph looking ahead to the next trading session. Use **bold** for emphasis." },
      },
      required: ["summary", "marketBalance", "sentiment", "analystNote", "conclusion", "lookAhead"]
    },
    stories: {
      type: Type.OBJECT,
      properties: {
        topStories: {
          type: Type.ARRAY,
          description: "Top 5 market-moving stories.",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              title: { type: Type.STRING },
              sentiment: { type: Type.STRING, enum: ['Positive', 'Negative', 'Mixed', 'Neutral/Caution'] },
              description: { type: Type.STRING },
            },
            required: ["id", "title", "sentiment", "description"]
          }
        },
        standoutStock: {
          type: Type.OBJECT,
          properties: {
            ticker: { type: Type.STRING },
            percentChange: { type: Type.NUMBER },
            reason: { type: Type.STRING, description: "Reason for the stock's movement. Use **bold** for emphasis." },
          },
          required: ["ticker", "percentChange", "reason"]
        },
      },
      required: ["topStories", "standoutStock"]
    },
    details: {
      type: Type.OBJECT,
      properties: {
        winners: {
          type: Type.ARRAY,
          description: "Top 3 winning stocks.",
          items: {
            type: Type.OBJECT,
            properties: {
              ticker: { type: Type.STRING },
              percentChange: { type: Type.NUMBER },
              description: { type: Type.STRING },
            },
            required: ["ticker", "percentChange", "description"]
          }
        },
        losers: {
          type: Type.ARRAY,
          description: "Top 3 losing stocks.",
          items: {
            type: Type.OBJECT,
            properties: {
              ticker: { type: Type.STRING },
              percentChange: { type: Type.NUMBER },
              description: { type: Type.STRING },
            },
            required: ["ticker", "percentChange", "description"]
          }
        },
        upgrades: {
          type: Type.ARRAY,
          description: "Top 3 analyst upgrades.",
          items: {
            type: Type.OBJECT,
            properties: {
              company: { type: Type.STRING },
              ticker: { type: Type.STRING },
              bank: { type: Type.STRING },
              oldRating: { type: Type.STRING },
              newRating: { type: Type.STRING },
              priceTarget: { type: Type.STRING },
              isUpgrade: { type: Type.BOOLEAN, description: "Should always be true" },
            },
             required: ["company", "ticker", "bank", "oldRating", "newRating", "priceTarget", "isUpgrade"]
          }
        },
        downgrades: {
          type: Type.ARRAY,
          description: "Top 3 analyst downgrades.",
          items: {
            type: Type.OBJECT,
            properties: {
              company: { type: Type.STRING },
              ticker: { type: Type.STRING },
              bank: { type: Type.STRING },
              oldRating: { type: Type.STRING },
              newRating: { type: Type.STRING },
              priceTarget: { type: Type.STRING },
              isUpgrade: { type: Type.BOOLEAN, description: "Should always be false" },
            },
            required: ["company", "ticker", "bank", "oldRating", "newRating", "priceTarget", "isUpgrade"]
          }
        },
        assets: {
          type: Type.ARRAY,
          description: "Performance of 4 key assets (e.g., treasuries, currencies, commodities).",
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              value: { type: Type.STRING },
              change: { type: Type.STRING },
              isPositive: { type: Type.BOOLEAN },
              description: { type: Type.STRING },
            },
            required: ["name", "value", "change", "isPositive", "description"]
          }
        },
      },
      required: ["winners", "losers", "upgrades", "downgrades", "assets"]
    },
    analysis: {
      type: Type.OBJECT,
      properties: {
        tradingPsychology: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            lesson: { type: Type.STRING, description: "A lesson on trading psychology based on the day's events. Use **bold** and *italics* for emphasis." },
          },
          required: ["title", "lesson"]
        },
      },
      required: ["tradingPsychology"]
    },
  },
  required: ["reportDate", "indices", "overview", "stories", "details", "analysis"]
};

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [reportData, setReportData] = useState<MarketReport | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const generateReport = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: "Generate a detailed, realistic, and insightful market closing report for today. The report should be comprehensive, covering all aspects of the market's performance. Follow the provided JSON schema precisely.",
                config: {
                    responseMimeType: "application/json",
                    responseSchema: reportSchema,
                },
            });
            const report = JSON.parse(response.text) as MarketReport;
            setReportData(report);
        } catch (err) {
            console.error(err);
            setError("Failed to generate the market report. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        generateReport();
    }, [generateReport]);

    const renderTabContent = () => {
        if (!reportData) return null;

        switch (activeTab) {
            case 'overview':
                return <Overview indices={reportData.indices} overview={reportData.overview} />;
            case 'stories':
                return <Stories stories={reportData.stories} />;
            case 'details':
                return <Details details={reportData.details} />;
            case 'analysis':
                return <Analysis analysis={reportData.analysis} indices={reportData.indices} movers={{ winners: reportData.details.winners, losers: reportData.details.losers }} />;
            default:
                return <Overview indices={reportData.indices} overview={reportData.overview} />;
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-96">
                    <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-lg text-slate-600">Generating your market report...</span>
                </div>
            );
        }
        if (error) {
            return (
                <div className="bg-rose-100 border border-rose-400 text-rose-700 px-4 py-3 rounded-lg relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            );
        }
        return renderTabContent();
    };

    return (
        <div className="container mx-auto max-w-7xl p-4 md:p-8">
            <Header
                reportDate={reportData?.reportDate ?? 'Loading...'}
                onGenerateReport={generateReport}
                isLoading={isLoading}
            />
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <main>
                {renderContent()}
            </main>
        </div>
    );
};

export default App;