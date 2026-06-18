const pool = require("../config/db");

const addStore = async (storeData) => {

    const {
        name,
        email,
        address,
        owner_id
    } = storeData;

    // Check Owner Exists

    const ownerQuery = `
        SELECT
            id,
            role
        FROM users
        WHERE id = ?
    `;

    const [owners] =
        await pool.query(
            ownerQuery,
            [owner_id]
        );

    if (owners.length === 0) {

        throw new Error(
            "Store Owner Not Found"
        );

    }

    // Verify Role

    if (
        owners[0].role !==
        "STORE_OWNER"
    ) {

        throw new Error(
            "User Is Not A Store Owner"
        );

    }

    // Insert Store

    const insertQuery = `
        INSERT INTO stores
        (
            name,
            email,
            address,
            owner_id
        )
        VALUES
        (?, ?, ?, ?)
    `;

    const [result] =
        await pool.query(
            insertQuery,
            [
                name,
                email,
                address,
                owner_id
            ]
        );

    return {
        success: true,
        message:
            "Store Created Successfully",
        storeId:
            result.insertId
    };

};

const getAllStores = async () => {

    const query = `
       SELECT
    s.id,
    s.name AS storeName,
    s.email,
    s.address,
    u.name AS ownerName,
    ROUND(AVG(r.rating),1) AS averageRating
FROM stores s

JOIN users u
    ON s.owner_id = u.id

LEFT JOIN ratings r
    ON s.id = r.store_id

GROUP BY
    s.id,
    s.name,
    s.email,
    s.address,
    u.name

ORDER BY s.id DESC
    `;

    const [stores] =
        await pool.query(query);

    return {
        success: true,
        count: stores.length,
        stores
    };

};

const searchStores = async (
    keyword
) => {

    const searchValue =
        `%${keyword}%`;

    const query = `
        SELECT
            s.id,
            s.name AS storeName,
            s.email,
            s.address,
            u.name AS ownerName,
            ROUND(
                AVG(r.rating),
                1
            ) AS averageRating
        FROM stores s

        JOIN users u
            ON s.owner_id = u.id

        LEFT JOIN ratings r
            ON s.id = r.store_id

        WHERE
            s.name LIKE ?
            OR s.address LIKE ?

        GROUP BY
            s.id,
            s.name,
            s.email,
            s.address,
            u.name
    `;

    const [stores] =
        await pool.query(
            query,
            [
                searchValue,
                searchValue
            ]
        );

    return {
        success: true,
        count: stores.length,
        stores
    };

};

module.exports = {
     addStore,
    getAllStores,
     searchStores
};