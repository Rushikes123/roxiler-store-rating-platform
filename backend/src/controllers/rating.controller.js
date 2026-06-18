const {
    submitRating
} = require("../services/rating.service");

const addRating = async (req, res) => {

    try {

        const result =
            await submitRating(
                req.user.id,
                req.body
            );

        return res.status(200)
            .json(result);

    } catch (error) {

        return res.status(500)
            .json({
                success: false,
                message: error.message
            });

    }

};

module.exports = {
    addRating
};