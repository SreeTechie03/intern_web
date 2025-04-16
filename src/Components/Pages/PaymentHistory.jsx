import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { IndianRupee, RefreshCw, AlertCircle, ChevronLeft, ChevronRight, CreditCard, Package } from 'lucide-react';

function PaymentHistory() {
  const [activeTab, setActiveTab] = useState('payments');
  const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const razorpayAPI = axios.create({
    baseURL: '/api', // Use the proxy path
    auth: {
      username: import.meta.env.VITE_RAZORPAY_KEY_ID,
      password: import.meta.env.VITE_RAZORPAY_KEY_SECRET
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await razorpayAPI.get('/payments', {
        params: {
          count: 100
        }
      });
      setTransactions(response.data.items);
    } catch (err) {
      setError('Failed to fetch transactions. Please try again later.');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await razorpayAPI.get('/orders', {
        params: {
          count: 100
        }
      });
      setOrders(response.data.items);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'payments') {
      fetchTransactions();
    } else {
      fetchOrders();
    }
  }, [activeTab]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'captured':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
      case 'attempted':
        return 'bg-yellow-100 text-yellow-800';
      case 'created':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Pagination logic
  const currentItems = activeTab === 'payments' ? transactions : orders;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsPage = currentItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertCircle size={48} />
          </div>
          <p className="text-center text-gray-700">{error}</p>
          <button
            onClick={activeTab === 'payments' ? fetchTransactions : fetchOrders}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
          <button
            onClick={activeTab === 'payments' ? fetchTransactions : fetchOrders}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex items-center py-4 px-6 font-medium text-sm ${activeTab === 'payments' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => {
              setActiveTab('payments');
              setCurrentPage(1);
            }}
          >
            <CreditCard className="mr-2" size={16} />
            Payments
          </button>
          <button
            className={`flex items-center py-4 px-6 font-medium text-sm ${activeTab === 'orders' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => {
              setActiveTab('orders');
              setCurrentPage(1);
            }}
          >
            <Package className="mr-2" size={16} />
            Orders
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-center items-center">
              <RefreshCw size={32} className="animate-spin text-blue-500" />
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {activeTab === 'payments' ? (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </>
                      ) : (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItemsPage.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        {activeTab === 'payments' ? (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex items-center gap-1">
                                <IndianRupee size={16} />
                                {(item.amount / 100).toFixed(2)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.email || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.contact || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(item.created_at * 1000), 'PPpp')}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex items-center gap-1">
                                <IndianRupee size={16} />
                                {(item.amount / 100).toFixed(2)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.currency.toUpperCase()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.method || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(item.created_at * 1000), 'PPpp')}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            {currentItems.length > 0 && (
              <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, currentItems.length)}
                    </span>{' '}
                    of <span className="font-medium">{currentItems.length}</span> {activeTab}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === index + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentHistory;