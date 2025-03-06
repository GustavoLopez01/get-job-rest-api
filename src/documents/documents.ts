import fs from 'fs'
import path from 'path'


export const getDocumentByName = async (name: string) => {
  try {
    const filePath = path.join(__dirname, 'uploads', name)
    const baseString = fs.readFileSync(filePath)
    // const baseString = data.toString('base64')
    const ext = path.extname(name).toLocaleLowerCase()
    const mimeType = getMimeType(ext)

    return {
      // document: baseString.toString('base64'),
      document: filePath,
      extension: mimeType
    }
  } catch (error) {
    console.log(error)
  }
}

const getMimeType = (ext: string) => {
  const mimeTypes: { [key: string]: string } = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
  };
  return mimeTypes[ext] || "application/octet-stream";
};