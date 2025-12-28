import { motion } from 'framer-motion';

const Button = ({ children, onClick, ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px var(--accent-rose)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            style={{
                padding: '0.8rem 2rem',
                background: 'transparent',
                border: '1px solid var(--accent-rose)',
                color: 'var(--accent-rose)',
                borderRadius: '50px',
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                transition: 'background 0.3s ease',
                ...props.style
            }}
        >
            {children}
        </motion.button>
    );
};

export default Button;
