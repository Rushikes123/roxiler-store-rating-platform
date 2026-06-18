import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { createUser } from "../../services/admin.service";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createUser(formData);

      setMessage(data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      });
    } catch (error) {
      console.log(error);
      setMessage("Failed to create user");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">
          Create User
        </h1>

        {message && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="USER">USER</option>
            <option value="STORE_OWNER">STORE_OWNER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Create User
          </button>

        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateUser;