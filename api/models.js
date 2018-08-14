const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  shortName: {
    type: Number,
     required: true
   }
});

let model
try {
	model = mongoose.model('Url')
} catch (error) {
	model = mongoose.model('Url', UrlSchema);
}

module.exports = model;
