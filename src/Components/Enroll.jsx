// src/Components/Enroll.jsx
import React, { useState } from 'react';

function Enroll() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to a backend.
    setMessage(`Enrollment Successful! Welcome, ${name}.`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Enroll in a Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold" htmlFor="name">
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold" htmlFor="email">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold" htmlFor="course">
            Select Course:
          </label>
          <select
            id="course"
            name="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">--Select a Course--</option>
            <option value="AI and Machine Learning">AI and Machine Learning</option>
            <option value="Full Stack Web Development">Full Stack Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Enroll Now
        </button>
      </form>

      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
          {message}
        </div>
      )}
    </div>
  );
}

export default Enroll;
