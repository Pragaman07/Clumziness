import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import {
    Shirt, Box, Mic, Mail, HeartCrack, Gift, Package, CloudRain,
    Lock, ArrowRight, Star, Heart
} from 'lucide-react';
import Button from './ui/Button';

// Icon Map
const getIcon = (iconName, color) => {
    const props = { size: 32, color: color };
    switch (iconName) {
        case 'shirt': return <Shirt {...props} />;
        case 'cube': return <Box {...props} />;
        case 'mic': return <Mic {...props} />;
        case 'mail': return <Mail {...props} />;
        case 'heartbreak': return <HeartCrack {...props} />;
        case 'gift': return <Gift {...props} />;
        case 'box': return <Package {...props} />;
        case 'cloud': return <CloudRain {...props} />;
        default: return <Heart {...props} />;
    }
};

const MemoryHunt = ({ onBack }) => {
    const [gameState, setGameState] = useState('welcome'); // 'welcome' | 'grid' | 'gallery'
    const [unlockedCount, setUnlockedCount] = useState(0); // 0 to 8
    const [activeCard, setActiveCard] = useState(null); // id of physically open card

    const handleCollect = () => {
        setActiveCard(null);
        setUnlockedCount(prev => prev + 1);
    };

    return (
        <div style={{
            minHeight: '100vh',
            /* background: handled globally now */
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>

            {/* Back Button */}
            <button
                onClick={onBack}
                style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 50, background: 'none', border: 'none', cursor: 'pointer' }}
            >
                <ArrowRight transform="rotate(180)" size={24} />
            </button>

            <AnimatePresence mode="wait">

                {/* WECLOME SCREEN */}
                {gameState === 'welcome' && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ height: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <Heart size={80} fill="#E11D48" color="#E11D48" />
                        </motion.div>

                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', margin: '2rem 0 1rem', color: '#881337' }}>
                            The Box of Us
                        </h1>

                        <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '3rem', fontWeight: '900', color: '#9F1239' }}>
                            Welcome, Cutioo. I have locked our most precious memories inside this box. Can you find them all?
                        </p>

                        <Button onClick={() => setGameState('grid')} style={{ background: '#fff', color: '#E11D48' }}>
                            OPEN THE BOX 🎁
                        </Button>
                    </motion.div>
                )}

                {/* GAME GRID */}
                {gameState === 'grid' && (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}
                    >
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', color: '#881337', fontWeight: '900' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>Memory Collection</h2>
                            <div style={{ background: 'rgba(255,255,255,0.5)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                                {unlockedCount} / {content.memoryHunt.length} Found
                            </div>
                        </div>

                        {/* Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {content.memoryHunt.map((item, index) => {
                                const isUnlocked = index < unlockedCount;
                                const isNext = index === unlockedCount;
                                const isLocked = index > unlockedCount;

                                return (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        onClick={() => isNext ? setActiveCard(item) : null}
                                        whileHover={isNext ? { scale: 1.05 } : {}}
                                        whileTap={isNext ? { scale: 0.95 } : {}}
                                        animate={isNext ? { boxShadow: ['0 0 0 0px #F43F5E', '0 0 0 10px rgba(244, 63, 94, 0)'], transition: { repeat: Infinity, duration: 1.5 } } : {}}
                                        style={{
                                            aspectRatio: '1/1',
                                            background: isLocked ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)',
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: isNext ? 'pointer' : 'default',
                                            border: isNext ? '2px solid #F43F5E' : '1px solid rgba(255,255,255,0.5)',
                                            position: 'relative',
                                            opacity: isLocked ? 0.6 : 1
                                        }}
                                    >
                                        {isLocked ? (
                                            <Lock color="#9F1239" size={24} />
                                        ) : (
                                            getIcon(item.icon, item.color)
                                        )}

                                        {isUnlocked && (
                                            <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>✅</div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* FINALE TRIGGER */}
                        {unlockedCount === content.memoryHunt.length && (
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                style={{ textAlign: 'center', marginTop: '4rem' }}
                            >
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block', marginBottom: '1rem' }}>
                                    <Star size={60} fill="#FCD34D" color="#F59E0B" />
                                </motion.div>
                                <h2 style={{ fontSize: '2rem', color: '#881337', fontFamily: 'var(--font-heading)' }}>You found all the pieces of us.</h2>
                                <Button onClick={() => setGameState('gallery')} style={{ marginTop: '2rem', background: '#F43F5E', color: '#fff' }}>
                                    SEE THE FUTURE 🔮
                                </Button>
                            </motion.div>
                        )}

                    </motion.div>
                )}

                {/* CARD MODAL */}
                {activeCard && (
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.6)',
                            zIndex: 100,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '1rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{
                                background: '#fff',
                                padding: '2rem',
                                borderRadius: '30px',
                                maxWidth: '500px',
                                width: '100%',
                                textAlign: 'center',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
                            }}
                        >
                            <div style={{ background: '#FFF1F2', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                {getIcon(activeCard.icon, activeCard.color)}
                            </div>

                            <h3 style={{ fontSize: '2rem', color: '#881337', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{activeCard.title}</h3>

                            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: '700', color: '#333' }}>
                                "{activeCard.text}"
                            </p>

                            <div style={{ background: '#F3F4F6', padding: '1rem', borderRadius: '15px', marginBottom: '2rem', fontSize: '0.9rem', fontStyle: 'italic', color: '#4B5563' }}>
                                <strong>Hidden Detail:</strong><br />
                                {activeCard.detail}
                            </div>

                            <Button onClick={handleCollect} style={{ width: '100%', background: '#F43F5E', color: '#fff' }}>
                                COLLECT MEMORY ✨
                            </Button>

                        </motion.div>
                    </motion.div>
                )}

                {/* FUTURE GALLERY */}
                {gameState === 'gallery' && (
                    <motion.div
                        key="gallery"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ paddingTop: '4rem', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}
                    >
                        <h2 style={{ fontSize: '3rem', color: '#881337', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Our Future</h2>
                        <p style={{ marginBottom: '3rem', fontSize: '1.2rem', fontWeight: '900', color: '#9F1239' }}>These boxes are waiting to be filled with our next adventures...</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} style={{
                                    aspectRatio: '3/4',
                                    background: '#FFF1F2',
                                    borderRadius: '15px',
                                    border: '2px dashed #FECDD3',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#FDA4AF',
                                    fontWeight: '700'
                                }}>
                                    Memory #{i + 8}
                                </div>
                            ))}
                            {/* Placeholders for pics - user requested pics but didn't provide them yet for future. Using cute placeholders. */}
                        </div>

                        <div style={{ marginTop: '4rem' }}>
                            <Button onClick={onBack} style={{ background: '#fff', color: '#000' }}>Back Home</Button>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
};

export default MemoryHunt;
