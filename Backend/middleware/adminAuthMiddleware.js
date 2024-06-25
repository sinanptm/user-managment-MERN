import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const protectAdmin = expressAsyncHandler(async (req, res, next) => {
    let token = req.cookies.adminToken;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (err) {
            res.status(401);
            throw new Error("Unauthenticated, Invalid token");
        }
    } else {
        res.status(401);
        throw new Error("Unauthenticated, no token provided");
    }

})

export default protectAdmin