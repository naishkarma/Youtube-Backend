import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp'); // Save files to "./public/temp"
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save the file with its original name
  }
});
  
  export const upload = multer({ 
    storage,
})