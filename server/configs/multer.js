// // multerConfig.js
const multer = require("multer");
const cloudinary = require("../configs/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => {
      // Get the file extension
      let extArray = file.originalname.split(".");
      let extension = extArray[extArray.length - 1];

      // Check the file extension and return the format
      if (extension === "png" || extension === "jpg" || extension === "jpeg") {
        return extension;
      } else {
        throw new Error("Invalid file format");
      }
    },
    public_id: (req, file) => {
      // Use the original file name (without extension) as the public_id
      let nameArray = file.originalname.split(".");
      nameArray.pop(); // remove the extension
      return nameArray.join(".");
    },
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;
