//File: controllers/hotels.js
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

exports.listar = function(req, res) {
  Hotel.find(function(err, hoteles) {
    if (err) res.send(500, err.message);

    console.log('GET /hoteles');
    res.status(200).jsonp(hoteles);
  });
};

exports.buscarPorId = function(req, res) {
  Hotel.findById(req.params.id, function(err, hotel) {
    if (err) return res.send(500, err.message);

    console.log('GET /hoteles/' + req.params.id);
    res.status(200).jsonp(hotel);
  });
};

exports.agregarHotel = function(req, res) {
  console.log('POST');
  console.log(req.body);

  var hotel = new Hotel({
    name: req.body.name,
    stars: req.body.stars,
    price: req.body.price,
    image: req.body.image,
    amenities: req.body.amenities
  });

  hotel.save(function(err, hotel) {
    if (err) return res.send(500, err.message);
    res.status(200).jsonp(hotel);
  });
};

exports.actualizar = function(req, res) {
  console.log('PUT /hoteles/' + req.params.id);
  Hotel.findById(req.params.id, function(err, hotel) {
    hotel.name = req.body.name;
    hotel.stars = req.body.stars;
    hotel.price = req.body.price;
    hotel.image = req.body.image;
    hotel.amenities = req.body.amenities;
    hotel.save(function(err) {
      if (err) return res.send(500, err.message);
      res.status(200).jsonp(hotel);
    });
  });
};

exports.eliminar = function(req, res) {
  console.log('DELETE /hoteles/' + req.params.id);
  Hotel.findById(req.params.id, function(err, hotel) {
    hotel.remove(function(err) {
      if (err) return res.send(500, err.message);
      res.status(200);
    })
  });
};
