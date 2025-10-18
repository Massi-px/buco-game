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
    const [renderObjects, setRenderObjects] = useState<GameObject[]>([]);
    const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });
    const [renderHoleSize, setRenderHoleSize] = useState<number>(holeSize);
    const [score, setScore] = useState<number>(0);

    const gameRef = useRef<HTMLDivElement | null>(null);

    // Mutable refs for high-frequency updates inside the requestAnimationFrame loop
    const objectsRef = useRef<GameObject[]>([]);
    const holeSizeRef = useRef<number>(holeSize);
    const scoreRef = useRef<number>(0);
    const isPlayingRef = useRef<boolean>(!!isPlaying);
    const playerPosRef = useRef<{ x: number; y: number }>({ x: 50, y: 50 });

    // rAF bookkeeping
    const rafIdRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);
    const spawnElapsedRef = useRef<number>(0);

    const createRandomObject = (): GameObject => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 8,
        color: ['#FF1493', '#00D9FF', '#00FF00', '#FFD700', '#FF6B35'][Math.floor(Math.random() * 5)],
    });

    useEffect(() => {
        const initial = Array.from({ length: 15 }, createRandomObject);
        objectsRef.current = initial;
        setRenderObjects(initial);
        scoreRef.current = 0;
        setScore(0);
    }, []);

    // Keep isPlaying in a ref so the loop can read a stable value
    useEffect(() => {
        isPlayingRef.current = !!isPlaying;
    }, [isPlaying]);

    // Main game loop using requestAnimationFrame — avoids setInterval and busy while-loops
    useEffect(() => {
        let disposed = false;

        const growthFactor = 0.35; // how much the hole grows relative to swallowed object size (px)
        const spawnEveryMs = 2000;

        const loop = (t: number) => {
            if (disposed) return;

            const last = lastTimeRef.current ?? t;
            const dt = Math.min(100, t - last); // clamp delta to avoid huge jumps
            lastTimeRef.current = t;

            // Read current mutable data
            const curObjects = objectsRef.current;
            let changed = false;

            if (isPlayingRef.current) {
                // Spawn logic
                spawnElapsedRef.current += dt;
                while (spawnElapsedRef.current >= spawnEveryMs) {
                    spawnElapsedRef.current -= spawnEveryMs;
                    curObjects.push(createRandomObject());
                    changed = true;
                }

                // Collision detection (once per frame)
                const container = gameRef.current;
                if (container) {
                    const rect = container.getBoundingClientRect();
                    const containerWidth = rect.width || window.innerWidth;

                    let swallowedTotalPx = 0;
                    const holeRadiusPct = (holeSizeRef.current / 2) / containerWidth * 100;

                    const remaining: GameObject[] = [];
                    const p = playerPosRef.current;
                    for (let i = 0; i < curObjects.length; i++) {
                        const obj = curObjects[i];
                        const objRadiusPct = (obj.size / 2) / containerWidth * 100;
                        const dx = obj.x - p.x;
                        const dy = obj.y - p.y;
                        const distance = Math.hypot(dx, dy);
                        const collided = distance < (holeRadiusPct + objRadiusPct);
                        if (collided) {
                            swallowedTotalPx += obj.size;
                        } else {
                            remaining.push(obj);
                        }
                    }

                    if (swallowedTotalPx > 0) {
                        holeSizeRef.current = holeSizeRef.current + swallowedTotalPx * growthFactor;
                        scoreRef.current += 1;
                        changed = true;
                    }

                    if (changed) {
                        objectsRef.current = remaining;
                    }
                }
            }

            if (changed) {
                setRenderObjects([...objectsRef.current]);
                setRenderHoleSize(holeSizeRef.current);
                setScore(scoreRef.current);
            }

            rafIdRef.current = requestAnimationFrame(loop);
        };

        rafIdRef.current = requestAnimationFrame(loop);

        return () => {
            disposed = true;
            if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
            lastTimeRef.current = null;
        };
    }, []);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!gameRef.current) return;
        const rect = gameRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100;
        const next = { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
        playerPosRef.current = next;
        setPlayerPos(next);
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (e.touches.length > 0 && gameRef.current) {
            const rect = gameRef.current.getBoundingClientRect();
            const x = (e.touches[0].clientX - rect.left) / rect.width * 100;
            const y = (e.touches[0].clientY - rect.top) / rect.height * 100;
            const next = { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
            playerPosRef.current = next;
            setPlayerPos(next);
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
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.5)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Score Display */}
            <div className="absolute top-6 left-6 z-50 text-white">
                <div className="text-sm text-slate-400">Score</div>
                <div className="text-4xl font-black text-cyan-400">{score}</div>
            </div>

            {/* Game Objects */}
            {renderObjects.map((obj) => (
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
                className="absolute rounded-full pointer-events-none transition-100"
                style={{
                    left: `${playerPos.x}%`,
                    top: `${playerPos.y}%`,
                    width: `${renderHoleSize}px`,
                    height: `${renderHoleSize}px`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: `0 0 50px rgba(0, 217, 255, 0.8), inset 0 0 20px rgba(0, 0, 0, 0.9)`,
                    border: '3px solid #00D9FF',
                    background: 'radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,217,255,0.1) 100%)',
                }}
            >
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-pulse" />
            </div>
        </div>
    );
};
