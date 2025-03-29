import React, { useState } from "react";
import { Search, Image, Video, FileText, Filter, Plus, X, Download } from "lucide-react";

function MediaLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const mediaItems = [
    { 
      id: 1, 
      type: "image", 
      category: "branding",
      title: "SmartEd Logo",
      url: "https://example.com/logo.png",
      date: "2024-01-01",
      size: "1.5 MB"
    },
    { 
      id: 2, 
      type: "video", 
      category: "promotional",
      title: "SmartEd Introduction Video",
      url: "https://example.com/intro.mp4",
      date: "2024-01-02",
      size: "20.3 MB"
    },
    { 
      id: 3, 
      type: "document", 
      category: "brand-guidelines",
      title: "SmartEd Brand Guidelines",
      url: "https://example.com/brand-guidelines.pdf",
      date: "2024-01-03",
      size: "3.1 MB"
    },
    { 
      id: 4, 
      type: "image", 
      category: "team",
      title: "Team SmartEd",
      url: "https://example.com/team.jpg",
      date: "2024-01-04",
      size: "2.4 MB"
    },
    { 
      id: 5, 
      type: "video", 
      category: "tutorials",
      title: "SmartEd Tutorial - Getting Started",
      url: "https://example.com/tutorial.mp4",
      date: "2024-01-05",
      size: "25.7 MB"
    },
    { 
      id: 6, 
      type: "document", 
      category: "press-releases",
      title: "SmartEd Launch Press Release",
      url: "https://example.com/press-release.pdf",
      date: "2024-01-06",
      size: "1.0 MB"
    },
    { 
      id: 7, 
      type: "image", 
      category: "marketing-materials",
      title: "SmartEd Flyer",
      url: "https://example.com/flyer.png",
      date: "2024-01-07",
      size: "2.0 MB"
    },
  ];

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "image": return <Image className="w-5 h-5" />;
      case "video": return <Video className="w-5 h-5" />;
      case "document": return <FileText className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">SmartEd Media Library</h2>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Upload New
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="document">Documents</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="aspect-video bg-gray-100 relative">
                {item.type === "image" && (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {item.type === "video" && (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <Video className="w-12 h-12 text-white opacity-60" />
                  </div>
                )}
                {item.type === "document" && (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{item.date}</span>
                  <span>{item.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No media items found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Upload Media</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Plus className="w-8 h-8 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-2">Drag and drop files here</p>
              <p className="text-sm text-gray-500 mb-4">or</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Browse Files
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaLibrary;
