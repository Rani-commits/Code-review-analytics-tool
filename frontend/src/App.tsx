import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Review from './pages/Review';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-dark text-white selection:bg-primary selection:text-white">
          <LanguageSwitcher />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/review" element={<Review />} />
          </Routes>
          
          {/* Branding */}
          <div className="branding">
            Design by Rani
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
