import multer from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

export default upload;