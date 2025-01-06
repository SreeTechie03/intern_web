import React, { useState } from "react";

function Attendance() {
  // Sample list of students
  const studentsList = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alex Johnson" },
    { id: 4, name: "Emily Davis" },
    { id: 5, name: "Michael Brown" },
  ];

  // State to store attendance data (attendance for each student)
  const [attendanceData, setAttendanceData] = useState(
    studentsList.reduce((acc, student) => {
      acc[student.id] = "present"; // default all students to "present"
      return acc;
    }, {})
  );

  const handleAttendanceChange = (id, status) => {
    // Update attendance data based on student ID and new status
    setAttendanceData((prevData) => ({
      ...prevData,
      [id]: status,
    }));
  };

  const submitAttendance = () => {
    // Here, you can handle the attendance submission (e.g., save to a database or API)
    console.log("Attendance data submitted:", attendanceData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Attendance</h2>
      
      <div className="space-y-4">
        {/* Loop through the list of students and render attendance options */}
        {studentsList.map((student) => (
          <div key={student.id} className="flex justify-between items-center border-b pb-4">
            <span className="text-lg font-semibold">{student.name}</span>
            
            {/* Dropdown to select attendance status */}
            <select
              value={attendanceData[student.id]}
              onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
              className="border p-2 rounded"
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </div>
        ))}
      </div>

      {/* Button to submit attendance */}
      <div className="mt-6">
        <button
          onClick={submitAttendance}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
}

export default Attendance;
