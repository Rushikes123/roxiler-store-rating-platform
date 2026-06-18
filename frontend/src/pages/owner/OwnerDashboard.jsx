import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getOwnerDashboard } from "../../services/storeOwner.service";

const OwnerDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getOwnerDashboard();
      setData(response);
    } catch (error) {
      console.log("Dashboard Error:", error);
    }
  };

  if (!data) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Store Owner Dashboard
      </h1>

      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <h2 className="text-xl font-semibold">
          {data.store.name}
        </h2>

        <p className="mt-3">
          Average Rating:{" "}
          <span className="font-medium">
            {data.store.averageRating || "No Ratings"}
          </span>
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-xl font-semibold mb-4">
          Users Ratings
        </h2>

        {data.ratings.length === 0 ? (
          <p>No Ratings Yet</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">
                  User Name
                </th>

                <th className="text-left p-3">
                  Rating
                </th>
              </tr>
            </thead>

            <tbody>
              {data.ratings.map((rating, index) => (
                <tr
                  key={index}
                  className="border-b"
                >
                  <td className="p-3">
                    {rating.userName}
                  </td>

                  <td className="p-3">
                    {rating.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OwnerDashboard;