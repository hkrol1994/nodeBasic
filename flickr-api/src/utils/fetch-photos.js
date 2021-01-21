const axios = require("axios");

const fetchPhotos = async (url) => {
  try {
    let res = await axios.get(url);
    if (res.data.photos.photo.length > 0) {
      let imagesSrc = [];
      for (let photo of res.data.photos.photo) {
        imagesSrc.push(photo.url_m);
      }
      return imagesSrc;
    } else {
      throw {
        status: 404,
        message: "Not found",
      };
    }
  } catch (err) {
    throw err;
  }
};

module.exports = fetchPhotos;
