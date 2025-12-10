import { useState } from 'react';
import { clsx } from 'clsx';

const Tabs = ({ tabs, defaultTab = 0 }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="border-b border-neutral-200 overflow-x-auto">
                <div className="flex space-x-8 min-w-max px-1">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={clsx(
                                'pb-4 px-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap relative',
                                activeTab === index
                                    ? 'text-primary-600'
                                    : 'text-neutral-600 hover:text-neutral-900'
                            )}
                        >
                            {tab.label}
                            {activeTab === index && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {tabs[activeTab]?.content}
            </div>
        </div>
    );
};

export default Tabs;
