import { Response } from "express";

interface IResponse {
  status: number;
  message: string;
  data: any;
  metadata: any;
}

function createResponse(res: Response, { status, message, data, metadata }: IResponse) {
  return res.status(status).json({
    status,
    message,
    data,
    metadata
  });
}

export default createResponse;;
