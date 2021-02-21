import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

import { resolve, extname } from "path";

export const uploadConfig = {
  dest: resolve(__dirname, '..', '..', 'uploads'),
  storage: multer.diskStorage({
    filename: function (req, file, cb) {   
      const extension = extname(file.originalname);
      const filename = uuidv4() + extension;

      cb(null, filename);
    },
    destination: (req, file, cb): any => cb(null, uploadConfig.dest)
  })
}