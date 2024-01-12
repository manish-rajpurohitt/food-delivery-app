import jwt from "jsonwebtoken";
import { Helpers } from "common";

let tokenHekper = {}

tokenHekper.generateAuthToken = async (payload) => {
    return jwt.sign(payload, process.env.AUTH_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRE_TIME });
}

tokenHekper.validateUser = async (req, res, next) => {
    try {
        const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);

        req.authPayload = decoded;

        next();

      } catch (error) {
        Helpers.responseHelper(res, 401, "Invalid Token !", null)
      }
}


export default tokenHekper;