const mongoose = require('mongoose');

const Product = require('./products');

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
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

garmentSchema.post('findOneAndDelete', async function (garment) {
    if (garment.products.length) {
        const res = await Product.deleteMany({_id: { $in: garment.products }})
        console.log(res);
    }
})

module.exports = mongoose.model('Garment', garmentSchema);
