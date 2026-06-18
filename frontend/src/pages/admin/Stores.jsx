import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAllStores } from "../../services/admin.service";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const data = await getAllStores();

      setStores(data.stores);
    } catch (error) {
      console.log("Store Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSort = (field) => {
    const sortedStores = [...stores].sort((a, b) => {
      const valueA = a[field]?.toLowerCase();
      const valueB = b[field]?.toLowerCase();

      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      }

      return valueB.localeCompare(valueA);
    });

    setStores(sortedStores);

    setSortOrder(
      sortOrder === "asc"
        ? "desc"
        : "asc"
    );
  };
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Stores
        </h1>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
          Total: {stores.length}
        </span>
      </div>

      {loading ? (
        <p>Loading stores...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th
                  onClick={() => handleSort("storeName")}
                  className="text-left p-3 cursor-pointer"
                >
                  Store Name ↕
                </th>
                <th className="text-left p-3">
                  Email
                </th>
                <th className="text-left p-3">Address</th>
                <th className="text-left p-3">Owner</th>
                <th className="text-left p-3">Rating</th>
              </tr>
            </thead>

            <tbody>
              {stores.map((store) => (
                <tr key={store.id} className="border-t">
                  <td className="p-3">
                    {store.storeName}
                  </td>

                  <td className="p-3">
                    {store.email}
                  </td>

                  <td className="p-3">
                    {store.address}
                  </td>

                  <td className="p-3">
                    {store.ownerName}
                  </td>

                  <td className="p-3">
                    {store.averageRating || "No Ratings"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Stores;