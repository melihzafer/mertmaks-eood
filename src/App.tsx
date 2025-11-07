import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { GroceryPage } from './components/GroceryPage';
import { IndustrialPage } from './components/IndustrialPage';
import { ConstructionPage } from './components/ConstructionPage';
import { ContactPage } from './components/ContactPage';
import { SamuilHubPage } from './components/SamuilHubPage';
import { GestureWrapper } from './components/GestureWrapper';
import { AudioToggle } from './components/AudioFeedback';
import { GestureHint } from './components/GestureHint';
import { MobileNavIndicator } from './components/MobileNavIndicator';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <GestureWrapper>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/grocery" element={<GroceryPage />} />
          <Route path="/industrial" element={<IndustrialPage />} />
          <Route path="/construction" element={<ConstructionPage />} />
          <Route path="/about" element={<SamuilHubPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </GestureWrapper>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <AudioToggle />
        <GestureHint />
        <MobileNavIndicator />
      </div>
    </Router>
  );
}
