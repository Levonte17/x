const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//REVIEWS
const reviewSchema = new Schema({

    body: {type: String},
    rating: {type: Number, min: 1, max: 5, default: 5}
    }, {timestamps: true}); //approximatly...

const productSchema = new mongoose.Schema({ // Schema is a constructor
    name: {type: String},
    description: {type: String},
    img: {type: String},
    price: {type: Number},
    qty: {type: Number, required: true}
}, { timestamps: true }); 
// timestamps: true provides a createdAt & updatedAt field in our documents

// step two/step three, initialize the model and export it
module.exports = mongoose.model('Product', productSchema);