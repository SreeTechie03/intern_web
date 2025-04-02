import React, { useState } from 'react';

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is SmartED Innovations?",
      answer: "SmartED Innovations is a technology-focused company specializing in creating cutting-edge solutions in education, automation, and AI-driven technologies."
    },
    {
      question: "What services does SmartED Innovations offer?",
      answer: "SmartED Innovations offers services like AI-based tools, automation solutions, data analytics, and custom software development tailored to business needs."
    },
    {
      question: "How can I get in touch with SmartED Innovations for a consultation?",
      answer: "You can contact us via the 'Contact Us' page on our website or reach out to us via email at support@smartedinnovations.com."
    },
    {
      question: "Do you offer training programs for new technologies?",
      answer: "Yes, we offer various training programs focused on emerging technologies such as AI, machine learning, automation, and more."
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <div
              className="cursor-pointer text-xl font-medium text-gray-700 mb-2 hover:text-blue-600"
              onClick={() => toggleFaq(index)}
            >
              {faq.question}
            </div>
            {activeIndex === index && (
              <div className="text-gray-600 mt-2">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
