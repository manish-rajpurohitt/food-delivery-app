import jwt from "jsonwebtoken";
import Helpers from "../../../helpers/index.js";

let tokenHekper = {}

tokenHekper.generateAuthToken = async (payload) => {
  return jwt.sign(payload, process.env.AUTH_SECRET_KEY_CLIENT, { expiresIn: process.env.TOKEN_EXPIRE_TIME });
}

tokenHekper.validateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      const authHeader = req.headers['Authorization'];
      if (!authHeader) {
        return Helpers.responseHelper(res, 401, 'Token not provided', null);
      }
    }

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
      return Helpers.responseHelper(res, 401, 'Invalid token format', null);
    }

    const token = tokenParts[1];
    const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY_CLIENT);

    req.authPayload = decoded;

    next();

  } catch (error) {
    Helpers.responseHelper(res, 401, "Invalid Token !", null)
  }
}


export default tokenHekper;