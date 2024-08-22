import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../../../Pinterest-Clone---Backold/models/User";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

//middleware checks the auth and bearer token to a loggedin user - connects to auth0
export const jwtCheck = auth({
  audience: "Hackthon Businesses - api",
  issuerBaseURL: "https://dev-p2shlcrz2tqswfmv.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401); //to not return any clue for unauthorize user what is wrong
  }

  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub; //In JWT the sub contains the user's unique id.

    const user = await User.findOne({ auth0Id });
    if (!user) {
      return res.sendStatus(401);
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.sendStatus(401);
    }
    return res.sendStatus(500);
  }
};
