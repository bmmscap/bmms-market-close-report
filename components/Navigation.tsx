
import React from 'react';
import { Tab } from '../types';

interface NavigationProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'stories', label: 'Top Stories' },
    { id: 'details', label: 'Market Details' },
    { id: 'analysis', label: 'Analysis & Charts' },
];

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="flex border-b border-slate-700 mb-8">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`transition-all duration-300 ease-in-out text-slate-400 py-3 px-4 md:px-6 border-b-2 ${
                        activeTab === tab.id
                            ? 'border-fuchsia-500 text-fuchsia-500 font-semibold'
                            : 'border-transparent hover:border-slate-500'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
};

export default Navigation;