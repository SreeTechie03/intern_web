// src/Components/Students.jsx
import React, { useState } from 'react';

const studentsData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', enrolled: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', enrolled: false },
  { id: 3, name: 'Sam Wilson', email: 'sam@example.com', enrolled: true },
  { id: 4, name: 'Sally Mae', email: 'sally@example.com', enrolled: true },
];

function Students() {
  const [students, setStudents] = useState(studentsData);

  // Function to toggle enrollment status
  const toggleEnrollment = (id) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id ? { ...student, enrolled: !student.enrolled } : student
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Enrollment Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className="border-b">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      student.enrolled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {student.enrolled ? 'Enrolled' : 'Not Enrolled'}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleEnrollment(student.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Toggle Enrollment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
