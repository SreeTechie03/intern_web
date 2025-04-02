import React from 'react';
import { Rocket, ShieldCheck, BarChart2, Users, Star, Award } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Rocket className="w-8 h-8 text-blue-500" />,
      title: "Fast Performance",
      description: "Lightning-fast loading times and smooth interactions for optimal user experience."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
      title: "Secure Platform",
      description: "Enterprise-grade security to keep your data protected at all times."
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-purple-500" />,
      title: "Data Insights",
      description: "Powerful analytics to help you understand and grow your business."
    }
  ];

  const testimonials = [
    {
      quote: "This platform transformed our workflow completely. Highly recommended!",
      author: "Sarah Johnson",
      role: "Marketing Director",
      rating: 5
    },
    {
      quote: "The best solution we've found after trying multiple alternatives.",
      author: "Michael Chen",
      role: "CTO",
      rating: 4
    },
    {
      quote: "Exceptional customer support and constantly improving features.",
      author: "Emma Rodriguez",
      role: "Product Manager",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Our Platform</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            The complete solution for your business needs. Simple, powerful, and ready to use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/10 backdrop-blur-sm"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed in one integrated platform
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2 flex items-center justify-center">
                <Users className="mr-2" /> 10K+
              </div>
              <p className="text-gray-600">Happy Users</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2 flex items-center justify-center">
                <Star className="mr-2" /> 4.9
              </div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2 flex items-center justify-center">
                <Award className="mr-2" /> 50+
              </div>
              <p className="text-gray-600">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied users
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers using our platform today.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;