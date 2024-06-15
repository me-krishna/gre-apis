import { Request, Response } from "express";

interface CustomFile extends File {
  location: string; // Assuming location is a string
}

export const uploadExamImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }
  const customFile = req.file as unknown as CustomFile;
  res.status(200).json({
    uploaded: true,
    // url: `${req.protocol}://${req.headers.host}/mock-test/${req.file.filename}`,
    url: customFile.location,
  });
}