const {
    createUser,
    getAllUsers,
      getDashboardStats,
      searchUsers
} = require("../services/admin.service");



const addUser = async (req, res) => {

    try {

        const result =
            await createUser(req.body);

        return res.status(201).json(result);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getUsers = async (req, res) => {

    try {

        const result =
            await getAllUsers();

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

const getDashboard = async (req, res) => {

    try {

        const result =
            await getDashboardStats();

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

const searchUser = async (req, res) => {

    try {

        const keyword =
            req.query.keyword;

        const result =
            await searchUsers(
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
    addUser,
     getUsers,
     getDashboard,
     searchUser
};