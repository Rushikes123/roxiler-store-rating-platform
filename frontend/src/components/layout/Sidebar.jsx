import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">
        Menu
      </h2>

      <div className="flex flex-col gap-2">

        {/* Admin Menu */}
        {user?.role === "ADMIN" && (
          <>
            <Link
              to="/admin/dashboard"
              className="px-3 py-2 rounded hover:bg-gray-700"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/users"
              className="px-3 py-2 rounded hover:bg-gray-700"
            >
              Users
            </Link>

            <Link
              to="/admin/create-user"
              className="px-3 py-2 rounded hover:bg-gray-700"
            >
              Create User
            </Link>

            <Link
              to="/admin/stores"
              className="px-3 py-2 rounded hover:bg-gray-700"
            >
              Stores
            </Link>

            <Link
              to="/admin/create-store"
              className="px-3 py-2 rounded hover:bg-gray-700"
            >
              Create Store
            </Link>
          </>
        )}

        {/* User Menu */}
        {user?.role === "USER" && (
          <>
            <Link
              to="/stores"
              className="px-3 py-2 rounded hover:bg-gray-700"
            >
              Stores
            </Link>
          </>
        )}

        {/* Store Owner Menu */}
        {user?.role === "STORE_OWNER" && (
          <Link
            to="/owner/dashboard"
            className="px-3 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
        )}

      </div>
    </aside>
  );
};

export default Sidebar;