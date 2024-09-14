const mongoose = require('mongoose');

const garmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name tidak boleh kosong']
    },
    location: {
        type: String
    },
    contact: {
        type: String,
        required: [true, 'Contact tidak boleh kosong']
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

const Garment = mongoose.model('Garment', garmentSchema);

module.exports = Garment;