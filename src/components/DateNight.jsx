import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { Lock, Unlock, RotateCw, AlertTriangle, CloudRain, Heart } from 'lucide-react';
import Button from './ui/Button';

// Smart Match Rules
const SMART_MATCHES = {
    'dosa': 'madras',
    'cutlet': 'boring',
    'golgappa': 'college',
    'popcorn': 'connection',
    'paneer': 'sandhya',
    'momos': 'thaneshwar' // Nostalgia linking (can override to Thaneshwar logic) OR defaults. 
    // Wait, Scenario D says "Spring Roll (or Momos) + Thaneshwar". Let's link Momos to Thaneshwar for that scenario.
};

const DateNight = () => {
    // Indexes for the 3 reels
    const [indexes, setIndexes] = useState([0, 0, 0]);
    const [locks, setLocks] = useState([false, false, false]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [resultMessage, setResultMessage] = useState(null);
    const [pumpkinCount, setPumpkinCount] = useState(0);

    const reels = [
        content.dateNight.reels.food,
        content.dateNight.reels.place,
        content.dateNight.reels.vibe
    ];

    const spinReel = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setResultMessage(null);

        let spinDuration = 2000;
        let intervalTime = 100;
        let elapsedTime = 0;

        const interval = setInterval(() => {
            setIndexes(prev => {
                return prev.map((idx, col) => {
                    if (locks[col]) return idx; // If locked, don't move
                    return Math.floor(Math.random() * reels[col].length);
                });
            });
            elapsedTime += intervalTime;

            if (elapsedTime >= spinDuration) {
                clearInterval(interval);
                finalizeSpin();
            }
        }, intervalTime);
    };

    const finalizeSpin = () => {
        setIsSpinning(false);

        // --- GAME LOGIC ---
        let newIndexes = [...indexes];

        // 1. Get current random selection (or locked values)
        // If not locked, re-roll one final time to determine distinct 'stop'
        newIndexes = newIndexes.map((idx, col) => {
            if (locks[col]) return idx;
            return Math.floor(Math.random() * reels[col].length);
        });

        // 2. Anti-Frustration Rule (Pumpkin Trap Limit)
        const foodId = reels[0][newIndexes[0]].id;
        if (foodId === 'pumpkin') {
            if (pumpkinCount >= 1) {
                // Force Chicken Popcorn (idx 2 usually, need to find it)
                const popcornIdx = reels[0].findIndex(i => i.id === 'popcorn');
                newIndexes[0] = popcornIdx;
                setPumpkinCount(0); // Reset
            } else {
                setPumpkinCount(prev => prev + 1);
            }
        }

        // 3. Smart Match Overrides (If Reel 1 is locked or just landed, logic can force Reel 2)
        // Only force Reel 2 if it was NOT locked
        const finalFoodId = reels[0][newIndexes[0]].id;
        if (!locks[1] && SMART_MATCHES[finalFoodId]) {
            // 70% chance to snap
            if (Math.random() > 0.3) {
                const targetPlaceId = SMART_MATCHES[finalFoodId];
                const targetIdx = reels[1].findIndex(i => i.id === targetPlaceId);
                if (targetIdx !== -1) newIndexes[1] = targetIdx;
            }
        }

        // Update state with final positions
        setIndexes(newIndexes);
        evaluateResult(newIndexes);
    };

    const evaluateResult = (idxs) => {
        const item1 = reels[0][idxs[0]];
        const item2 = reels[1][idxs[1]];
        const item3 = reels[2][idxs[2]];

        // Scenario B: Pumpkin Trap
        if (item1.id === 'pumpkin') {
            setResultMessage({ text: "SYSTEM ERROR: LADAKU REJECTED THIS MEAL! SPIN AGAIN! 🤢", type: 'trap' });
            return;
        }

        // Scenario A: Jackpots
        if (item1.id === 'dosa' && item2.id === 'madras') { setResultMessage({ text: "Classic South Indian Date! 🥥", type: 'jackpot' }); return; }
        if (item1.id === 'cutlet' && item2.id === 'boring') { setResultMessage({ text: "Street Food & Boring Road Vibes! 🌆", type: 'jackpot' }); return; }
        if (item1.id === 'golgappa' && item2.id === 'college') { setResultMessage({ text: "College Nostalgia Trip! 🎓", type: 'jackpot' }); return; }
        if (item1.id === 'popcorn' && item2.id === 'connection') { setResultMessage({ text: "Crunchy Bites at Connection! 🍗", type: 'jackpot' }); return; }
        if (item1.id === 'paneer' && item2.id === 'sandhya') { setResultMessage({ text: "Royal Dinner at Sandhya! 🥘", type: 'jackpot' }); return; }

        // Scenario C: Mannerless Warning
        if (item2.id === 'toto' && (item3.id === 'tease' || item3.id === 'hands')) {
            setResultMessage({ text: "Warning: Don't sit beside her or she'll say you have no manners! 😂", type: 'warning' });
            return;
        }

        // Scenario D: Nostalgia
        if ((item1.id === 'momos' || item1.id === 'cutlet') && item2.id === 'thaneshwar') {
            setResultMessage({ text: "Just like our temple date. My half is yours. ❤️", type: 'love' });
            return;
        }

        // Scenario E: Future Goal
        if (item2.id === 'meghalaya' && item3.id === 'hands') {
            setResultMessage({ text: "The Ultimate Goal. Coming soon in 3 days... 🏔️", type: 'special' });
            return;
        }

        // Scenario F: Random
        setResultMessage({ text: "A weird date... but as long as we are together, it's perfect. ✨", type: 'neutral' });
    };

    const toggleLock = (colIndex) => {
        setLocks(prev => {
            const newLocks = [...prev];
            newLocks[colIndex] = !newLocks[colIndex];
            return newLocks;
        });
    };

    return (
        <section style={{ padding: '6rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '3rem', fontWeight: '900', color: '#000', fontFamily: 'var(--font-heading)' }}>
                Date Night Decider 🎰
            </h2>
            <p style={{ color: '#000', marginBottom: '3rem', fontWeight: '700' }}>
                Can't decide? Lock your favorite food and let fate decide.
            </p>

            <div style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '4px solid #F43F5E',
                borderRadius: '30px',
                padding: '3rem',
                minWidth: '350px',
                maxWidth: '800px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
            }}>
                {/* REELS ROW */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>

                    {reels.map((reel, colIndex) => {
                        const currentItem = reel[indexes[colIndex]];
                        return (
                            <div key={colIndex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                {/* Label */}
                                <span style={{ fontWeight: '900', fontSize: '0.9rem', color: '#881337', textTransform: 'uppercase' }}>
                                    {colIndex === 0 ? "The Craving" : colIndex === 1 ? "The Spot" : "The Vibe"}
                                </span>

                                {/* Reel Box */}
                                <motion.div
                                    animate={isSpinning && !locks[colIndex] ? { y: [-5, 5] } : { y: 0 }}
                                    transition={isSpinning ? { repeat: Infinity, duration: 0.1 } : {}}
                                    style={{
                                        background: '#fff',
                                        width: '100%',
                                        height: '150px',
                                        borderRadius: '15px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: locks[colIndex] ? '3px solid #F43F5E' : '1px solid #ddd',
                                        boxShadow: locks[colIndex] ? '0 0 15px rgba(244, 63, 94, 0.3)' : 'inset 0 0 10px rgba(0,0,0,0.05)',
                                        overflow: 'hidden',
                                        filter: isSpinning && !locks[colIndex] ? 'blur(2px)' : 'none'
                                    }}
                                >
                                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{currentItem.icon}</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '900', textAlign: 'center', padding: '0 5px' }}>{currentItem.name}</div>
                                </motion.div>

                                {/* Lock Toggle */}
                                <button
                                    onClick={() => toggleLock(colIndex)}
                                    style={{
                                        background: locks[colIndex] ? '#F43F5E' : 'rgba(255,255,255,0.7)',
                                        color: locks[colIndex] ? '#fff' : '#000',
                                        border: 'none',
                                        borderRadius: '20px',
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.8rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}
                                >
                                    {locks[colIndex] ? <Lock size={14} /> : <Unlock size={14} />}
                                    {locks[colIndex] ? "LOCKED" : "LOCK"}
                                </button>
                            </div>
                        );
                    })}

                </div>

                {/* SPIN BUTTON */}
                <div style={{ textAlign: 'center' }}>
                    <Button
                        onClick={spinReel}
                        disabled={isSpinning}
                        style={{
                            background: 'linear-gradient(90deg, #F43F5E, #E11D48)',
                            color: '#fff',
                            fontSize: '1.5rem',
                            padding: '1rem 4rem',
                            border: 'none',
                            boxShadow: '0 10px 20px rgba(225, 29, 72, 0.3)'
                        }}
                    >
                        {isSpinning ? "DECIDING..." : "SPIN THE NIGHT 🔄"}
                    </Button>
                </div>

                {/* RESULT BOX */}
                <AnimatePresence mode="wait">
                    {resultMessage && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{
                                marginTop: '2rem',
                                padding: '1.5rem',
                                borderRadius: '15px',
                                background: resultMessage.type === 'trap' ? '#FEE2E2' :
                                    resultMessage.type === 'jackpot' ? '#FFFBEB' :
                                        resultMessage.type === 'special' ? '#EFF6FF' : '#fff',
                                border: resultMessage.type === 'trap' ? '2px solid #EF4444' :
                                    resultMessage.type === 'jackpot' ? '2px solid #F59E0B' : '2px solid rgba(0,0,0,0.1)',
                                textAlign: 'center',
                                color: '#000'
                            }}
                        >
                            {resultMessage.type === 'trap' && <AlertTriangle color="#EF4444" size={32} style={{ marginBottom: '0.5rem' }} />}
                            {resultMessage.type === 'special' && <CloudRain color="#3B82F6" size={32} style={{ marginBottom: '0.5rem' }} />}
                            {resultMessage.type === 'jackpot' && <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🎉</span>}

                            <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>
                                {resultMessage.text}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default DateNight;
