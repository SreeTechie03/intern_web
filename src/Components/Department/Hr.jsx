import React from 'react';

const Hr = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">HR Department</h1>
        <p className="text-gray-600 mt-2">Manage employee records, recruitment, and other HR-related tasks.</p>
      </header>

      {/* Employee Management Section */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Employee Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
            Add Employee
          </button>
          <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
            View Employees
          </button>
          <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition">
            Manage Leaves
          </button>
        </div>
      </section>

      {/* Recruitment Section */}
      <section className="mt-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recruitment</h2>
        <p className="text-gray-600">Manage job postings, applications, and interviews.</p>
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          Post a Job
        </button>
      </section>
    </div>
  );
};

export default Hr;
