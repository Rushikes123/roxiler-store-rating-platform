const express = require("express");

const authenticateUser =
require("../middlewares/auth.middleware");

const authorizeRoles =
require("../middlewares/role.middleware");

const {
    addUser,
    getUsers,
     getDashboard,
     searchUser
} = require("../controllers/admin.controller");

const router = express.Router();

router.post(
    "/users",
    authenticateUser,
    authorizeRoles("ADMIN"),
    addUser
);

router.get(
    "/users",
    authenticateUser,
    authorizeRoles("ADMIN"),
    getUsers
);

router.get(
    "/dashboard",
    authenticateUser,
    authorizeRoles("ADMIN"),
    getDashboard
);

router.get(
    "/users/search",
    authenticateUser,
    authorizeRoles("ADMIN"),
    searchUser
);

module.exports = router;