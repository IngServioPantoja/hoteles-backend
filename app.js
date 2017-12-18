var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));

// Connection to DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:')); //not shown
db.once('open', function() {
  console.log("Successful connection to db!"); //not shown
});

mongoose.connect('mongodb://localhost/hotelesdb', function(err, res) {
  if (err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());

// Add headers
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
});

//Modules
var models = require('./models/hotel')(app, mongoose);
var HotelesController = require('./controllers/hoteles');

// Initial Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Bienvenido a mi api");
});
app.use(router);

// API routes
var hotelesRouter = express.Router();

hotelesRouter.route('/hoteles')
  .get(HotelesController.listar)
  .post(HotelesController.agregarHotel);

hotelesRouter.route('/hoteles/:id')
  .get(HotelesController.buscarPorId)
  .put(HotelesController.actualizar)
  .delete(HotelesController.eliminar);

app.use('/', hotelesRouter);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
