import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();
      if (result.success) {
        setSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSuccess("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Web3Forms Error:", error);
      setSuccess("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4 overflow-hidden">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-500 mt-2">We'd love to hear from you!</p>
          {success && <p className="text-green-600 mt-2">{success}</p>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <input className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            <textarea className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none" 
              name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
            <button type="submit" 
              className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg transition ${loading ? 'opacity-50' : 'hover:bg-blue-700'}`} 
              disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

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
