const divPhotos = document.getElementById("photos-container");
const formSearch = document.getElementById("form-search");
const inputSearch = formSearch.children[0];
const formAdd = document.getElementById("form-add");
const inputURL = formAdd.children[0];
const inputAlt = formAdd.children[1];
const buttonMyPhotos = document.getElementById("button-my-photos");

const interestingPhotosURL = `http://localhost:3000/interesting-photos`;
const searchPhotosURL = `http://localhost:3000/search-photos/`;
const addPhotoURL = "http://localhost:3000/add-photo";
const myPhotosURL = "http://localhost:3000/my-photos";

const renderPhotos = (url) => {
  while (divPhotos.children.length > 0) {
    divPhotos.removeChild(divPhotos.lastChild);
  }
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((jsonObj) => {
      for (let imgSrc of jsonObj) {
        const img = document.createElement("img");
        img.src = imgSrc;
        divPhotos.appendChild(img);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

renderPhotos(interestingPhotosURL);

formSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchVaule = inputSearch.value;
  const url =
    searchVaule.length > 0
      ? searchPhotosURL + searchVaule
      : interestingPhotosURL;
  renderPhotos(url);
});

formAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = addPhotoURL + `?src=${inputURL.value}&alt=${inputAlt.value}`;
  fetch(url, { method: "POST" })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((jsonObj) => {
      console.log(jsonObj);
      alert("Photo submitted");
    })
    .catch((err) => {
      console.log(err);
    });
});

buttonMyPhotos.addEventListener("click", () => {
  renderPhotos(myPhotosURL);
});
