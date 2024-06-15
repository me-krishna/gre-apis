import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path, { extname } from "path";
import { v4 as uuidv4 } from "uuid";
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
import dotenv from 'dotenv';

dotenv.config();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, uuidv4() + extname(file.originalname))
//   }
// });

// const upload = multer({ storage: storage });

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY, 
    secretAccessKey: process.env.S3_SECRET_KEY
  },
  region: "ap-south-1"
})

const s3Storage = multerS3({
  s3: s3, 
  bucket: process.env.S3_BUCKET, 
  metadata: (req: Request, file: Express.Multer.File, cb: (error: any, metadata?: any) => void) => {
    cb(null, { originalname: file.originalname });
  },
  key: (req: Request, file: Express.Multer.File, cb: (error: any, metadata?: any) => void) => {
    const fileName = `${uuidv4()}${path.extname(file.originalname.toLowerCase())}`;
    cb(null, fileName);
  }
});

function sanitizeFile(file: Express.Multer.File, cb: FileFilterCallback) {
  const fileExts = [".png", ".jpg", ".jpeg"];

  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    cb(new Error("Only images are allowed"));
  }
}


const uploadImage = multer({
  storage: s3Storage,
  fileFilter: (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    sanitizeFile(file, callback)
  },
  limits: {
    fileSize: 1024 * 1024 * 5 // 5mb file size
  }
})


export default uploadImage;