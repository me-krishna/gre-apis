import { Response } from "express";

interface IResponse {
  status: number;
  message: string;
  data: any;
  metadata: {
    pagination?: {
      total_pages: number;
      current_page: number;
      total_records: number;
      current_page_records: number;
      limit: number;
    }
  }
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
