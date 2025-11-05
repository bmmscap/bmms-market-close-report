import React from 'react';

interface HeaderProps {
    reportDate: string;
    onGenerateReport: () => void;
    isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ reportDate, onGenerateReport, isLoading }) => {
    return (
        <header className="mb-6 p-6 bg-slate-800 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-50">Market Closing Report</h1>
                    <p className="text-lg text-slate-400">{reportDate}</p>
                </div>
                <button
                    onClick={onGenerateReport}
                    disabled={isLoading}
                    className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 disabled:bg-fuchsia-800/50 disabled:cursor-not-allowed flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10.999 9.174A5.002 5.002 0 008.115 14.85a1 1 0 111.885.666A7.002 7.002 0 014.399 12.434 1 1 0 116.284 11.77a5.002 5.002 0 008.715-1.596z" clipRule="evenodd" />
                    </svg>
                    {isLoading ? 'Generating...' : 'Generate New Report'}
                </button>
            </div>
        </header>
    );
};

export default Header;