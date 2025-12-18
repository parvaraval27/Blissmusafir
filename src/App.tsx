import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Router } from './components/Router';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-travel-beige font-sans">
        <Navigation />
        <div className="pt-16"> {/* Add padding for fixed navbar */}
          <Router />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}