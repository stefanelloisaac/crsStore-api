import User from "../models/User";
import jwt from "jsonwebtoken";

export default async function (authorization) {
  try {
    if (!authorization) {
      return null;
    }

    const token = authorization.split(" ")[1] || null;
    const decodedToken = jwt.decode(token);

    if (!decodedToken) {
      return null;
    }

    let user = await User.findOne({
      where: {
        id: decodedToken.userId,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};