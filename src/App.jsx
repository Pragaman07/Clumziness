import { useState } from 'react';
import HeroSection from './components/HeroSection';
import OriginSection from './components/OriginSection';
import FoodGame from './components/FoodGame';
import Timeline from './components/Timeline';
import LetterVault from './components/LetterVault';
import Facts from './components/Facts';
import MemoryHunt from './components/MemoryHunt';
import DateNight from './components/DateNight';
import { ArrowLeft } from 'lucide-react';

function App() {
  // Views: 'hero' | 'home' | 'vault' | 'hunt' | 'dateNight'
  const [currentView, setCurrentView] = useState('hero');

  const handleStart = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  const handleUnlockReward = () => {
    setCurrentView('vault');
    window.scrollTo(0, 0);
  };

  const handleStartHunt = () => {
    setCurrentView('hunt');
    window.scrollTo(0, 0);
  };

  const handleStartDateNight = () => {
    setCurrentView('dateNight');
    window.scrollTo(0, 0);
  };

  const handleBackHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {/* Universal Back Button for sub-pages (except hero) */}
      {(currentView === 'vault' || currentView === 'dateNight') && (
        <button
          onClick={handleBackHome}
          style={{
            position: 'fixed',
            top: '1rem',
            left: '1rem',
            background: '#fff',
            borderRadius: '50%',
            padding: '0.8rem',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          <ArrowLeft color="#000" size={24} />
        </button>
      )}

      {currentView === 'hero' && (
        <HeroSection onStart={handleStart} />
      )}

      {currentView === 'home' && (
        <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
          <OriginSection />
          <Timeline onUnlockReward={handleUnlockReward} />
          <FoodGame />
          <Facts onStartHunt={handleStartHunt} onStartDateNight={handleStartDateNight} />
        </div>
      )}

      {currentView === 'vault' && (
        <div style={{ minHeight: '100vh' }}>
          <LetterVault />
        </div>
      )}

      {currentView === 'hunt' && (
        <MemoryHunt onBack={handleBackHome} />
      )}

      {currentView === 'dateNight' && (
        <DateNight />
      )}
    </div>
  );
}

export default App;
