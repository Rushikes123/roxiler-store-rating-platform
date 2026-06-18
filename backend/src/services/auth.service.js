const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {

    const {
        name,
        email,
        password,
        address
    } = userData;

    // Check Email Exists

    const query = `
        SELECT id
        FROM users
        WHERE email = ?
    `;

    const [rows] =
        await pool.query(query, [email]);

    if (rows.length > 0) {
        throw new Error(
            "Email already exists"
        );
    }

    // Hash Password

    const hashedPassword =
        await bcrypt.hash(password, 10);

    // Insert User

    const insertQuery = `
        INSERT INTO users
        (
            name,
            email,
            password,
            address,
            role
        )
        VALUES
        (?, ?, ?, ?, ?)
    `;

    const [result] =
        await pool.query(
            insertQuery,
            [
                name,
                email,
                hashedPassword,
                address,
                "USER"
            ]
        );

    console.log(result);

    return {
        success: true,
        message: "User Registered Successfully",
        userId: result.insertId
    };
};
const loginUser = async (userData) => {

    const {
        email,
        password
    } = userData;

    const query = `
        SELECT *
        FROM users
        WHERE email = ?
    `;

    const [rows] =
        await pool.query(query, [email]);

    if (rows.length === 0) {
        throw new Error("Invalid Email");
    }

    const user = rows[0];

    const isPasswordCorrect =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isPasswordCorrect) {
        throw new Error(
            "Invalid Password"
        );
    }
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
    {
        id: user.id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);

   return {
    success: true,
    message: "Login Successful",
    token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
};

};
module.exports = {
    registerUser,
    loginUser
};