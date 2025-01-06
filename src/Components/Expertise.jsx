import React, { useState } from 'react';

function Expertise() {
  const [showDetails, setShowDetails] = useState(null); // State to handle detailed view toggle

  const expertiseList = [
    { id: 1, title: 'Web Development', description: 'Building modern, responsive websites and applications.' },
    { id: 2, title: 'Data Science', description: 'Analyzing and interpreting complex data sets to inform decision-making.' },
    { id: 3, title: 'Cybersecurity', description: 'Protecting systems and networks from cyber threats and vulnerabilities.' },
    { id: 4, title: 'Machine Learning', description: 'Creating algorithms that allow machines to learn from data and make decisions.' },
    { id: 5, title: 'Cloud Computing', description: 'Using remote servers hosted on the internet to store, manage, and process data.' },
  ];

  const handleToggleDetails = (id) => {
    setShowDetails(showDetails === id ? null : id); // Toggle visibility of the detailed view
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Areas of Expertise</h2> {/* Reduced font size for title */}
      <div className="space-y-4">
        {expertiseList.map((expertise) => (
          <div key={expertise.id} className="border-b pb-4">
            <h3
              onClick={() => handleToggleDetails(expertise.id)}
              className="text-lg font-semibold cursor-pointer hover:text-blue-600" // Reduced font size for subtitle
            >
              {expertise.title}
            </h3>
            {showDetails === expertise.id && (
              <p className="mt-2 text-sm text-gray-600"> {/* Reduced font size for description */}
                {expertise.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Expertise;
