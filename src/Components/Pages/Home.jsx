import React, { useState } from 'react';

function Home() {
  const [showCourses, setShowCourses] = useState(false);

  const handleExploreCourses = () => {
    setShowCourses(!showCourses);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center flex-grow p-4 md:p-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          Welcome to SmartEd Innovations 🎓
        </h1>
        <p className="text-base md:text-lg mb-6 text-center px-4">
          Helping students achieve their dreams, as long as their internet connection agrees.
        </p>
        <button
          onClick={handleExploreCourses}
          className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg text-lg md:text-xl hover:bg-blue-700 transition ease-in-out transform hover:scale-105"
        >
          {showCourses ? 'Hide Courses' : 'Explore Courses'}
        </button>
      </section>

      {/* Courses Section */}
      {showCourses && (
        <section className="bg-white text-gray-900 p-4 md:p-6 rounded-lg shadow-lg mx-2 md:mx-4 my-4 md:my-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Explore Our Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-blue-100 p-4 rounded-lg hover:shadow-xl transition">
              <h3 className="text-lg md:text-xl font-semibold">AI and Machine Learning</h3>
              <p className="text-sm mt-2">Learn how AI is shaping the future of industries.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg hover:shadow-xl transition">
              <h3 className="text-lg md:text-xl font-semibold">Full Stack Web Development</h3>
              <p className="text-sm mt-2">Master front-end and back-end technologies.</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg hover:shadow-xl transition">
              <h3 className="text-lg md:text-xl font-semibold">Data Science</h3>
              <p className="text-sm mt-2">Analyze and interpret data like a pro.</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg hover:shadow-xl transition">
              <h3 className="text-lg md:text-xl font-semibold">Cybersecurity</h3>
              <p className="text-sm mt-2">Protect systems and networks from cyber threats.</p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-3">About SmartEd Innovations</h3>
            <p className="text-sm">
              SmartEd Innovations is dedicated to advancing education through cutting-edge
              technology and accessible learning solutions.
            </p>
            <p className="text-sm mt-4">© 2024 SmartEd Innovations. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.linkedin.com/jobs/smarted-jobs" className="text-sm hover:underline">Job Opportunities</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">Intranet</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/smarted-edu/people/" className="text-sm hover:underline">Media Centre</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">Research Portal</a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-bold mb-3">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/company/smarted-edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="mailto:Sreekar@smarted.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs md:text-sm mt-6 md:mt-8 text-gray-400">
          <p>
            <a href="#" className="hover:underline">Accessibility Statement</a> |{' '}
            <a href="#" className="hover:underline">Privacy Policy</a> |{' '}
            <a href="#" className="hover:underline">Terms of Use</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;