const express = require("express");

const authenticateUser =
require("../middlewares/auth.middleware");

const authorizeRoles =
require("../middlewares/role.middleware");

const {
    getDashboard
} = require(
    "../controllers/storeOwner.controller"
);

const router = express.Router();

router.get(
    "/dashboard",
    authenticateUser,
    authorizeRoles(
        "STORE_OWNER"
    ),
    getDashboard
);

module.exports = router;