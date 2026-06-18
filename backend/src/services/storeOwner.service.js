const pool = require("../config/db");

const getStoreDashboard =
async (ownerId) => {

    const storeQuery = `
        SELECT
            s.id,
            s.name,
            ROUND(
                AVG(r.rating),
                1
            ) AS averageRating
        FROM stores s

        LEFT JOIN ratings r
            ON s.id = r.store_id

        WHERE s.owner_id = ?

        GROUP BY
            s.id,
            s.name
    `;

    const [stores] =
        await pool.query(
            storeQuery,
            [ownerId]
        );

    if (stores.length === 0) {

        throw new Error(
            "No Store Found"
        );

    }

    const ratingQuery = `
        SELECT
            u.name AS userName,
            r.rating
        FROM ratings r

        JOIN users u
            ON r.user_id = u.id

        JOIN stores s
            ON r.store_id = s.id

        WHERE s.owner_id = ?
    `;

    const [ratings] =
        await pool.query(
            ratingQuery,
            [ownerId]
        );

    return {
        success: true,
        store: stores[0],
        ratings
    };

};

module.exports = {
    getStoreDashboard
};