
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
        <nav className="flex border-b border-slate-300 mb-8">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`transition-all duration-300 ease-in-out text-slate-500 py-3 px-4 md:px-6 border-b-2 ${
                        activeTab === tab.id
                            ? 'border-sky-600 text-sky-600 font-semibold'
                            : 'border-transparent hover:border-slate-400'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
};

export default Navigation;