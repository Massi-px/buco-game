import { Play, Download } from 'lucide-react';

// ============================================================
// MENU SCREEN COMPONENT
// ============================================================
export const MenuScreen = ({ onPlay, isMobile, canDownload }: any) => {
    return (
        <div className="w-full h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex flex-col items-center justify-center px-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-40 -left-40" />
                <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -bottom-40 -right-40" />
            </div>

            <div className="relative z-10 text-center max-w-md w-full">
                <div className="mb-12">
                    <div className="w-40 h-40 mx-auto relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-75 animate-pulse" />
                        <div className="relative w-full h-full bg-black rounded-full border-4 border-cyan-400 flex items-center justify-center">
                            <div className="text-6xl">●</div>
                        </div>
                    </div>

                    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                        BUCO
                    </h1>
                    <p className="text-cyan-300 text-lg">Avale. Grandir. Dominer.</p>
                </div>

                {/* Game Info */}
                <div className="bg-slate-800/30 backdrop-blur border border-cyan-500/20 rounded-xl p-6 mb-8">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-cyan-400 text-2xl font-bold">∞</p>
                            <p className="text-slate-400 text-sm">Niveaux</p>
                        </div>
                        <div>
                            <p className="text-cyan-400 text-2xl font-bold">🎮</p>
                            <p className="text-slate-400 text-sm">Arcade</p>
                        </div>
                        <div>
                            <p className="text-cyan-400 text-2xl font-bold">⚡</p>
                            <p className="text-slate-400 text-sm">Rapide</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={onPlay}
                        className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xl rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/50"
                    >
                        <Play size={24} />
                        JOUER
                    </button>

                    {canDownload && (
                        <button className="w-full py-3 px-6 border-2 border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                            <Download size={20} />
                            Télécharger l'App
                        </button>
                    )}

                    <p className="text-slate-500 text-sm mt-6">
                        {isMobile ? '📱 Version Mobile' : '🖥️ Version Desktop'}
                    </p>
                </div>
            </div>
        </div>
    );
};
