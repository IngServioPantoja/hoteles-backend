//File: controllers/hotels.js
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

/*
Metodo encargado de listar los hoteles existentes,
soporta el filtrado por name y strellas
*/
exports.listar = function(req, res) {

  console.log('GET /hoteles');
  var name = req.query['name'];
  var stars = req.query['stars'];
  console.log("Parametros enviados " + name + " " + stars);

  if (undefined == stars && undefined == name) {
    /*Si no se ingresan fltros se consulta todo*/
    Hotel.find(function(err, hoteles) {
      if (err) res.send(500, err.message);
      res.status(200).jsonp(hoteles);
    });
  } else {
    /*Si se agrega alguno de los filtros se modifica la consulta*/
    if (undefined == stars) {
      stars = "0";
    }
    if (undefined == name) {
      name = "  ";
    }
    Hotel.find({
      $or: [{
        "stars": {
          "$in": stars.split(",").map(val => Number(val) + 0)
        }
      }, {
        "name": {
          "$regex": ".*" + name + ".*",
          '$options': 'i'
        }
      }]
    }, function(err, hoteles) {
      if (err) res.send(500, err.message);
      res.status(200).jsonp(hoteles);
    });
  }
};

/*Obtiene un hotel por su id*/
exports.buscarPorId = function(req, res) {
  Hotel.findById(req.params.id, function(err, hotel) {
    if (err) return res.send(500, err.message);
    console.log('GET /hoteles/' + req.params.id);
    res.status(200).jsonp(hotel);
  });
};
/*Agrega un hotel al sistema*/
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

/*Actualiza un hotel*/
exports.actualizar = function(req, res) {
  console.log('PUT /hoteles/' + req.params.id);
  Hotel.findById(req.params.id, function(err, hotel) {
    console.log("Hotel a editar " + hotel);
    if (hotel != null) {
      hotel.name = req.body.name;
      hotel.stars = req.body.stars;
      hotel.price = req.body.price;
      hotel.image = req.body.image;
      hotel.amenities = req.body.amenities;
      hotel.save(function(err) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(hotel);
      });
    } else {
      console.log("No se modifica ningun registro pero se da respuesta");
      if (err) return res.send(500, err.message);
      res.status(200).jsonp(null);
    }
  });
};
/**Elimina un hotel*/
exports.eliminar = function(req, res) {
  console.log('DELETE /hoteles/' + req.params.id);
  Hotel.findById(req.params.id, function(err, hotel) {
    if (hotel != null) {
      hotel.remove(function(err) {
        if (err) return res.send(500, err.message);
        res.status(200);
      });
    } else {
      console.log("No se elimina ningun registro pero se da respuesta");
      if (err) return res.send(500, err.message);
      res.status(200).jsonp(null);
    }
  });
};
