"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd"; // Using Ant Design Table for easy display

const AnalyticsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("/api/analytics");
        setData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchAnalytics();
  }, []);

  const columns = [
    {
      title: "Link Text (URL)",
      dataIndex: "url", // Field name for the URL
      key: "url",
      className: "text-left", // Tailwind class for text alignment
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      className: "text-center", // Center-align the count
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      className: "text-center", // Center-align the slug
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 min-h-screen flex flex-col items-center justify-start p-4">
      <h1 className="text-4xl font-extrabold text-white mb-6">Analytics</h1>

      {loading ? (
        <div className="flex justify-center items-center h-32 w-full">
          <span className="text-xl text-white">Loading data...</span>
        </div>
      ) : (
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
          <Table
            columns={columns}
            dataSource={data}
            rowKey="_id"
            pagination={{ pageSize: 10 }} // Enable pagination with a page size of 10
            className="bg-gray-50 rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
