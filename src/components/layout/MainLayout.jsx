import Sidebar from './Sidebar';
import Header from './Header';
import WhatsAppButton from '../WhatsAppButton';

const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-[#0e1b14] dark:text-gray-100 font-display transition-colors duration-200 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header */}
                <Header />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 scrollbar-hide">
                    {/* Width limiter container */}
                    <div className="max-w-6xl mx-auto flex flex-col gap-8">
                        {children}
                    </div>
                </main>

                {/* Floating WhatsApp Button */}
                <WhatsAppButton />
            </div>
        </div>
    );
};

export default MainLayout;
