import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import {
    Heart, MessageCircle, Eye, Calendar, Mic, Gem,
    HeartHandshake, Users, HeartCrack, Lock, CheckCircle, XCircle
} from 'lucide-react';
import Button from './ui/Button';

// Icon mapping helper
const getIcon = (type) => {
    switch (type) {
        case 'message': return <MessageCircle size={24} />;
        case 'heart': return <Heart size={24} />;
        case 'eye': return <Eye size={24} />;
        case 'date': return <Calendar size={24} />;
        case 'voice': return <Mic size={24} />;
        case 'ring': return <Gem size={24} />;
        case 'hand': return <HeartHandshake size={24} />;
        case 'hug': return <Users size={24} />;
        case 'breakup': return <HeartCrack size={24} />;
        case 'kiss': return <Heart fill="currentColor" size={24} />;
        default: return <Heart size={24} />;
    }
};

const Timeline = ({ onUnlockReward }) => {
    const [unlockedLevel, setUnlockedLevel] = useState(0);
    const [showError, setShowError] = useState(null); // id of item with error

    const handleChoice = (index, isCorrect) => {
        if (isCorrect) {
            // Play success animation/sound here if desired
            setUnlockedLevel(prev => Math.max(prev, index + 1));
        } else {
            setShowError(index);
            setTimeout(() => setShowError(null), 1000);
        }
    };

    return (
        <section style={{
            padding: '4rem 1rem',
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '4rem', color: '#000', fontSize: '2.5rem', fontWeight: '900' }}>
                Our Journey Game 🎮
            </h2>
            <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#000', fontWeight: '700' }}>
                Guess the dates correctly to traverse our timeline!
            </p>

            {/* SVG Path Background */}
            <svg
                style={{ position: 'absolute', top: 200, left: '50%', transform: 'translateX(-50%)', height: '100%', width: '100px', zIndex: 0 }}
                viewBox={`0 0 100 ${content.timeline.length * 200}`}
                preserveAspectRatio="none"
            >
                <path
                    d={`M 50 0 ${content.timeline.map((_, i) => `Q ${i % 2 === 0 ? 0 : 100} ${i * 200 + 100}, 50 ${i * 200 + 200}`).join(' ')}`}
                    fill="none"
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="4"
                    strokeDasharray="10 5"
                />
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', position: 'relative', zIndex: 1 }}>
                {content.timeline.map((event, index) => {
                    const isL = index % 2 === 0;
                    const isLocked = index > unlockedLevel;
                    const isCurrent = index === unlockedLevel;
                    const isCompleted = index < unlockedLevel;

                    const showCorrectFirst = (index * 7) % 2 === 0;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: isL ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            style={{
                                display: 'flex',
                                flexDirection: isL ? 'row' : 'row-reverse',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {/* Content Card */}
                            <div style={{
                                width: '40%',
                                background: isLocked ? 'rgba(0,0,0,0.02)' : 'var(--glass-bg)',
                                border: isLocked ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(0,0,0,0.1)',
                                padding: '2rem',
                                borderRadius: '20px',
                                textAlign: 'center',
                                boxShadow: isLocked ? 'none' : '0 10px 30px rgba(0,0,0,0.05)',
                                filter: isLocked ? 'grayscale(100%) blur(1px)' : 'none',
                                opacity: isLocked ? 0.6 : 1,
                                transition: 'all 0.5s ease',
                                position: 'relative'
                            }}>
                                {/* Icon Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: isLocked ? '#ccc' : 'var(--accent-rose)',
                                    color: '#fff',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                }}>
                                    {isLocked ? <Lock size={18} /> : getIcon(event.type)}
                                </div>

                                <h3 style={{ marginTop: '1rem', color: '#000', fontWeight: '900', fontSize: '1.2rem' }}>{event.title}</h3>

                                {index === unlockedLevel ? (
                                    // Quiz Mode
                                    <motion.div
                                        animate={showError === index ? { x: [-10, 10, -10, 10, 0] } : {}}
                                        style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                                    >
                                        <p style={{ fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '700' }}>When did this happen?</p>

                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                            {showCorrectFirst ? (
                                                <>
                                                    <QuizButton onClick={() => handleChoice(index, true)}>{event.correctDate}</QuizButton>
                                                    <QuizButton onClick={() => handleChoice(index, false)}>{event.wrongDate}</QuizButton>
                                                </>
                                            ) : (
                                                <>
                                                    <QuizButton onClick={() => handleChoice(index, false)}>{event.wrongDate}</QuizButton>
                                                    <QuizButton onClick={() => handleChoice(index, true)}>{event.correctDate}</QuizButton>
                                                </>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : (
                                    // Completed or Locked Mode
                                    <div style={{ marginTop: '1rem' }}>
                                        {isCompleted && (
                                            <div style={{ color: 'var(--accent-rose)', fontWeight: '900', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                                <CheckCircle size={16} /> {event.correctDate}
                                            </div>
                                        )}
                                        <p style={{ fontSize: '0.95rem', color: '#333', marginTop: '0.5rem', fontWeight: '700' }}>{event.description}</p>
                                    </div>
                                )}
                            </div>

                            {/* Connector Dot */}
                            <div style={{
                                width: '20px',
                                height: '20px',
                                background: isCompleted ? 'var(--accent-rose)' : (isCurrent ? 'var(--accent-gold)' : '#e0e0e0'),
                                borderRadius: '50%',
                                margin: '0 2rem',
                                border: '4px solid #fff',
                                boxShadow: '0 0 0 2px rgba(0,0,0,0.1)',
                                zIndex: 2,
                                transition: 'background 0.3s ease'
                            }} />

                            {/* Empty balance side */}
                            <div style={{ width: '40%' }} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer celebration if all unlocked */}
            {unlockedLevel >= content.timeline.length && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        textAlign: 'center',
                        marginTop: '5rem',
                        padding: '2rem',
                        background: '#ffe4e6',
                        borderRadius: '20px',
                        border: '2px solid #000',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}
                >
                    <h3 style={{ fontSize: '2rem', color: '#000', fontWeight: '900', marginBottom: '1.5rem' }}>Journey Completed! 🎉</h3>

                    <Button
                        onClick={onUnlockReward}
                        style={{
                            background: '#000',
                            color: '#fff',
                            fontSize: '1.2rem',
                            padding: '1rem 2.5rem',
                            borderColor: '#000',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                        }}
                    >
                        Rewards Unlocked 🎁
                    </Button>
                </motion.div>
            )}

        </section>
    );
};

const QuizButton = ({ children, onClick }) => (
    <button
        onClick={onClick}
        style={{
            padding: '0.8rem 1.2rem',
            borderRadius: '8px',
            border: '2px solid #000',
            background: 'transparent',
            color: '#000',
            fontWeight: '700',
            fontSize: '0.9rem',
            flex: 1,
            minWidth: '120px',
            transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => { e.target.style.background = '#000'; e.target.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#000'; }}
    >
        {children}
    </button>
);

export default Timeline;
