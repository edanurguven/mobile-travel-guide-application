const haversine = require("haversine-distance");
const data = require("./data").data;

exports.distance_places = (lat, lon, radius) => {
  const list = [];
  const customItem = { latitude: lat, longitude: lon };

  data.forEach((element) => {
    const elementItem = {
      latitude: element.latitude,
      longitude: element.longitude,
    };

    if (radius >= haversine(customItem, elementItem)) {
      list.push(element);
    }
  });
  return list;
};

exports.place_type = (lat, lon, radius, placeTypeList) => {
  const list = [];
  const customItem = { latitude: lat, longitude: lon };

  data.forEach((element) => {
    placeTypeList.forEach((type) => {
      if (element.placeType == type) {
        const elementItem = {
          latitude: element.latitude,
          longitude: element.longitude,
        };
        if (radius >= haversine(customItem, elementItem)) {
          list.push(element);
        }
      }
    });
  });
  return list;
};

exports.resultArrayList = (indexArray) => {
  const list = [];
  data.forEach((element) => {
    indexArray.forEach((index) => {
      if (element.placeId == index) {
        list.push(element);
      }
    });
  });
  return list;
};
