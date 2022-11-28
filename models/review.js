const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
body: {type: String, required:true},
rating: {type: Number, min: 1, max: 5, default: 5}
}, {timestamps: true});

mongoose.model.exports = mongoose.model('Product', productSchema);