import { Instagram, Youtube, Linkedin, MapPin, Mail, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Footer() {
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
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-teal-100 focus:border-white"
            />
            <Button 
              className="bg-white text-teal-600 hover:bg-stone-100 font-medium px-8"
            >
              Subscribe
            </Button>
          </div>
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
              <li><a href="#" className="text-stone-300 hover:text-white transition-colors duration-200">Latest Stories</a></li>
              <li><a href="#" className="text-stone-300 hover:text-white transition-colors duration-200">India Adventures</a></li>
              <li><a href="#" className="text-stone-300 hover:text-white transition-colors duration-200">World Travels</a></li>
              <li><a href="#" className="text-stone-300 hover:text-white transition-colors duration-200">Travel Tips</a></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-stone-300 hover:text-white transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="text-stone-300 hover:text-white transition-colors duration-200">Collaborate</a></li>
              <li><a href="#" className="text-stone-300 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
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