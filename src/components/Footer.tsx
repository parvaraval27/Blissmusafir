import { useState } from 'react';
import { Instagram, Youtube, Linkedin, MapPin, Mail, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';
import { apiClient } from '../lib/api';

export function Footer() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      await apiClient.subscribeToNewsletter(email);
      setStatusMessage('Thanks for joining the journey.');
      setEmail('');
    } catch (error) {
      setStatusMessage('Subscription failed. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-stone-800 text-white">
      {/* Newsletter Section */}
      <div className="bg-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h3 className="text-2xl font-serif mb-4">
            Join the Journey
          </h3>
          <p className="text-teal-100 mb-6 text-lg">
            Get travel stories, destination guides, and wanderlust inspiration delivered to your inbox
          </p>
          
          <form onSubmit={handleSubscribe} className="space-y-3 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                type="email" 
                placeholder="Your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-teal-100 focus:border-white"
                required
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-teal-600 hover:bg-stone-100 font-medium px-8"
              >
                {isSubmitting ? 'Joining...' : 'Subscribe'}
              </Button>
            </div>
            {statusMessage && <p className="text-teal-50 text-sm">{statusMessage}</p>}
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-serif text-white mb-4">
              Bliss Musafir
            </h3>
            <p className="text-stone-300 text-lg mb-6 max-w-md">
              Sharing stories of wanderlust, cultural discoveries, and the beauty 
              of our world, one journey at a time.
            </p>
            
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-stone-300 hover:text-white hover:bg-stone-700" onClick={() => window.open('https://www.instagram.com/blissmusafir/', '_blank')}>
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-stone-300 hover:text-white hover:bg-stone-700" onClick={() => window.open('https://www.youtube.com/@BlissMusafir', '_blank')}>
                <Youtube className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-stone-300 hover:text-white hover:bg-stone-700" onClick={() => window.open('https://www.linkedin.com/in/bliss-musafir-35bbb6317', '_blank')}>
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-stone-300 hover:text-white hover:bg-stone-700" onClick={() => window.open('mailto:blissmusafir@gmail.com', '_blank')}>
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-stone-300 hover:text-white transition-colors duration-200">Latest Stories</Link></li>
              <li><Link to="/india" className="text-stone-300 hover:text-white transition-colors duration-200">India Adventures</Link></li>
              <li><Link to="/world" className="text-stone-300 hover:text-white transition-colors duration-200">World Travels</Link></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-stone-300 hover:text-white transition-colors duration-200">Contact</Link></li>
              <li><Link to="/about" className="text-stone-300 hover:text-white transition-colors duration-200">About</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-700 mt-12 pt-8 text-center">
          <p className="text-stone-400 flex items-center justify-center gap-2">
            © 2025 Bliss Musafir | Made with <Heart className="h-4 w-4 text-red-500 fill-current" /> for travelers
          </p>
        </div>
      </div>
    </footer>
  );
}