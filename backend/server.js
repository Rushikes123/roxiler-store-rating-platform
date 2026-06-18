require("dotenv").config();
const testConnection = require("./src/config/testConnection");
const authRoutes = require("./src/routes/auth.routes");
const adminRoutes =require("./src/routes/admin.routes");
const storeRoutes =require("./src/routes/store.routes");
const ratingRoutes =require("./src/routes/rating.routes");
const storeOwnerRoutes =require("./src/routes/storeOwner.routes");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/store-owner",storeOwnerRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Store Rating API Running"
    });
});

const PORT = process.env.PORT || 5000;

testConnection();

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});