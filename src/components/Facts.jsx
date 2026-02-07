import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Heart } from 'lucide-react';
import Button from './ui/Button';
import StoryBook from './StoryBook';

const Facts = ({ onStartHunt, onStartDateNight, onOpenVault }) => {
    const [isBookOpen, setIsBookOpen] = useState(false);

    return (
        <section style={{ padding: '6rem 1rem', borderTop: '1px solid rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    style={{
                        marginBottom: '4rem',
                        color: '#000',
                        fontWeight: '900',
                        fontSize: '3rem',
                        fontFamily: 'var(--font-heading)'
                    }}
                >
                    Our World 🌏
                </motion.h2>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem'
                }}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={() => setIsBookOpen(true)}
                            style={{
                                fontSize: '1.5rem',
                                padding: '1.5rem 3rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                background: '#000',
                                color: '#fff',
                                border: 'none',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                            }}
                        >
                            <Book size={32} />
                            Two Strangers
                        </Button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={onStartHunt}
                            style={{
                                fontSize: '1.2rem',
                                padding: '1rem 2.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                background: '#fff',
                                color: '#F43F5E',
                                border: '2px solid #F43F5E',
                                boxShadow: '0 5px 15px rgba(244, 63, 94, 0.2)'
                            }}
                        >
                            The Box of Us 🎁
                        </Button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={onStartDateNight}
                            style={{
                                fontSize: '1.2rem',
                                padding: '1rem 2.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                background: '#fff',
                                color: '#000',
                                border: '2px solid #000',
                                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            Slot Machine 🎰
                        </Button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={onOpenVault}
                            style={{
                                fontSize: '1.2rem',
                                padding: '1rem 2.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                background: '#fff',
                                color: '#d946ef', // Fuchsia color for letters
                                border: '2px solid #d946ef',
                                boxShadow: '0 5px 15px rgba(217, 70, 239, 0.2)'
                            }}
                        >
                            Letter Vault 💌
                        </Button>
                    </motion.div>

                    <p style={{ marginTop: '2rem', fontSize: '1.1rem', fontWeight: '700', color: '#333' }}>
                        The story of how we became "Us".
                    </p>

                    <div style={{ marginTop: '4rem', color: '#000', opacity: 0.6, fontSize: '0.9rem', fontWeight: '700' }}>
                        <Heart size={16} style={{ display: 'inline', marginBottom: '-3px' }} fill="black" />
                        &nbsp;  Designed for You, Forever.
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isBookOpen && (
                    <StoryBook isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Facts;
