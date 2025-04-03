import React, { useState } from 'react';
import { Lightbulb, Target, Trophy, Rocket, Mail, Linkedin, Github, ChevronDown, Menu, X } from 'lucide-react';

function LandingPage({ onLoginClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsContactOpen(false);
  };

  // Contact Form Modal Component
  const ContactFormModal = () => {
    if (!isContactOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsContactOpen(false)}></div>
        <div className="relative bg-slate-800 rounded-xl p-8 w-full max-w-md border border-slate-700 shadow-xl">
          <button
            onClick={() => setIsContactOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows="4"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <img src="/Favicon.jpeg" alt="SmartEd Innovations" className="h-9 w-9"/>
              <a href="/" className="text-white font-bold text-xl tracking-tight">
                SmartED <span className="text-blue-400">Innovations</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-1">
                <span>About</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">
                Features
              </a>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Contact
              </button>
              <button
                onClick={onLoginClick}
                className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300 cursor-pointer"
              >
                Sign in
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <a 
                  href="#about" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="#features" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <button
                  onClick={() => {
                    setIsContactOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Contact
                </button>
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 text-center rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300 cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Contact Form Modal */}
      <ContactFormModal />

      {/* Rest of the sections remain unchanged */}
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
            Welcome to SmartED Innovations
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Transforming education through cutting-edge technology and innovative learning solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={onLoginClick}
              className="px-8 py-4 bg-blue-500 text-white rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 cursor-pointer"
            >
              Get Started
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-blue-400 text-blue-400 rounded-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Why Choose SmartED?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { Icon: Lightbulb, title: "Innovative Learning", bgColor: "bg-blue-500/20", textColor: "text-blue-400" },
              { Icon: Target, title: "Personalized Path", bgColor: "bg-purple-500/20", textColor: "text-purple-400" },
              { Icon: Trophy, title: "Industry Recognition", bgColor: "bg-pink-500/20", textColor: "text-pink-400" },
              { Icon: Rocket, title: "Fast-Track Growth", bgColor: "bg-orange-500/20", textColor: "text-orange-400" }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur rounded-xl p-6 transform hover:-translate-y-2 transition-all duration-300 border border-slate-700/50 hover:border-slate-600 cursor-pointer">
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.Icon className={`w-6 h-6 ${feature.textColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">Experience world-class education with our cutting-edge platform and expert instructors.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About SmartED Innovations</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  We're revolutionizing education by combining cutting-edge technology with proven learning methodologies. Our platform adapts to each student's unique learning style, ensuring optimal results.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/80?img=${i}`}
                        alt={`Team member ${i}`}
                        className="w-10 h-10 rounded-full border-2 border-slate-800"
                      />
                    ))}
                  </div>
                  <span className="text-gray-400">Join our growing community</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "15K+", label: "Students" },
                  { number: "95%", label: "Success Rate" },
                  { number: "200+", label: "Courses" },
                  { number: "50+", label: "Countries" }
                ].map((stat, index) => (
                  <div key={index} className="bg-slate-700/30 rounded-lg p-6 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-2">{stat.number}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-lg border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src="/Favicon.jpeg" alt="SmartEd Innovations" className="h-9 w-9"/>
                <span className="text-white font-bold">SmartED Innovations</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transforming education through innovation and technology.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/company/smarted-edu/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/YOUR_GITHUB_PROFILE" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:contact@smarted.edu" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} SmartEd Innovations. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;