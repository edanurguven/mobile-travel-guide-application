const express = require("express");
const dataList = require("./data");
const funcs = require("./funcs");
const newFunc = require("./newFunc");

const app = express();

app.use(express.json());

app.get("/list", (req, res) => {
  res.send(dataList);
});

app.post("/place-offer-list", (req, res) => {
  const data = req.body;
  //const distance = 1000; //data.distance;
  //const lat = 41.5094055; //data.lat;
  //const long = 36.1143077; //data.long;
  const selectedItems = data.selectedItems;

  //const list = funcs.filterByDistanceFunc(lat, long, distance);
  const list = funcs.filteredData(selectedItems);
  res.status(200).json({ data: list });
});

app.post("/distance-places", (req, res) => {
  let array = [];
  const distance = Number(req.body.distance);
  const lat = req.body.lat;
  const lon = req.body.lon;

  if (req.body.selectedItems.length > 0) {
    const placeTypeList = req.body.selectedItems;

    array = newFunc.place_type(lat, lon, distance, placeTypeList);
  } else {
    array = newFunc.distance_places(lat, lon, distance);
  }
  res.status(200).json({ data: array });
});

app.post("/distance", (req, res) => {
  const distance = req.body.distance;
  const lat = req.body.lat;
  const lon = req.body.lon;
  const array = newFunc.distance_places(lat, lon, distance);
  res.status(200).json({ data: array });
});

app.post("/fav-places", (req, res) => {
  const data = req.body;
  const favs = data.favs.map(Number);
  const filteredData = dataList.data.filter((item) =>
    favs.includes(item.placeId)
  );

  if (filteredData.length == 0) {
    filteredData = [];
  }
  res.status(200).json({ data: filteredData });
});

app.post("/array-data-list", (req, res) => {
  const savedList = req.body.saved;
  const list = newFunc.resultArrayList(savedList);
  if (list.length == 0) {
    list == [];
  }
  res.status(200).json({ data: list });
});

app.post("/id-places", (req, res) => {
  const data = req.body;
  if (!Array.isArray(data.favs)) {
    return res.status(400).json({ error: "favs should be an array" });
  }

  const favs = data.favs.map(Number);
  const filteredData = dataList.data.filter((item) =>
    favs.includes(item.placeId)
  );
  res.status(200).json({ data: filteredData });
});

app.post("/top-fav-places", (req, res) => {
  const data = req.body;
  const favs = data.favs.map(Number);
  const filteredData = dataList.data.filter((item) =>
    favs.includes(item.placeId)
  );
  res.status(200).json({ data: filteredData });
});

app.listen(3030, () => {
  console.log("server running");
});
