const ImageKit = require("@imagekit/nodejs").default
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_KEY
});

const uploadFile = async (buffer, fileName, folderName) => {
  const response = await client.files.upload({
    fileName: fileName,
    folder: "cohort-moodify-" + folderName,
    file: await toFile(Buffer.from(buffer))
  })

  return response;
}

module.exports = { uploadFile };

