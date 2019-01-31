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
  
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(response) {
  // console.log(response.features);
  var magnitudes = [];
  var locations = [];
  var places = [];
  for (var index = 0; index < response.features.length; index++) {
  magnitudes.push(response.features[index].properties.mag);
  locations.push([[response.features[index].geometry.coordinates[1], response.features[index].geometry.coordinates[0]]]);
  places.push(response.features[index].properties.place);
  }
  console.log(magnitudes);
  console.log(locations);
  console.log(places);
  // var earthquakeMarkers = [];
  for (var index = 0; index < magnitudes.length; index++) {
    var color = "";
    if (magnitude < 2.5) {
        color = "yellow";
      }
    else if (magnitude = 2.6 < 4.5) {
      color = "orange";
      }
    else {
      color = "red";
      }
      
      var location = locations[1];
      var magnitude = magnitudes[1];
      var place = places[1];
      function earthquakeMarker() {L.circle(location, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        radius: magnitude
      });
    }
      
      L.geoJson(response, {
        pointToLayer: function(feature, location) {
          return L.circleMarker(location)
        },
        style: earthquakeMarker,
        onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>" + place + "<h3><h3>" + magnitude + "<h3>");
        }
      }).addTo(myMap);
    }
  });
