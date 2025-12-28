import { motion } from 'framer-motion';
import { content } from '../data/content';
import Button from './ui/Button';

const HeroSection = ({ onStart }) => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'transparent',
            padding: '2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative background elements */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                    borderRadius: '50%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0
                }}
            />

            <div style={{ zIndex: 1, position: 'relative' }}>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                        color: '#000000',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                        fontSize: '1rem',
                        fontWeight: '900'
                    }}
                >
                    {content.hero.subtitle}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        color: '#000000',
                        margin: '0 0 2rem 0',
                        fontWeight: '900',
                        textShadow: '2px 2px 0px rgba(255,255,255,0.5)'
                    }}
                >
                    {content.hero.title}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <Button onClick={onStart} style={{ color: '#000000', borderColor: '#000000', fontWeight: '900' }}>
                        Begin Our Journey
                    </Button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 2, duration: 1 }}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    color: '#000000',
                    fontSize: '0.9rem',
                    fontWeight: '700'
                }}
            >
                Designed for {content.hero.nicknames.join(' • ')}
            </motion.div>
        </div>
    );
};

export default HeroSection;
