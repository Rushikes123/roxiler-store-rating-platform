const express = require("express");

const authenticateUser =
require("../middlewares/auth.middleware");

const authorizeRoles =
require("../middlewares/role.middleware");

const {
    createStore,
    getStores,
     searchStore
} = require("../controllers/store.controller");

const router = express.Router();

router.post(
    "/",
    authenticateUser,
    authorizeRoles("ADMIN"),
    createStore
);
router.get(
    "/",
    authenticateUser,
    getStores
);

router.get(
    "/search",
    authenticateUser,
    searchStore
);

module.exports = router;