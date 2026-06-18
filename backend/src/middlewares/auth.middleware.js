const jwt = require("jsonwebtoken");

const authenticateUser = (
    req,
    res,
    next
) => {

    try {

        const authHeader =
            req.headers.authorization;

        console.log("Auth Header:", authHeader);

        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });

        }

        const token =
            authHeader.split(" ")[1];

        console.log("Token:", token);
        console.log("JWT Secret:", process.env.JWT_SECRET);

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        console.log("Decoded:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }

};

module.exports = authenticateUser;