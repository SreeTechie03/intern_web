import React, { useState, useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceID || !templateID || !publicKey) {
        throw new Error("Missing EmailJS environment variables");
      }

      const result = await emailjs.sendForm(serviceID, templateID, e.target, publicKey);
      alert("Message sent successfully!");
      console.log("EmailJS Success:", result.text);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
    
      
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4 overflow-hidden">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-500 mt-2">We'd love to hear from you!</p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input 
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required 
            />
            <input 
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required 
            />
            <textarea 
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none" 
              name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required 
            />
            <button 
              type="submit" 
              className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg transition ${loading ? 'opacity-50' : 'hover:bg-blue-700'}`} 
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Right: Contact Information */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-semibold">Get in Touch</h3>
          <p className="text-gray-200 mt-2">Feel free to reach out to us!</p>
          <div className="mt-6 space-y-4 w-full flex flex-col items-center">
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6" />
              <span>operations@smarted.pro</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6" />
              <span>+91 7892227891</span>
            </div>
            <div className="flex items-center space-x-3">
              <a href="https://maps.app.goo.gl/mrFH6CaLtY2dp5PD8?g_st=iw" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 cursor-pointer" />
                <span>Bengaluru South, Karnataka</span>
              </a>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-300">We usually respond within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
