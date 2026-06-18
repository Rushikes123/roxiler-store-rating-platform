import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getStores,
  submitRating,
  searchStores,
} from "../../services/rating.service";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const data = await getStores();
      setStores(data.stores);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRatingChange = (storeId, value) => {
    setRatings({
      ...ratings,
      [storeId]: value,
    });
  };

  const handleSubmitRating = async (storeId) => {
    try {
      const data = await submitRating({
        store_id: storeId,
        rating: Number(ratings[storeId]),
      });

      alert(data.message);

      fetchStores();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      if (!keyword.trim()) {
        fetchStores();
        return;
      }

      const data = await searchStores(keyword);
      setStores(data.stores);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Stores
      </h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search Store..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border px-3 py-2 rounded w-72"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>

        <button
          onClick={() => {
            setKeyword("");
            fetchStores();
          }}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-4">
        {stores.length === 0 ? (
          <div className="bg-white p-5 rounded shadow">
            No Stores Found
          </div>
        ) : (
          stores.map((store) => (
            <div
              key={store.id}
              className="bg-white p-5 rounded-lg shadow"
            >
              <h2 className="text-xl font-semibold">
                {store.storeName}
              </h2>

              <p className="text-gray-600">
                {store.address}
              </p>

              <p className="mt-2">
                Owner: {store.ownerName}
              </p>

              <p className="mt-1">
                Average Rating:{" "}
                {store.averageRating || "No Ratings"}
              </p>

              <div className="flex gap-3 mt-4">
                <select
                  value={ratings[store.id] || ""}
                  onChange={(e) =>
                    handleRatingChange(
                      store.id,
                      e.target.value
                    )
                  }
                  className="border px-3 py-2 rounded"
                >
                  <option value="">
                    Select Rating
                  </option>

                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <button
                  onClick={() =>
                    handleSubmitRating(store.id)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default StoreList;