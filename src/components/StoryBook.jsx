import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { X, ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';

const Page = ({ children, zIndex, rotateY, onPageClick, pageNum }) => (
    <motion.div
        animate={{ rotateY }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#fdfbf7', // Paper color
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 10%)', // Spine shadow
            transformStyle: 'preserve-3d',
            transformOrigin: 'left center',
            zIndex,
            top: 0,
            left: 0,
            borderRadius: '0 10px 10px 0',
            boxShadow: 'inset 5px 0 10px rgba(0,0,0,0.05), 5px 5px 15px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            backfaceVisibility: 'hidden' // Only show front
        }}
        onClick={onPageClick}
    >
        <div style={{ padding: '2rem 2rem 3rem 2rem', height: '100%', overflowY: 'auto' }}>
            {children}
            <div style={{ position: 'absolute', bottom: '1rem', right: '1.5rem', fontSize: '0.8rem', opacity: 0.5 }}>
                {pageNum}
            </div>
        </div>
    </motion.div>
);

const StoryBook = ({ isOpen, onClose }) => {
    const [currentPage, setCurrentPage] = useState(0); // 0 = Cover
    const totalPages = content.story.length;

    if (!isOpen) return null;

    const handleNext = (e) => {
        e.stopPropagation();
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.8)',
                zIndex: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1500px'
            }}
        >
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    background: 'white',
                    borderRadius: '50%',
                    padding: '0.5rem',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <X size={24} />
            </button>

            {/* Book Container */}
            <div style={{
                width: '400px', // Page width
                height: '600px',
                position: 'relative',
                transformStyle: 'preserve-3d',
            }}>

                {/* Back Cover / Static Base */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: '#fff',
                    borderRadius: '0 10px 10px 0',
                    boxShadow: '10px 10px 30px rgba(0,0,0,0.3)',
                    zIndex: 0
                }}>
                    {/* Static navigation if book is open */}
                    <div style={{
                        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#ccc'
                    }}>
                        <p>End of Story</p>
                    </div>
                </div>

                {/* Pages */}
                {/* Reverse map so lower indices are on top when closed */}
                {[...content.story].reverse().map((chapter, index) => {
                    // Calculate actual index
                    const realIndex = content.story.length - 1 - index;

                    // Logic:
                    // If current page > realIndex, this page is flipped (rotate -180)
                    // If current page <= realIndex, this page is visible (rotate 0)
                    const isFlipped = currentPage > realIndex;

                    // Dynamic Z-Index Calculation
                    let zIndex;
                    if (!isFlipped) {
                        // Right side (Not flipped): Stack normally. 
                        // Page 0 (Top) has highest Z. Page N (Bottom) has lowest Z.
                        zIndex = content.story.length - realIndex;
                    } else {
                        // Left side (Flipped): Reverse stack.
                        // The page that was JUST flipped (highest realIndex among flipped) should be on top.
                        zIndex = realIndex;
                    }

                    return (
                        <Page
                            key={realIndex}
                            pageNum={realIndex + 1}
                            zIndex={zIndex}
                            rotateY={isFlipped ? -180 : 0}
                            onPageClick={handleNext}
                        >
                            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem', fontWeight: '900', color: '#000' }}>
                                {chapter.title}
                            </h3>
                            <p style={{
                                whiteSpace: 'pre-wrap',
                                fontSize: '0.95rem',
                                lineHeight: '1.7',
                                textAlign: 'justify',
                                fontWeight: '700',
                                color: '#333'
                            }}>
                                {chapter.text}
                            </p>
                        </Page>
                    );
                })}

                {/* Cover Page (Index -1 logic or separate?) */}
                {/* Let's treat "Prologue" as Page 1 for simplicity. */}
                {/* We can add a Hard Cover later if needed. */}

                {/* Controls */}
                <div style={{
                    position: 'absolute',
                    bottom: '-60px',
                    width: '200%', // Span both sides if we have 2-page view, but here single view is simpler
                    left: '-50%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem'
                }}>
                    <button onClick={handlePrev} style={{ background: '#fff', padding: '1rem', borderRadius: '50%', border: 'none', cursor: 'pointer' }}><ChevronLeft /></button>
                    <button onClick={handleNext} style={{ background: '#fff', padding: '1rem', borderRadius: '50%', border: 'none', cursor: 'pointer' }}><ChevronRight /></button>
                </div>

            </div>

        </motion.div>
    );
};

export default StoryBook;
