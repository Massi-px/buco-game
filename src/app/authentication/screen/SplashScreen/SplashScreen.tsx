import React, { useEffect } from 'react';

// ============================================================
// SPLASH SCREEN COMPONENT
// ============================================================
export const SplashScreen = ({ onFinish } : any) => {
    useEffect(() => {
        const timer = setTimeout(onFinish, 3000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="w-full h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex flex-col items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto relative animate-bounce">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-75" />
                        <div className="relative w-full h-full bg-black rounded-full border-4 border-cyan-400 flex items-center justify-center">
                            <div className="text-5xl">●</div>
                        </div>
                    </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 animate-pulse">
                    HOLE.IO
                </h1>
                <p className="text-xl text-cyan-300 mb-2">Avale tout sur ton passage</p>
                <p className="text-sm text-slate-400">Chargement...</p>

                {/* Loading Bar */}
                <div className="w-64 h-1 bg-slate-800 rounded-full mt-8 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-pulse" style={{ animation: 'slideIn 2s ease-in-out infinite' }} />
                </div>
            </div>

            <style>{`
        @keyframes slideIn {
          0% { width: 0; }
          50% { width: 100%; }
          100% { width: 0; }
        }
      `}</style>
        </div>
    );
};