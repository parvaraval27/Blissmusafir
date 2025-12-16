import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1608661649226-796c26630764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBibG9nZ2VyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU5ODcyNzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Travel blogger portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-teal-600 text-2xl">✈️</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-serif text-stone-800 mb-6">
              Join Our Travel Community
            </h2>
            
            <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
              <p>
                Welcome to <span className="text-teal-600 font-medium">Bliss Musafir</span> – 
                a vibrant community of passionate travelers, photographers, and storytellers from around the world. 
                We believe that every journey holds a story worth sharing, and every traveler has a unique 
                perspective that can inspire others.
              </p>
              
              <p>
                Our diverse team of travel writers and contributors come from different backgrounds, cultures, 
                and corners of the globe. From solo backpackers exploring hidden gems to family adventurers 
                discovering kid-friendly destinations, from food enthusiasts savoring local cuisines to 
                photographers capturing breathtaking landscapes – we celebrate all forms of travel.
              </p>
              
              <p>
                <span className="text-teal-600 font-medium">Become a Contributor:</span> Are you passionate about travel and have stories to share? 
                We're always looking for talented writers, photographers, and content creators to join our community. 
                Share your adventures, cultural insights, travel tips, and authentic experiences with fellow wanderers 
                around the world.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-stone-600">🌍 50+ Contributors</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-stone-600">📖 300+ Stories</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-stone-600">📸 15k+ Photos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}