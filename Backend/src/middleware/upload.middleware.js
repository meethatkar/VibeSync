// used for allowing to accept files from body/request
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //10 MB
  },
});

module.exports = upload;
