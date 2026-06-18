const express = require("express");

const authenticateUser =
require("../middlewares/auth.middleware");

const authorizeRoles =
require("../middlewares/role.middleware");

const {
    addRating
} = require("../controllers/rating.controller");

const router = express.Router();

router.post(
    "/",
    authenticateUser,
    authorizeRoles(
        "USER"
    ),
    addRating
);

module.exports = router;