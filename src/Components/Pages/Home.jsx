import React, { useState } from 'react';

function Home() {
  const [showCourses, setShowCourses] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleExploreCourses = () => {
    setShowCourses(!showCourses);
  };

  const featuredCourses = [
    { id: 1, title: "AI Fundamentals", duration: "6 weeks", level: "Beginner" },
    { id: 2, title: "Web Development", duration: "8 weeks", level: "Intermediate" },
    { id: 3, title: "Data Science", duration: "10 weeks", level: "Advanced" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center flex-grow p-6 md:p-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800">
            Welcome to SmartEd Innovations 🚀
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-600 leading-relaxed">
            Revolutionizing education with cutting-edge technology. Helping students achieve their dreams, 
            <span className="block md:inline"> as long as their internet connection agrees.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button 
              onClick={handleExploreCourses}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                hovered 
                  ? 'bg-indigo-700 text-white shadow-lg transform -translate-y-1' 
                  : 'bg-indigo-600 text-white shadow-md'
              }`}
            >
              {showCourses ? 'Hide Courses' : 'Explore Courses'}
            </button>
            
            <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors duration-300">
              Meet Our Instructors
            </button>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center flex-wrap gap-6 mb-12">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center min-w-[120px]">
              <div className="text-2xl font-bold text-indigo-700">10K+</div>
              <div className="text-gray-500">Students</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center min-w-[120px]">
              <div className="text-2xl font-bold text-indigo-700">50+</div>
              <div className="text-gray-500">Courses</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center min-w-[120px]">
              <div className="text-2xl font-bold text-indigo-700">98%</div>
              <div className="text-gray-500">Satisfaction</div>
            </div>
          </div>
        </div>
        
        {/* Courses Section */}
        {showCourses && (
          <div className="w-full max-w-4xl mt-8 animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCourses.map(course => (
                <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{course.title}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between text-sm text-gray-500 mb-3">
                      <span>⏱️ {course.duration}</span>
                      <span>📊 {course.level}</span>
                    </div>
                    <button className="w-full py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      
      {/* Wave Divider */}
      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-current text-white w-full h-16">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </div>
  );
}

export default Home;