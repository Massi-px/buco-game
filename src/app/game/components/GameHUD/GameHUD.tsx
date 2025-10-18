// ============================================================
// HUD COMPONENT
// ============================================================
import {Home, RotateCcw, Volume2, VolumeX} from "lucide-react";

export const GameHUD = ({ isPlaying, isMuted, onToggleMute, onPause, onResume, onMenu }: any) => {
    return (
        <div className="absolute top-0 left-0 right-0 z-40 p-4 flex justify-between items-center">
            <button
                onClick={onMenu}
                className="bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur border border-slate-600 text-white p-2 rounded-lg transition-all active:scale-95"
            >
                <Home size={20} />
            </button>

            <div className="flex gap-2">
                <button
                    onClick={onToggleMute}
                    className="bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur border border-slate-600 text-white p-2 rounded-lg transition-all active:scale-95"
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button
                    onClick={isPlaying ? onPause : onResume}
                    className="bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur border border-slate-600 text-white p-2 rounded-lg transition-all active:scale-95"
                >
                    <RotateCcw size={20} />
                </button>
            </div>
        </div>
    );
};
