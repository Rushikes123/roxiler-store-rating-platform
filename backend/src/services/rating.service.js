const pool = require("../config/db");

const submitRating = async (
    userId,
    ratingData
) => {

    const {
        store_id,
        rating
    } = ratingData;

    console.log("ratingData =", ratingData);
console.log("store_id =", store_id);
console.log("rating =", rating);

    // Rating Validation

    if (
        rating < 1 ||
        rating > 5
    ) {

        throw new Error(
            "Rating must be between 1 and 5"
        );

    }

    // Check Store Exists

    const storeQuery = `
        SELECT id
        FROM stores
        WHERE id = ?
    `;

    const [stores] =
        await pool.query(
            storeQuery,
            [store_id]
        );
        console.log("stores =", stores);

    if (stores.length === 0) {

        throw new Error(
            "Store Not Found"
        );

    }

    // Check Existing Rating

    const ratingQuery = `
        SELECT id
        FROM ratings
        WHERE user_id = ?
        AND store_id = ?
    `;

    const [ratings] =
        await pool.query(
            ratingQuery,
            [
                userId,
                store_id
            ]
        );

    // UPDATE

    if (ratings.length > 0) {

        const updateQuery = `
            UPDATE ratings
            SET rating = ?
            WHERE user_id = ?
            AND store_id = ?
        `;

        await pool.query(
            updateQuery,
            [
                rating,
                userId,
                store_id
            ]
        );

        return {
            success: true,
            message:
                "Rating Updated Successfully"
        };

    }

    // INSERT

    const insertQuery = `
        INSERT INTO ratings
        (
            user_id,
            store_id,
            rating
        )
        VALUES
        (?, ?, ?)
    `;

    await pool.query(
        insertQuery,
        [
            userId,
            store_id,
            rating
        ]
    );

    return {
        success: true,
        message:
            "Rating Submitted Successfully"
    };

};

module.exports = {
    submitRating
};