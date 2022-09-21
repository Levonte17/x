const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// a model is a singular representation of our data

// step one create the schema
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