"use client"
import { useEffect, useState } from "react";

const AnalyticsPage = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Analytics Dashboard</h1>
      <div className="overflow-x-auto w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Link Text (URL)</th>
              <th className="px-6 py-3 text-left font-medium">Count</th>
              <th className="px-6 py-3 text-left font-medium">Slug</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{item.url}</td>
                <td className="px-6 py-4 text-gray-700">{item.count}</td>
                <td className="px-6 py-4 text-gray-700">{item.slug}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsPage;
