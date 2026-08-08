const songModel = require("../models/songs.model");
const id3 = require('node-id3');      //used for extracting file details stored inside a song file, like it's name, songLength, posterUrl, artist, etc
const imgKit = require("../service/imageKit.service");

async function uploadSong(req, res) {
  const songBuffer = req.file.buffer;
  const tags = id3.read(req.file.buffer)

  const songUrl = await imgKit.uploadFile(songBuffer, tags.title + " mp3", "songs");
  const posterUrl = await imgKit.uploadFile(tags.image.imageBuffer, tags.title + " img", "song-poster");

  console.log("SONG URL: ", songUrl);
  console.log("POSTER URL: ", posterUrl);

  res.status(201).json({
    message: "song added"
  })
}

module.exports = {
  uploadSong
}