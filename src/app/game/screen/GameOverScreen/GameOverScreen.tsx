// ============================================================
// GAME OVER SCREEN COMPONENT
// ============================================================
export const GameOverScreen = ({ score, onRestart, onMenu }: any) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50">
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-cyan-500/30 rounded-2xl p-8 text-center max-w-md">
                <h2 className="text-4xl font-black text-cyan-400 mb-2">GAME OVER</h2>
                <p className="text-slate-400 mb-6">Partie terminée</p>

                <div className="bg-slate-700/50 rounded-xl p-6 mb-8">
                    <p className="text-slate-400 text-sm mb-2">Objets Avalés</p>
                    <p className="text-5xl font-black text-cyan-400">{score}</p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={onRestart}
                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-lg transition-all active:scale-95"
                    >
                        Rejouer
                    </button>
                    <button
                        onClick={onMenu}
                        className="w-full py-3 border-2 border-cyan-500 text-cyan-400 font-bold rounded-lg hover:bg-cyan-500/10 transition-all active:scale-95"
                    >
                        Menu
                    </button>
                </div>
            </div>
        </div>
    );
};