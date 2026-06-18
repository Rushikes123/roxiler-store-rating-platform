import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  createStore,
  getAllUsers,
} from "../../services/admin.service";

const CreateStore = () => {
  const [owners, setOwners] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadOwners();
  }, []);

  const loadOwners = async () => {
    try {
      const data = await getAllUsers();

      const storeOwners = data.users.filter(
        (user) => user.role === "STORE_OWNER"
      );

      setOwners(storeOwners);

      if (storeOwners.length > 0) {
        setFormData((prev) => ({
          ...prev,
          owner_id: storeOwners[0].id,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createStore(formData);

      setMessage(data.message);

      setFormData({
        name: "",
        email: "",
        address: "",
        owner_id:
          owners.length > 0
            ? owners[0].id
            : "",
      });
    } catch (error) {
      console.log(error);
      setMessage("Failed to create store");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">
          Create Store
        </h1>

        {message && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Store Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Store Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Store Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <select
            name="owner_id"
            value={formData.owner_id}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          >
            {owners.map((owner) => (
              <option
                key={owner.id}
                value={owner.id}
              >
                {owner.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Create Store
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateStore;