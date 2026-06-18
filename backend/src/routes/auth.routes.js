const express = require("express");

const { register, login } =
require("../controllers/auth.controller");

const authenticateUser =
require("../middlewares/auth.middleware");

const authorizeRoles =
require("../middlewares/role.middleware");

const {
    registerValidation
} = require(
    "../validators/auth.validator"
);

const validate =
require(
    "../middlewares/validation.middleware"
);

const router = express.Router();

router.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Auth Route Working"
    });
});

router.post(
    "/register",
    registerValidation,
    validate,
    register
);

router.post("/login", login);

router.get(
    "/profile",
    authenticateUser,
    (req, res) => {

        res.status(200).json({
            success: true,
            user: req.user
        });

    }
);

router.get(
    "/admin-dashboard",
    authenticateUser,
    authorizeRoles("ADMIN"),
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Welcome Admin"
        });

    }
);

module.exports = router;