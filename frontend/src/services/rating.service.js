import api from "../api/axios";

export const getStores = async () => {
  const response = await api.get("/stores");
  return response.data;
};

export const submitRating = async (ratingData) => {
  const response = await api.post("/ratings", ratingData);
  return response.data;
};
export const searchStores = async (keyword) => {
  const response = await api.get(
    `/stores/search?keyword=${keyword}`
  );

  return response.data;
};