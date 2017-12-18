var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var hotelSchema = new Schema({
  name: {
    type: String
  },
  stars: {
    type: Number
  },
  price: {
    type: Number
  },
  image: {
    type: String
  },
  amenities: {
    type: [
      [String]
    ]
  }
});

module.exports = mongoose.model('Hotel', hotelSchema);
