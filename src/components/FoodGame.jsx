import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';

const FoodGame = () => {
    const allFoods = [
        ...content.foodGame.favorites.map(item => ({ name: item, type: 'love' })),
        ...content.foodGame.hateList.map(item => ({ name: item, type: 'hate' }))
    ].sort(() => Math.random() - 0.5);

    const [selectedItems, setSelectedItems] = useState([]);
    const [message, setMessage] = useState(null);

    const handleFoodClick = (item) => {
        if (item.type === 'hate') {
            setMessage({ text: `Oh no! She hates ${item.name}! 🤢`, type: 'error' });
            setTimeout(() => setMessage(null), 2000);
            return;
        }

        if (!selectedItems.includes(item.name)) {
            const newSelected = [...selectedItems, item.name];
            setSelectedItems(newSelected);

            if (newSelected.length >= 5) {
                setMessage({ text: "You know her taste perfectly! ❤️", type: 'success' });
            } else {
                setMessage({ text: "Yum! That's a favorite! 😋", type: 'neutral' });
                setTimeout(() => setMessage(null), 1000);
            }
        }
    };

    return (
        <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                style={{ color: '#000000', marginBottom: '1rem', fontSize: '2.5rem', fontWeight: '900' }}
            >
                {content.foodGame.title}
            </motion.h2>
            <p style={{ color: '#000000', marginBottom: '3rem', fontWeight: '700' }}>
                {content.foodGame.instruction} <br />
                <span style={{ fontSize: '0.8rem' }}>(Find 5 favorites to win!)</span>
            </p>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {allFoods.map((item, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleFoodClick(item)}
                        disabled={selectedItems.includes(item.name)}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                            padding: '1rem 1.5rem',
                            borderRadius: '50px',
                            border: item.type === 'hate' ? '2px solid transparent' : '2px solid rgba(0,0,0,0.1)',
                            background: selectedItems.includes(item.name)
                                ? 'var(--accent-rose)'
                                : 'var(--glass-bg)',
                            color: selectedItems.includes(item.name) ? '#fff' : '#000000',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontFamily: 'var(--font-body)',
                            fontWeight: '900',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                        }}
                    >
                        {item.name}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            marginTop: '3rem',
                            padding: '1rem 2rem',
                            background: message.type === 'error' ? '#ff4d4d' : '#000',
                            color: '#fff',
                            borderRadius: '8px',
                            display: 'inline-block',
                            fontWeight: '900'
                        }}
                    >
                        {message.text}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default FoodGame;
