import { Request, Response } from "express";
import createResponse from "../utils/api-resp"

export const GetStudents = async (req: Request, res: Response) => {
  createResponse(res, { status: 200, message: 'Success', data: null, metadata: null });
}