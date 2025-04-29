const { verifyToken } = require("../utils/jwt.util");

exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).send({ message: "Unauthorized" });
    }
};

exports.authorizeUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    try {
        const payload = await verifyToken(token);
        if (!payload || !payload.id) throw new Error("Invalid token");
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).send({ message: "Unauthorized" });
    }
};