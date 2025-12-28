import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { X } from 'lucide-react';

const TypewriterText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            index++;
            if (index === text.length) clearInterval(timer);
        }, 20); // Speed of typing

        return () => clearInterval(timer);
    }, [text]);

    return (
        <p style={{
            whiteSpace: 'pre-wrap',
            lineHeight: '1.8',
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#000'
        }}>
            {displayedText}
        </p>
    );
};

const LetterVault = () => {
    const [selectedLetter, setSelectedLetter] = useState(null);

    return (
        <section id="letter-vault" style={{ padding: '6rem 2rem', minHeight: '100vh' }}>
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                style={{
                    textAlign: 'center',
                    marginBottom: '4rem',
                    fontSize: '3rem',
                    color: '#000',
                    fontWeight: '900'
                }}
            >
                Letter Vault 💌
            </motion.h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {content.letters.map((letter, index) => (
                    <motion.div
                        key={letter.id}
                        onClick={() => setSelectedLetter(letter)}
                        whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            background: '#fff',
                            padding: '2rem',
                            borderRadius: '16px',
                            border: '2px solid #000',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '200px',
                            boxShadow: '10px 10px 0px rgba(0,0,0,1)', // Retro pop shadow
                            textAlign: 'center'
                        }}
                    >
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#000' }}>
                            {letter.title}
                        </h3>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedLetter && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(255, 255, 255, 0.95)',
                            zIndex: 100,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            style={{
                                background: '#fff',
                                width: '100%',
                                maxWidth: '800px',
                                maxHeight: '80vh',
                                overflowY: 'auto',
                                padding: '4rem 2rem',
                                borderRadius: '20px',
                                border: '3px solid #000',
                                boxShadow: '20px 20px 0px rgba(0,0,0,1)',
                                position: 'relative'
                            }}
                        >
                            <button
                                onClick={() => setSelectedLetter(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={32} color="#000" />
                            </button>

                            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', fontWeight: '900' }}>
                                {selectedLetter.title}
                            </h2>

                            {/* Re-mount Typewriter when letter changes */}
                            <TypewriterText key={selectedLetter.id} text={selectedLetter.content} />

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default LetterVault;
