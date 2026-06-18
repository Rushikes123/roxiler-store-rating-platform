const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const createUser = async (userData) => {

    const {
        name,
        email,
        password,
        address,
        role
    } = userData;

    // Check Email Exists

    const checkQuery = `
        SELECT id
        FROM users
        WHERE email = ?
    `;

    const [rows] =
        await pool.query(
            checkQuery,
            [email]
        );

    if (rows.length > 0) {

        throw new Error(
            "Email already exists"
        );

    }

    // Hash Password

    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

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
                role
            ]
        );

    return {
        success: true,
        message:
            "User Created Successfully",
        userId:
            result.insertId
    };

};

const getAllUsers = async () => {

    const query = `
        SELECT
            id,
            name,
            email,
            address,
            role,
            created_at
        FROM users
        ORDER BY id DESC
    `;

    const [users] =
        await pool.query(query);

    return {
        success: true,
        count: users.length,
        users
    };

};

const getDashboardStats = async () => {

    const [users] =
        await pool.query(
            "SELECT COUNT(*) AS totalUsers FROM users"
        );

    const [stores] =
        await pool.query(
            "SELECT COUNT(*) AS totalStores FROM stores"
        );

    const [ratings] =
        await pool.query(
            "SELECT COUNT(*) AS totalRatings FROM ratings"
        );

    return {
        success: true,
        totalUsers:
            users[0].totalUsers,
        totalStores:
            stores[0].totalStores,
        totalRatings:
            ratings[0].totalRatings
    };

};

const searchUsers = async (keyword) => {

    const query = `
        SELECT
            id,
            name,
            email,
            role,
            address
        FROM users
        WHERE
            name LIKE ?
            OR email LIKE ?
            OR role LIKE ?
    `;

    const searchValue =
        `%${keyword}%`;

    const [users] =
        await pool.query(
            query,
            [
                searchValue,
                searchValue,
                searchValue
            ]
        );

    return {
        success: true,
        count: users.length,
        users
    };

};

module.exports = {
    createUser,
    getAllUsers,
    getDashboardStats,
     searchUsers
};