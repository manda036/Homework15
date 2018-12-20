var myMap = L.map("map-id", {
  center: [15.5994, -28.6731],
  zoom: 3
});
  
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);
  
function createMarkers(response) {
  var magnitudes = response.features[0].properties.mag;
  var locations = [[response.features[0].geometry.coordinates[1], response.features[0].geometry.coordinates[0]]];
  var places = response.features[0].properties.place;
  var earthquakeMarkers = [];
  for (var index = 0; index < magnitudes.length; index++) {
    var color = "";
    if (magnitudes < 2.5) {
      color = "yellow";
    }
    else if (magnitudes = 2.6 < 4.5) {
      color = "orange";
    }
    else {
      color = "red";
    }
    
    var location = locations[index];
    var magnitude = magnitudes[index];
    var place = places[index];
    var earthquakeMarker = L.circle(location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      radius: magnitude
    }).bindPopup("<h3>" + place + "<h3><h3>" + magnitude + "<h3>");
    earthquakeMarkers.push(earthquakeMarker);
    }
    
    L.layerGroup(earthquakeMarkers).addTo(myMap);
  }
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(data=>createMarkers(data));
  