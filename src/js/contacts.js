function init () {
  const myMap = new ymaps.Map("map", {
    center: [47.21183857427914,39.65991899999991],
    zoom: 17
  });
  const myPlacemark = new ymaps.Placemark([47.21183857427914,39.65991899999991], {
    balloonContentHeader: "TrendUp",
    balloonContentBody: "Ростов-на-Дону, проспект Стачки 74/29",
  });

  myMap.geoObjects.add(myPlacemark);
}

ymaps.ready(init);
