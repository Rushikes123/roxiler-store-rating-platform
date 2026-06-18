import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDashboardData } from "../../services/admin.service";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getDashboardData();

      setStats({
        totalUsers: data.totalUsers,
        totalStores: data.totalStores,
        totalRatings: data.totalRatings,
      });
    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm">
            Total Users
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm">
            Total Stores
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.totalStores}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm">
            Total Ratings
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.totalRatings}
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;