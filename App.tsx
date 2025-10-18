/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {useEffect, useRef, useState} from "react";
import {SplashScreen} from "./src/app/authentication/screen/SplashScreen/SplashScreen.tsx";
import {MenuScreen} from "./src/app/menu/screen/HomeScreen/HomeScreen.tsx";
import {GameScreen} from "./src/app/game/screen/GameScreen/GameScreen.tsx";
import {GameOverScreen} from "./src/app/game/screen/GameOverScreen/GameOverScreen.tsx";
import {GameHUD} from "./src/app/game/components/GameHUD/GameHUD.tsx";

function App() {
    const [screen, setScreen] = useState('splash');
    const [holeSize, setHoleSize] = useState(50);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [objectsCount, setObjectsCount] = useState(0);
    const gameStartTimeRef = useRef(0);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Augmenter la taille du trou au fil du temps (pas du score)
    useEffect(() => {
        if (screen === 'game' && isPlaying) {
            const gameLoop = setInterval(() => {
                setHoleSize((prev) => Math.min(prev + 0.5, 250));
            }, 100);

            return () => clearInterval(gameLoop);
        }
    }, [screen, isPlaying]);

    // Game Over après 60 secondes
    useEffect(() => {
        if (screen === 'game' && isPlaying && gameStartTimeRef.current) {
            const gameTimer = setInterval(() => {
                const elapsed = (Date.now() - gameStartTimeRef.current) / 1000;
                if (elapsed >= 60) {
                    setIsPlaying(false);
                    setScreen('gameover');
                }
            }, 100);

            return () => clearInterval(gameTimer);
        }
    }, [screen, isPlaying]);

    const handlePlay = () => {
        setHoleSize(50);
        setIsPlaying(true);
        setObjectsCount(0);
        gameStartTimeRef.current = Date.now();
        setScreen('game');
    };

    const handleRestart = () => {
        handlePlay();
    };

    const handleMenu = () => {
        setScreen('menu');
        setIsPlaying(false);
    };

    return (
        <div className="w-full h-screen bg-black overflow-hidden">
            {screen === 'splash' && <SplashScreen onFinish={() => setScreen('menu')} />}

            {screen === 'menu' && (
                <MenuScreen onPlay={handlePlay} isMobile={isMobile} canDownload={isMobile} />
            )}

            {screen === 'game' && (
                <>
                    <GameScreen isPlaying={isPlaying} holeSize={holeSize} />
                    <GameHUD
                        isPlaying={isPlaying}
                        isMuted={isMuted}
                        onToggleMute={() => setIsMuted(!isMuted)}
                        onPause={() => setIsPlaying(false)}
                        onResume={() => setIsPlaying(true)}
                        onMenu={handleMenu}
                    />
                </>
            )}

            {screen === 'gameover' && (
                <GameOverScreen score={objectsCount} onRestart={handleRestart} onMenu={handleMenu} />
            )}
        </div>
    );
}

export default App;
