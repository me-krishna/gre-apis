import { Request, Response } from "express";
import { hostname } from 'os';

export const uploadExamImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }
  res.status(200).json({
    uploaded: true,
    url: `${req.protocol}://${req.headers.host}/mock-test/${req.file.filename}`,
  });
}