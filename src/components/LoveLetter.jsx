import { useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';
import Button from './ui/Button';

const LoveLetter = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section style={{
            padding: '4rem 1rem',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{
                    maxWidth: '800px',
                    background: '#fff', // Pure white paper
                    color: '#000',
                    padding: '3rem',
                    borderRadius: '4px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.1)'
                }}
            >
                {/* Paper texture effect/Header */}
                <div style={{
                    textAlign: 'center',
                    borderBottom: '2px solid #000',
                    paddingBottom: '2rem',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        color: '#000',
                        fontSize: '2.5rem',
                        margin: 0,
                        fontWeight: '900'
                    }}>
                        {content.loveLetter.title}
                    </h2>
                </div>

                {!isOpen ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '2rem', color: '#000', fontWeight: '700' }}>
                            "I typed some words, then deleted them... but here is my heart."
                        </p>
                        <Button
                            onClick={() => setIsOpen(true)}
                            style={{ borderColor: '#000', color: '#000', fontWeight: '900' }}
                        >
                            Read My Heart
                        </Button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <p style={{
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'var(--font-body)',
                            lineHeight: '1.8',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            color: '#000'
                        }}>
                            {content.loveLetter.text}
                        </p>
                        <div style={{
                            marginTop: '3rem',
                            textAlign: 'right',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.5rem',
                            color: '#000',
                            fontWeight: '900'
                        }}>
                            Love, Pragaman
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default LoveLetter;
