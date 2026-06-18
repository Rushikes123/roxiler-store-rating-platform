const {
    getStoreDashboard
} = require(
    "../services/storeOwner.service"
);

const getDashboard = async (
    req,
    res
) => {

    try {

        const result =
            await getStoreDashboard(
                req.user.id
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
    getDashboard
};