const { body } = require("express-validator");

const registerValidation = [

    body("name")
        .trim()
        .isLength({
            min: 3,
            max: 60
        })
        .withMessage(
            "Name must be between 3 and 60 characters"
        ),

    body("email")
        .isEmail()
        .withMessage(
            "Please enter a valid email"
        ),

    body("password")
        .isLength({
            min: 8,
            max: 16
        })
        .withMessage(
            "Password must be 8 to 16 characters"
        )
        .matches(/[A-Z]/)
        .withMessage(
            "Password must contain at least one uppercase letter"
        )
        .matches(/[!@#$%^&*]/)
        .withMessage(
            "Password must contain at least one special character"
        ),

    body("address")
        .isLength({
            min: 3,
            max: 400
        })
        .withMessage(
            "Address must be between 5 and 400 characters"
        )

];

module.exports = {
    registerValidation
};