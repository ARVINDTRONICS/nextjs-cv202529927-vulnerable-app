"use client";
import React, { useState, useEffect } from "react";
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as DollarSignIcon,
  TrendingUp,
  TrendingDown,
  Assessment as ActivityIcon,
  BarChart as BarChartIcon,
  Inventory as PackageIcon,
} from "@mui/icons-material";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("/api/admin-data");
    const data = await response.json();
    setDashboardData(data.data);
  };

  const StatCard = ({ icon, title, value, change, positive }) => (
    <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{title}</p>
          <div className="flex items-center justify-end space-x-2">
            <h3 className="text-2xl font-bold">{value}</h3>
            {change && (
              <span className={`flex items-center text-sm ${positive ? "text-green-500" : "text-red-500"}`}>
                {positive ? <TrendingUp /> : <TrendingDown />}
                {change}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (dashboardData && Object.keys(dashboardData).length > 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-5 border-b text-center">
            <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
          </div>
          <nav className="p-4">
            {[
              { icon: <DashboardIcon />, name: "Dashboard", tab: "dashboard" },
              { icon: <UsersIcon />, name: "Users", tab: "users" },
              { icon: <ShoppingCartIcon />, name: "Orders", tab: "orders" },
              { icon: <PackageIcon />, name: "Products", tab: "products" },
            ].map((item) => (
              <button key={item.tab} onClick={() => setActiveTab(item.tab)} className={`w-full flex items-center space-x-3 p-3 rounded hover:bg-blue-50 ${activeTab === item.tab ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}>
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <div className="grid grid-cols-4 gap-5 mb-8">
            <StatCard icon={<UsersIcon className="text-blue-600" />} title="Total Users" value={dashboardData.totalUsers.toLocaleString()} change={12.5} positive />
            <StatCard icon={<DollarSignIcon className="text-green-600" />} title="Total Revenue" value={`$${dashboardData.totalRevenue.toLocaleString()}`} change={8.2} positive />
            <StatCard icon={<ShoppingCartIcon className="text-purple-600" />} title="New Orders" value={dashboardData.newOrders} change={5.7} positive />
            <StatCard icon={<ActivityIcon className="text-red-600" />} title="Pending Orders" value="127" change={3.1} positive={false} />
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-blue-600">{order.id}</td>
                    <td className="p-3">{order.customer}</td>
                    <td className="p-3">${order.amount.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          order.status === "Completed" ? "bg-green-100 text-green-800" : order.status === "Processing" ? "bg-yellow-100 text-yellow-800" : order.status === "Shipped" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Products */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Top Products</h2>
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Total Sales</th>
                  <th className="p-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.topProducts.map((product) => (
                  <tr key={product.name} className="border-b hover:bg-gray-50">
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.sales}</td>
                    <td className="p-3">${product.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
}
