import { useState, useEffect } from 'react';
import React from "react";
import { format } from 'date-fns';
import { IndianRupee, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const API_KEY = import.meta.env.VITE_API_KEY;
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

const ITEMS_PER_PAGE = 10;

function PaymentHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      const response = await fetch(`/api/payments?count=${ITEMS_PER_PAGE}&skip=${skip}&expand[]=card`, {
        headers: {
          'Authorization': `Basic ${btoa(`${API_KEY}:${AUTH_TOKEN}`)}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setTransactions(data.items || []);
      setTotalCount(data.count || 0);
      setHasMore(data.items && data.items.length === ITEMS_PER_PAGE);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment History</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <AlertCircle className="w-6 h-6 inline-block mr-2" />
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Transaction ID</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{format(new Date(transaction.created_at * 1000), 'PPP')}</td>
                    <td className="px-6 py-4 font-medium">{transaction.id}</td>
                    <td className="px-6 py-4 flex items-center">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      {(transaction.amount / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === 'captured' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
              <ChevronLeft className="w-4 h-4 inline-block" /> Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={!hasMore}
              className={`px-4 py-2 rounded-md ${!hasMore ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
              Next <ChevronRight className="w-4 h-4 inline-block" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PaymentHistory;
