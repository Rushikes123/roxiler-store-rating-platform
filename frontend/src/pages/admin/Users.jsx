import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getAllUsers,
  searchUsers,
} from "../../services/admin.service";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.users);
    } catch (error) {
      console.log("Users Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!keyword.trim()) {
      fetchUsers();
      return;
    }

    try {
      const data = await searchUsers(keyword);
      setUsers(data.users);
    } catch (error) {
      console.log("Search Error:", error);
    }
  };
  const handleSort = (field) => {
    const sortedUsers = [...users].sort((a, b) => {
      const valueA = a[field]?.toLowerCase();
      const valueB = b[field]?.toLowerCase();

      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      }

      return valueB.localeCompare(valueA);
    });

    setUsers(sortedUsers);

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
          Users
        </h1>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
          Total: {users.length}
        </span>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by name, email or role"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border px-3 py-2 rounded w-80"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>

        <button
          onClick={() => {
            setKeyword("");
            fetchUsers();
          }}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Reset
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th
                  onClick={() => handleSort("name")}
                  className="text-left p-3 cursor-pointer"
                >
                  Name ↕
                </th>

                <th
                  onClick={() => handleSort("email")}
                  className="text-left p-3 cursor-pointer"
                >
                  Email ↕
                </th>

                <th className="text-left p-3">
                  Role
                </th>

                <th className="text-left p-3">
                  Address
                </th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-5"
                  >
                    No Users Found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t"
                  >
                    <td className="p-3">
                      {user.name}
                    </td>

                    <td className="p-3">
                      {user.email}
                    </td>

                    <td className="p-3">
                      {user.role}
                    </td>

                    <td className="p-3">
                      {user.address}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Users;