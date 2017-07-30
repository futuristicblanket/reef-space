// app/routes.js
var fs = require('fs');
var turf = require('turf');
var ocean_temp;
fs.readFile(__dirname + '/data/ocean_temp.json', "utf8", function (err, data) {
  ocean_temp = JSON.parse(data);
});
// grab the chicken model we just created
var location = ["Gladstone", "Emu Park", "Cairns", "Townsville", "Bundaberg", "Mackay Mk4"]

module.exports = function (app) {
  // server routes ===========================================================
  // handle things like api calls
  // authentication routes
  // sample api route
  app.get('/api/chickens', function (req, res) {
    // use mongoose to get all chickens in the database
    Chicken.find(function (err, chooks) {
      // if there is an error retrieving, send the error. 
      // nothing after res.send(err) will execute
      if (err) return console.error(err);
      res.json(chooks); // return all chickens in JSON format
    });
  });

  // route to handle creating goes here (app.post)
  app.post('/api/chickens', function (req, res) {
    // Save new chook in the database
    var myChook = new Chicken({
      name: req.body.name,
      breed: req.body.breed,
      laying: req.body.laying
    });
    myChook.save(function (err, myChook) {
      if (err) return console.error(err);
      myChook.speak();
    })
    res.end();
  });

  // route to handle delete goes here (app.delete)

  // frontend routes =========================================================
  // route to handle all angular requests
  /*app.get('*', function (req, res) {
  res.sendFile('/public/views/index.html', {
  root: (__dirname + '/..')
  }); // load our public/index.html file
  });*/

  app.get('/', function (req, res) {
    res.render('home');
  });

  app.get('/gbr', function (req, res) {
    res.render('gbr');
  });
  app.get('/sources', function (req, res) {
    res.render('sources');
  });
  app.get('/about', function (req, res) {
    res.render('about');
  });
  app.get('/data/wave.json', function (req, res) {
    res.json(ocean_temp[req.query.site]);
  });
  app.get('/data/temp.json', function (req, res) {
    var importantData = ocean_temp[req.query.site]
    var arrayThing = []
    for (i = importantData.length - 24; i < importantData.length; i++) {
      arrayThing.push(importantData[i].SST);
    }
    res.json({
      temp: arrayThing
    });
  })
  app.get('/data/location.geojson', function (req, res) {
    var cords = []
    var ourGeojson = {
      type: "FeatureCollection",
      features: []
    }
    var geoJsonPoint = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": []
      }
    }
    for (i = 0; i < location.length; i++) {
      console.log(location[i])
      var lat = ocean_temp[location[i]][(ocean_temp[location[i]].length - 1)].Latitude
      var long = ocean_temp[location[i]][(ocean_temp[location[i]].length - 1)].Longitude
      cords.push([location[i], lat, long]);
      var point = geoJsonPoint;
      point.properties = {
        "location": location[i]
      }
      point.geometry.coordinates = [long, lat];
      console.log(point)
      var stringy = JSON.stringify(point)
      ourGeojson.features.push(JSON.parse(stringy));
      console.log(JSON.stringify(ourGeojson));
      var point = geoJsonPoint;
    }


    res.json(ourGeojson);


  });
  app.use(function (req, res, next) {
    res.status(404);
    // respond with html page
    if (req.accepts('html')) {
      res.render('404');
      return;
    };
  });
};
