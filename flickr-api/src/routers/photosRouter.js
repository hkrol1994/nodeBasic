const express = require("express");
const fetchPhotos = require("../utils/fetch-photos");
const Photo = require("../models/photoModel");

const key = process.env.FLICKR_KEY;
const interestingPhotosURL = `https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${key}&extras=url_m&format=json&nojsoncallback=1`;
const searchPhotosURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&extras=url_m&format=json&nojsoncallback=1&text=`;

const router = new express.Router();

router.get("/interesting-photos", async (req, res) => {
  try {
    const photos = await fetchPhotos(interestingPhotosURL);
    res.send(photos);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/search-photos/:search", async (req, res) => {
  const search = req.params.search;
  try {
    const photos = await fetchPhotos(searchPhotosURL + search);
    res.send(photos);
  } catch (err) {
    if (err.status === 404) {
      res.status(404).send(err);
    }
    res.status(500).send();
  }
});

router.post("/add-photo", async (req, res) => {
  const src = req.query.src;
  const alt = req.query.alt || "unknown";
  try {
    if (src) {
      const photo = new Photo({ src, alt });
      await photo.save();
      res.send(photo);
    } else {
      res.status(400).send({
        message: "lack of src",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/my-photos", async (req, res) => {
  try {
    const photos = await Photo.find({});
    if (photos.length > 0) {
      let photosSrc = photos.map((photo) => photo.src);
      res.send(photosSrc);
    } else {
      res.status(404).send({
        message: "No photos",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
