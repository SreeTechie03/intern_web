import React, { useState } from "react";

function MediaLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaItems, setMediaItems] = useState([
    { id: 1, type: "image", title: "Sunset", url: "https://example.com/sunset.jpg" },
    { id: 2, type: "video", title: "Nature Documentary", url: "https://example.com/nature.mp4" },
    { id: 3, type: "document", title: "Project Plan", url: "https://example.com/plan.pdf" },
    { id: 4, type: "image", title: "Mountain", url: "https://example.com/mountain.jpg" },
    { id: 5, type: "video", title: "Ocean Waves", url: "https://example.com/ocean.mp4" },
  ]);

  // Filter media items based on the search query
  const filteredItems = mediaItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 font-sans">
      <h2 className="text-center text-3xl text-gray-800 mb-6">Welcome to Your Media Library!</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search media..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 text-lg w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md hover:transform hover:translate-y-2 transition-all duration-300">
              <h3 className="text-xl text-center mb-3">{item.title}</h3>
              {item.type === "image" && (
                <img src={item.url} alt={item.title} className="max-w-full rounded-lg"/>
              )}
              {item.type === "video" && (
                <video controls className="max-w-full rounded-lg">
                  <source src={item.url} type="video/mp4" />
                </video>
              )}
              {item.type === "document" && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="block text-center mt-4 text-blue-600 hover:text-blue-800">
                  View Document
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No media items found</p>
        )}
      </div>
    </div>
  );
}

export default MediaLibrary;
