import { motion } from 'framer-motion';
import { content } from '../data/content';

const OriginSection = () => {
    return (
        <section style={{
            padding: '6rem 2rem',
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    marginBottom: '3rem',
                    fontSize: '2.5rem',
                    color: '#000',
                    fontWeight: '900',
                    fontFamily: 'var(--font-heading)'
                }}
            >
                {content.origin.title}
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    padding: '3rem',
                    borderRadius: '20px',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.05)',
                    maxWidth: '800px',
                    width: '100%'
                }}
            >
                <p style={{
                    fontSize: '1.2rem',
                    lineHeight: '2.2',
                    color: '#000',
                    fontWeight: '700',
                    whiteSpace: 'pre-wrap', // Preserves the poem's formatting
                    fontFamily: 'var(--font-body)'
                }}>
                    {content.origin.text}
                </p>
            </motion.div>
        </section>
    );
};

export default OriginSection;
