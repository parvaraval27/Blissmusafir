import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';

export function CategoryHighlight() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* India Category */}
          <div className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
              alt="India travel destination"
              className="w-full h-full min-w-full min-h-full object-cover group-hover:scale-105 transition-transform duration-300"
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-serif mb-3">
                Explore India
              </h3>
              <p className="text-stone-200 mb-4 text-lg">
                From the majestic Himalayas to pristine beaches, discover the incredible diversity of India
              </p>
              <Button 
                onClick={() => navigate('/india')}
                className="bg-travel-gold hover:bg-travel-gold-light text-white border-none rounded-full px-6 py-2"
              >
                Discover India →
              </Button>
            </div>
          </div>

          {/* World Category */}
          <div className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1503221043305-f7498f8b7888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMHRyYXZlbCUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTk4NDA3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="World travel adventure"
              className="w-full h-full min-w-full min-h-full object-cover group-hover:scale-105 transition-transform duration-300"
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-serif mb-3">
                Discover the World
              </h3>
              <p className="text-stone-200 mb-4 text-lg">
                Journey across continents and cultures, uncovering hidden gems and iconic landmarks
              </p>
              <Button 
                className="bg-teal-500 hover:bg-teal-600 text-white border-none rounded-full px-6 py-2"
              >
                Explore World →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}