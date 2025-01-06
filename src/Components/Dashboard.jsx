import React from 'react';

function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 flex flex-col">
      {/* Header Section */}
      <section className="flex flex-col justify-center items-center flex-grow p-4 md:p-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          Welcome to Your Dashboard 🚀
        </h1>
        <p className="text-base md:text-lg mb-6 text-center px-4">
          Track your progress, analyze performance, and achieve your goals with ease.
        </p>
      </section>

      {/* Analytics Cards Section */}
      <section className="bg-white text-gray-900 p-4 md:p-6 rounded-lg shadow-lg mx-2 md:mx-4 my-4 md:my-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Your Analytics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-blue-100 p-4 rounded-lg hover:shadow-xl transition">
            <h3 className="text-lg md:text-xl font-semibold">Users</h3>
            <p className="text-sm mt-2">1,200 active users</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg hover:shadow-xl transition">
            <h3 className="text-lg md:text-xl font-semibold">Revenue</h3>
            <p className="text-sm mt-2">$10,000 in earnings</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg hover:shadow-xl transition">
            <h3 className="text-lg md:text-xl font-semibold">Sales</h3>
            <p className="text-sm mt-2">300 successful sales</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg hover:shadow-xl transition">
            <h3 className="text-lg md:text-xl font-semibold">Feedback</h3>
            <p className="text-sm mt-2">95% positive feedback</p>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="bg-gray-50 text-gray-900 p-4 md:p-6 rounded-lg shadow-lg mx-2 md:mx-4 my-4 md:my-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Recent Activity</h2>
        <ul className="space-y-4">
          <li className="bg-white p-4 rounded-lg shadow transition hover:shadow-lg">
            <p className="text-sm md:text-base">
              <strong>Course Completed:</strong> AI and Machine Learning
            </p>
            <p className="text-xs text-gray-500">2 days ago</p>
          </li>
          <li className="bg-white p-4 rounded-lg shadow transition hover:shadow-lg">
            <p className="text-sm md:text-base">
              <strong>Feedback Submitted:</strong> Full Stack Web Development
            </p>
            <p className="text-xs text-gray-500">1 week ago</p>
          </li>
          <li className="bg-white p-4 rounded-lg shadow transition hover:shadow-lg">
            <p className="text-sm md:text-base">
              <strong>New Enrollment:</strong> Cybersecurity
            </p>
            <p className="text-xs text-gray-500">3 weeks ago</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
