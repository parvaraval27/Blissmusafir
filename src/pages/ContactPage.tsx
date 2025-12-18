import { Mail, Instagram, Youtube, Linkedin, MapPin, Phone, Send, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Page } from '../components/Router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'blissmusafir@gmail.com',
      description: 'Drop us a line anytime',
      color: 'bg-blue-500'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@blissmusafir',
      description: 'Daily travel inspiration',
      color: 'bg-pink-500',
      link: 'https://www.instagram.com/blissmusafir/'
    },
    {
      icon: Youtube,
      title: 'YouTube',
      value: '@BlissMusafir',
      description: 'Travel vlogs & guides',
      color: 'bg-red-500',
      link: 'https://www.youtube.com/@BlissMusafir'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Bliss Musafir',
      description: 'Professional network',
      color: 'bg-blue-600',
      link: 'https://www.linkedin.com/in/bliss-musafir-35bbb6317'
    }
  ];

  const collaborationTypes = [
    {
      title: 'Travel Blogging',
      description: 'Destination reviews, hotel stays, and travel experiences',
      icon: '✈️'
    },
    {
      title: 'Photography',
      description: 'Travel photography for tourism boards and brands',
      icon: '📸'
    },
    {
      title: 'Brand Partnerships',
      description: 'Authentic collaborations with travel and lifestyle brands',
      icon: '🤝'
    },
    {
      title: 'Speaking Engagements',
      description: 'Travel conferences, workshops, and educational events',
      icon: '🎤'
    }
  ];

  return (
    <div className="min-h-screen bg-travel-beige">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1596693097925-9d818cc9692d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHNjZW5pYyUyMHZpZXd8ZW58MXx8fHwxNzU5ODczMTk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Contact Bliss Musafir"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 text-shadow">Let's Connect</h1>
            <p className="text-xl md:text-2xl text-shadow font-light">Start a conversation about your next adventure</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <h2 className="font-serif text-3xl text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600 text-lg">
                Have a question about a destination? Want to collaborate? Or just want to share your own travel story? 
                We would love to hear from you! Fill out the form below and We'll get back to you within 24 hours.
              </p>
            </div>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input placeholder="Your first name" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input placeholder="Your last name" required />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input type="email" placeholder="your.email@example.com" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input placeholder="What would you like to discuss?" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Tell us about your travel dreams, questions, or collaboration ideas..." 
                      rows={6} 
                      required 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-travel-teal hover:bg-travel-teal-dark text-white py-3"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div>
              <h2 className="font-serif text-3xl text-gray-900 mb-6">Other Ways to Reach Me</h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover-lift cursor-pointer transition-all duration-300" onClick={() => info.link && window.open(info.link, '_blank')}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`${info.color} p-3 rounded-full`}>
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{info.title}</h3>
                          <p className="text-travel-teal font-medium">{info.value}</p>
                          <p className="text-sm text-gray-600">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="font-serif text-3xl text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How can I suggest a destination for you to visit?",
                answer: "We love hearing destination suggestions! Send us an email with details about why you think we should visit, and We'll add it to my ever-growing bucket list."
              },
              {
                question: "Do you offer travel consultation services?",
                answer: "Yes! We offer personalized travel planning services for destinations we've visited. Reach out to discuss your specific needs and budget."
              },
              {
                question: "Can I use your photos for my project?",
                answer: "All photos are copyrighted, but we are open to licensing for appropriate use. Please contact us with details about your project."
              },
              {
                question: "How can I become a guest contributor?",
                answer: "We occasionally feature guest posts from fellow travelers. Send us your story idea and writing samples, and let's discuss!"
              }
            ].map((faq, index) => (
              <div key={index} className="border-l-4 border-travel-teal pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}