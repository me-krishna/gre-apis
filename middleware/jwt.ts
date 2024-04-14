import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import createResponse from '../utils/api-resp';

function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  // const token = req.headers.authorization;
  // if (!token) {
  //   return createResponse(res, {
  //     code: 401,
  //     status: 401,
  //     message: 'Unauthorized',
  //     data: null,
  //     metadata: null
  //   });
  // }

  // try {
  //   const decoded = verify(token, process.env.JWT_SECRET as string);
  //   req.body.user = decoded;
  //   next();
  // } catch (error) {
  //   return createResponse(res, {
  //     code: 401,
  //     status: 401,
  //     message: 'Unauthorized',
  //     data: null,
  //     metadata: null
  //   });
  // }

  next();
}

export default jwtMiddleware;