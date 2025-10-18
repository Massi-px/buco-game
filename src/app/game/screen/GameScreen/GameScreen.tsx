import { useEffect, useRef, useState } from "react";
import type { MouseEvent, TouchEvent } from "react";

type GameObject = {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
};

export const GameScreen = ({ holeSize, isPlaying }: any) => {
    const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
    const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });
    const gameRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const generateObjects = () => {
            const newObjects = Array.from({ length: 15 }, (_, _i) => ({
                id: Math.random(),
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 15 + 8,
                color: ['#FF1493', '#00D9FF', '#00FF00', '#FFD700', '#FF6B35'][Math.floor(Math.random() * 5)],
            })) as GameObject[];
            setGameObjects(newObjects);
        };

        generateObjects();
    }, []);

    useEffect(() => {
        if (!isPlaying) return;

        const spawnInterval = window.setInterval(() => {
            setGameObjects((prev) => [
                ...prev,
                {
                    id: Math.random(),
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 15 + 8,
                    color: ['#FF1493', '#00D9FF', '#00FF00', '#FFD700', '#FF6B35'][Math.floor(Math.random() * 5)],
                },
            ]);
        }, 2000);

        return () => window.clearInterval(spawnInterval);
    }, [isPlaying]);

    useEffect(() => {
        if (!isPlaying) return;

        const checkCollisions = () => {
            setGameObjects((prev) =>
                prev.filter((obj) => {
                    const distance = Math.sqrt(
                        Math.pow(obj.x - playerPos.x, 2) + Math.pow(obj.y - playerPos.y, 2)
                    );

                    if (distance < (holeSize / 2 / window.innerWidth) * 100) {
                        return false;
                    }
                    return true;
                })
            );
        };

        const collisionInterval = window.setInterval(checkCollisions, 50);
        return () => window.clearInterval(collisionInterval);
    }, [playerPos, holeSize, isPlaying]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!gameRef.current) return;
        const rect = gameRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100;
        setPlayerPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (e.touches.length > 0 && gameRef.current) {
            const rect = gameRef.current.getBoundingClientRect();
            const x = (e.touches[0].clientX - rect.left) / rect.width * 100;
            const y = (e.touches[0].clientY - rect.top) / rect.height * 100;
            setPlayerPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
        }
    };

    return (
        <div
            ref={gameRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-black overflow-hidden"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.5)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            {/* Score Display */}
            <div className="absolute top-6 left-6 z-50 text-white">
                <div className="text-sm text-slate-400">Score</div>
                <div className="text-4xl font-black text-cyan-400">{gameObjects.length}</div>
            </div>

            {/* Hole Size Display */}
            <div className="absolute top-6 right-6 z-50 text-right">
                <div className="text-sm text-slate-400">Taille</div>
                <div className="text-4xl font-black text-cyan-400">{Math.floor(holeSize)}px</div>
            </div>

            {/* Game Objects */}
            {gameObjects.map((obj) => (
                <div
                    key={obj.id}
                    className="absolute rounded-lg transition-all duration-100 cursor-pointer hover:scale-110"
                    style={{
                        left: `${obj.x}%`,
                        top: `${obj.y}%`,
                        width: `${obj.size}px`,
                        height: `${obj.size}px`,
                        backgroundColor: obj.color,
                        boxShadow: `0 0 20px ${obj.color}80`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ))}

            {/* Player Hole */}
            <div
                className="absolute rounded-full pointer-events-none transition-all duration-100"
                style={{
                    left: `${playerPos.x}%`,
                    top: `${playerPos.y}%`,
                    width: `${holeSize}px`,
                    height: `${holeSize}px`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: `0 0 50px rgba(0, 217, 255, 0.8), inset 0 0 20px rgba(0, 0, 0, 0.9)`,
                    border: '3px solid #00D9FF',
                    background: 'radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,217,255,0.1) 100%)',
                }}
            >
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-pulse"></div>
            </div>
        </div>
    );
};
