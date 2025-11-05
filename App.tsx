
import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Overview from './components/tabs/Overview';
import Stories from './components/tabs/Stories';
import Details from './components/tabs/Details';
import Analysis from './components/tabs/Analysis';
import { Tab } from './types';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview />;
            case 'stories':
                return <Stories />;
            case 'details':
                return <Details />;
            case 'analysis':
                return <Analysis />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="container mx-auto max-w-7xl p-4 md:p-8">
            <Header />
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <main>
                {renderTabContent()}
            </main>
        </div>
    );
};

export default App;
