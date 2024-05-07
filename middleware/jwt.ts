import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import createResponse from '../utils/api-resp';
import dotenv from 'dotenv';

dotenv.config()

const UnauthorizedResponse = (res: Response) => (createResponse(res, {
  status: 401,
  message: 'Unauthorized',
  data: null,
  metadata: {}
}))

function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    return UnauthorizedResponse(res)
  }


  try {
    const mainTocken = token?.split(" ")[1];
    const decoded = verify(mainTocken,process.env.JWT_SECRET!);
    req.body.user = decoded
  } catch (error) {
    return createResponse(res, {
      status: 401,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
      metadata: {}
    })
  } finally {
    next();
  }


}

export default jwtMiddleware;