import multer from 'multer';
import { generateUniqueKey } from '../helpers/utils';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/uploads`)
  },
  filename: (req, file, cb) => {
    const key = generateUniqueKey()
    cb(null, `${key}-${file.originalname}`)
  }
})

const upload = multer({ storage })

export default upload