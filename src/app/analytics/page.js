// app/analytics/page.js
"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";  // Using Ant Design Table for easy display

const AnalyticsPage = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("/api/analytics");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  const columns = [
    {
      title: "Link Text (URL)",
      dataIndex: "url", // Field name for the URL
      key: "url",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    }
  ];

  return (
    <div>
      <h1>Analytics</h1>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id" 
        pagination={false}
      />
    </div>
  );
};

export default AnalyticsPage;
