const data = require("./data");

//haversine func => gelen iki nokta arasındaki uzaklığı bulur(km cinsinden)
exports.haversineFunc = (lat1, lon1, lat2, lon2) => {
  let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  let dLon = ((lon2 - lon1) * Math.PI) / 180.0;

  lat1 = (lat1 * Math.PI) / 180.0;
  lat2 = (lat2 * Math.PI) / 180.0;

  let a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  let rad = 6371.0088; // Dünya yarıçapı (kilometre cinsinden)
  let c = 2 * Math.asin(Math.sqrt(a));
  return rad * c;
};

// radius metre cinsinden, haversine fonksiyonu kilometre cinsinden döner.
//kullanıcının m cinsinden veri girdiği düşünülerek m =>km çevrildi.
//fonksiyonun girdileri kullanıcının konumu oluyor(merkez nokta)
exports.filterByDistanceFunc = (lat, long, radius) => {
  console.log("funcs page data => ", data.data);

  let radiusInKm = radius / 1000;

  return data.data.filter((location) => {
    let distance = this.haversineFunc(lat, long, location.lat, location.lon);
    return distance <= radiusInKm;
  });
};

exports.filteredPlaceItems = (placeItems, data) => {
  const list = [];

  data.data.filter((item) => {
    placeItems.filter((place) => {
      if (place == item.placeType) {
        list.push(item);
      }
    });
  });

  return list;
};

exports.filteredData = (placeItems) => {
  const list = [];
  placeItems.forEach((element) => {
    data.data.forEach((place) => {
      if (element == place.placeType) {
        list.push(place);
      }
    });
  });
  return list;
};

/*
exports.resultList=(lat,long,distance,placeItems)=>{
    return this.filteredPlaceItems(placeItems,this.filterByDistanceFunc(lat,long,distance));
} */
