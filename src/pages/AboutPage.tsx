import { MapPin, Camera, Heart, Globe, Calendar, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';

export function AboutPage() {
  const navigate = useNavigate();
  const travelStats = [
    { label: 'Countries Visited', value: '47', icon: Globe },
    { label: 'Continents Explored', value: '6', icon: MapPin },
    { label: 'Photos Captured', value: '10K+', icon: Camera },
    { label: 'Stories Shared', value: '89', icon: Heart }
  ];

  const timeline = [
    {
      year: '2018',
      title: 'The Journey Begins',
      description: 'Started my first solo trip to Rajasthan, India. Fell in love with travel photography and storytelling.',
      image: 'https://images.unsplash.com/photo-1685850749074-9cf8023d7e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHRyYXZlbCUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc1OTg3MzE5Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      year: '2019',
      title: 'Going Global',
      description: 'First international adventure to Southeast Asia. Discovered the beauty of Bali and the energy of Tokyo.',
      image: 'https://images.unsplash.com/photo-1604394089666-6d365c060c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwaW5kb25lc2lhfGVufDF8fHx8MTc1OTg3MzI0MXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      year: '2020',
      title: 'Birth of Bliss Musafir',
      description: 'Launched this blog to share travel stories and inspire others to explore. Started with local destinations during the pandemic.',
      image: 'https://images.unsplash.com/photo-1608661649226-796c26630764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBibG9nZ2VyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU5ODcyNzA0fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      year: '2022',
      title: 'European Adventures',
      description: 'Explored the romantic cities of Europe - from Paris cafes to Swiss Alps, documenting every magical moment.',
      image: 'https://images.unsplash.com/photo-1608587069812-9a452271350c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGFscHMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU5ODczMjQxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      year: '2025',
      title: 'Current Chapter',
      description: 'Continuing to explore hidden gems and share authentic travel experiences with a growing community of fellow wanderers.',
      image: 'https://images.unsplash.com/photo-1596693097925-9d818cc9692d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHNjZW5pYyUyMHZpZXd8ZW58MXx8fHwxNzU5ODczMTk2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen bg-travel-beige">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1650878201492-0c8039ff8ae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NTk4NzMxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="About Bliss Musafir"
          className="w-full h-full min-w-full min-h-full object-cover"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 gradient-overlay"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 text-shadow">Meet the Traveler</h1>
            <p className="text-xl md:text-2xl text-shadow font-light">Behind Bliss Musafir</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1608661649226-796c26630764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBibG9nZ2VyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU5ODcyNzA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Travel Blogger"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute -bottom-2 -right-2 bg-travel-teal text-white p-2 rounded-full">
                <Camera className="h-5 w-5" />
              </div>
            </div>
          </div>
          <h2 className="font-serif text-4xl text-gray-900 mb-6">Hello!</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Welcome to Bliss Musafir, where every journey becomes a story worth telling. I'm a passionate traveler, 
            photographer, and storyteller who believes that the world is a book, and those who don't travel read only one page. 
            Through this blog, I share my adventures, discoveries, and the magic I find in every corner of our beautiful planet.
          </p>
        </div>

        {/* Travel Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {travelStats.map((stat, index) => (
            <Card key={index} className="text-center hover-lift cursor-pointer">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-travel-teal/10 p-3 rounded-full">
                    <stat.icon className="h-6 w-6 text-travel-teal" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-travel-teal mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Travel Philosophy */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16">
          <h2 className="font-serif text-3xl text-center text-gray-900 mb-8">My Travel Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-travel-teal/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-travel-teal" />
              </div>
              <h3 className="font-serif text-xl mb-3">Travel with Purpose</h3>
              <p className="text-gray-600">Every journey should touch your soul and broaden your perspective on life and humanity.</p>
            </div>
            <div className="text-center">
              <div className="bg-travel-gold/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Camera className="h-8 w-8 text-travel-gold" />
              </div>
              <h3 className="font-serif text-xl mb-3">Capture Moments</h3>
              <p className="text-gray-600">Document not just places, but emotions, stories, and the human connections that make travel meaningful.</p>
            </div>
            <div className="text-center">
              <div className="bg-travel-sage/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-travel-sage" />
              </div>
              <h3 className="font-serif text-xl mb-3">Respect & Learn</h3>
              <p className="text-gray-600">Approach every culture with respect, curiosity, and an open mind to truly understand our diverse world.</p>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl text-center text-gray-900 mb-12">My Journey Timeline</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 min-w-full min-h-full object-cover rounded-xl shadow-lg"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <div className="bg-travel-teal text-white px-4 py-2 rounded-full flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {item.year}
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16">
          <h2 className="font-serif text-3xl text-center text-gray-900 mb-8">Achievements & Recognition</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Top Travel Blogger 2024', org: 'Travel Awards India', icon: Award },
              { title: 'Featured Travel Story', org: 'National Geographic', icon: Globe },
              { title: 'Photography Contest Winner', org: 'World Travel Photography', icon: Camera },
              { title: 'Guest Speaker', org: 'Travel Bloggers Conference', icon: Heart },
              { title: '100K Instagram Followers', org: 'Social Media Milestone', icon: MapPin },
              { title: 'Sustainable Travel Advocate', org: 'Green Travel Initiative', icon: Globe }
            ].map((achievement, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-travel-teal/10 p-2 rounded-full">
                  <achievement.icon className="h-5 w-5 text-travel-teal" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="text-center rounded-2xl p-8 md:p-12 shadow-xl border border-travel-teal/20 text-gray-800"
          style={{
            backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #ffffff 100%)',
            backgroundColor: '#ffffff',
          }}
        >
          
          <h2 className="font-serif text-3xl text-travel-teal mb-4">Let's Connect!</h2>
          <p className="text-xl mb-8 text-white-600 max-w-3xl mx-auto">
            Join me on this incredible journey of discovery. Follow along for travel tips, 
            destination guides, and stories that will inspire your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-travel-teal text-white hover:bg-travel-teal-dark"
            >
              Get in Touch
            </Button>
            <Button 
              variant="outline" 
              className="border-travel-teal text-travel-teal hover:bg-travel-teal hover:text-white bg-white"
              onClick={() => window.open('https://www.instagram.com/blissmusafir/', '_blank')}
            >
              Follow on Instagram
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}