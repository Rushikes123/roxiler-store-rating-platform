const {
    addStore,
    getAllStores,
     searchStores
} = require("../services/store.service");

const createStore = async (req, res) => {

    try {

        const result =
            await addStore(req.body);

        return res.status(201)
            .json(result);

    } catch (error) {

        return res.status(500)
            .json({
                success: false,
                message: error.message
            });

    }

};

const getStores = async (req, res) => {

    try {

        const result =
            await getAllStores();

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

const searchStore = async (
    req,
    res
) => {

    try {

        const keyword =
            req.query.keyword;

        const result =
            await searchStores(
                keyword
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
createStore,
    getStores,
     searchStore
};