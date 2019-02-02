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
  console.log(response.features);
  // var magnitudes = [];
  // var locations = [];
  // var places = [];
  // for (var index = 0; index < response.features.length; index++) {
  // magnitudes.push(response.features[index].properties.mag);
  // locations.push([response.features[index].geometry.coordinates[1], response.features[index].geometry.coordinates[0]]);
  // places.push(response.features[index].properties.place);
  // }
  // console.log(magnitudes);
  // console.log(locations);
  // console.log(places);
  function getColor (magnitude) {
    // var color = "";
    if (magnitude < 2.5) {
        return "#FFFF00";
      }
    else if (magnitude < 4.5) {
      return "#FFA500";
      }
    else {
      return "#FF0000";
      }
    };
    
      // var location = locations[0];
      // var magnitude = magnitudes[0];
      // var place = places[0];
      function earthquakeMarker(feature) {
        return {
        fillOpacity: 1,
        color: "#000000",
        fillColor: getColor(feature.properties.mag),
        stroke: true,
        weight: 0.5,
        opacity: 1,
        radius: feature.properties.mag*1.5
      };
    }
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {
    
      var div = L.DomUtil.create('div', 'info legend')
      grades = [0, 2.5, 4.5];
      var colorss = ["0", "1", "#FF0000"];
        // labels = [];
    
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                "<i style='background: "+ colorss[0] + "'></i> "+
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    
    return div;
    };
    
    legend.addTo(myMap);

      L.geoJson(response, {
        pointToLayer: function(feature, location) {
          return L.circleMarker(location)
        },
        style: earthquakeMarker,
        onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place + "<h3><h3>" + feature.properties.mag + "<h3>");
        }
      }).addTo(myMap);
    });
  // });
