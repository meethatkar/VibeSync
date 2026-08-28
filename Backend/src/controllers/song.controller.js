const songModel = require("../models/songs.model");
const id3 = require('node-id3');      //used for extracting file details stored inside a song file, like it's name, songLength, posterUrl, artist, etc
const imgKit = require("../service/imageKit.service");

async function uploadSong(req, res) {
  const songBuffer = req.file.buffer;
  const tags = id3.read(req.file.buffer)

  const [songUrl, posterUrl] = await Promise.all([
    imgKit.uploadFile(songBuffer, tags.title + " mp3", "songs"),
    imgKit.uploadFile(tags.image.imageBuffer, tags.title + " img", "song-poster")
  ])

  const song = await songModel.create({
    name: tags.title,
    singer: tags.artist,
    releasedOn: tags.year,
    plays: req.body.plays,
    songUrl: songUrl.url,
    duration: songUrl.duration,
    posterUrl: posterUrl.url,
    mood: req.body.mood,
  })

  res.status(201).json({
    message: "song added",
    song
  })
}

async function getSong(req, res) {
  const mood = req.query.mood;

  const song = await songModel.findOne({ mood: mood });

  res.status(200).json({
    message: "song fetched",
    song
  })
}

module.exports = {
  uploadSong,
  getSong
}