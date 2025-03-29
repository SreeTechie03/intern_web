import React, { useState } from 'react';
import { Code2, Database, Shield, Brain, Cloud, ChevronDown, ChevronUp } from 'lucide-react';

function Expertise() {
  const [showDetails, setShowDetails] = useState(null);

  const expertiseList = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Building modern, responsive websites and applications.',
      icon: <Code2 className="w-6 h-6" />,
      skills: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'GraphQL']
    },
    {
      id: 2,
      title: 'Data Science',
      description: 'Analyzing and interpreting complex data sets to inform decision-making.',
      icon: <Database className="w-6 h-6" />,
      skills: ['Python', 'R', 'SQL', 'Tableau', 'Machine Learning']
    },
    {
      id: 3,
      title: 'Cybersecurity',
      description: 'Protecting systems and networks from cyber threats and vulnerabilities.',
      icon: <Shield className="w-6 h-6" />,
      skills: ['Network Security', 'Penetration Testing', 'Risk Assessment', 'Security Auditing']
    },
    {
      id: 4,
      title: 'Machine Learning',
      description: 'Creating algorithms that allow machines to learn from data and make decisions.',
      icon: <Brain className="w-6 h-6" />,
      skills: ['TensorFlow', 'PyTorch', 'Neural Networks', 'Deep Learning', 'NLP']
    },
    {
      id: 5,
      title: 'Cloud Computing',
      description: 'Using remote servers hosted on the internet to store, manage, and process data.',
      icon: <Cloud className="w-6 h-6" />,
      skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Serverless']
    }
  ];

  const handleToggleDetails = (id) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg p-6">
        <h2 className="text-2xl font-bold text-white">Areas of Expertise</h2>
        <p className="text-blue-100 mt-2">Click on each area to learn more about specific skills</p>
      </div>
      
      <div className="bg-white rounded-b-lg shadow-xl">
        {expertiseList.map((expertise) => (
          <div 
            key={expertise.id} 
            className={`border-b last:border-b-0 transition-all duration-200 ${
              showDetails === expertise.id ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <div
              onClick={() => handleToggleDetails(expertise.id)}
              className="flex items-center justify-between p-6 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="text-blue-600">
                  {expertise.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {expertise.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {expertise.description}
                  </p>
                </div>
              </div>
              {showDetails === expertise.id ? 
                <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                <ChevronDown className="w-5 h-5 text-gray-400" />
              }
            </div>
            
            {showDetails === expertise.id && (
              <div className="px-6 pb-6 pt-2">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {expertise.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Expertise;