import React, { useState } from 'react';

function Support() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([
    {
      id: 'TK-1001',
      title: 'Unable to login',
      type: 'Technical',
      priority: 'High',
      description: 'Facing issues logging into the platform.',
      submittedBy: 'John Doe',
      status: 'Open',
      dateSubmitted: '2025-01-05',
      lastUpdated: '2025-01-06',
      assignedTo: 'Alice',
      messages: [],
    },
    {
      id: 'TK-1002',
      title: 'Feature request: Dark mode',
      type: 'Enhancement',
      priority: 'Low',
      description: 'It would be great to have a dark mode feature.',
      submittedBy: 'Jane Smith',
      status: 'Closed',
      dateSubmitted: '2025-01-03',
      lastUpdated: '2025-01-04',
      assignedTo: 'Bob',
      messages: [],
    },
  ]);

  const [newTicket, setNewTicket] = useState({
    title: '',
    type: '',
    priority: 'Low',
    description: '',
    submittedBy: 'Your Name',
    status: 'Open',
    dateSubmitted: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    assignedTo: '',
    messages: [],
  });

  const handleNewTicketSubmit = () => {
    setTickets([...tickets, { id: `TK-${1000 + tickets.length + 1}`, ...newTicket }]);
    setShowNewTicketForm(false);
    setNewTicket({
      title: '',
      type: '',
      priority: 'Low',
      description: '',
      submittedBy: 'Your Name',
      status: 'Open',
      dateSubmitted: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      assignedTo: '',
      messages: [],
    });
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Support Tickets</h1>
          <button
            onClick={() => setShowNewTicketForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            + New Ticket
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select className="border p-2 rounded-md" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          <select className="border p-2 rounded-md" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="all">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="text"
            placeholder="Search by title or description"
            className="border p-2 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* New Ticket Form */}
        {showNewTicketForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Ticket</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Title" className="border p-2 rounded-md"
                value={newTicket.title}
                onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })} />
              <select className="border p-2 rounded-md" value={newTicket.type}
                onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value })}>
                <option value="">Select Type</option>
                <option value="Technical">Technical</option>
                <option value="Bug">Bug</option>
                <option value="Enhancement">Enhancement</option>
              </select>
              <select className="border p-2 rounded-md" value={newTicket.priority}
                onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input type="text" placeholder="Assigned To" className="border p-2 rounded-md"
                value={newTicket.assignedTo}
                onChange={(e) => setNewTicket({ ...newTicket, assignedTo: e.target.value })} />
              <textarea placeholder="Description" className="col-span-2 border p-2 rounded-md"
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}></textarea>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowNewTicketForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2">Cancel</button>
              <button onClick={handleNewTicketSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md">Submit</button>
            </div>
          </div>
        )}

        {/* Ticket Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <React.Fragment key={ticket.id}>
                    <tr
                      onClick={() => setSelectedTicket(selectedTicket?.id === ticket.id ? null : ticket)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">{ticket.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{ticket.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{ticket.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{ticket.priority}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{ticket.status}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{ticket.lastUpdated}</td>
                    </tr>
                    {selectedTicket?.id === ticket.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="px-6 py-4 text-sm text-gray-700">
                          <p><strong>Description:</strong> {ticket.description}</p>
                          <p><strong>Submitted By:</strong> {ticket.submittedBy}</p>
                          <p><strong>Assigned To:</strong> {ticket.assignedTo}</p>
                          <p><strong>Date Submitted:</strong> {ticket.dateSubmitted}</p>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
