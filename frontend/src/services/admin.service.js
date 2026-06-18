import api from "../api/axios";

export const getDashboardData = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};
export const searchUsers = async (keyword) => {
  const response = await api.get(
    `/admin/users/search?keyword=${keyword}`
  );

  return response.data;
};
export const getAllStores = async () => {
  const response = await api.get("/stores");
  return response.data;
};

export const createStore = async (storeData) => {
  const response = await api.post("/stores", storeData);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post("/admin/users", userData);
  return response.data;
};