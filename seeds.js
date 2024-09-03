const mongoose = require('mongoose');
const Product = require('./models/products');

mongoose.connect('mongodb://127.0.0.1/shop_db').then((result) => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const seedProduct = [
    {
        name: 'T-shirt',
        brand: 'Nike',
        price: 150000,
        color: 'Red',
        size: 'S'
    },
    {
        name: 'Jacket',
        brand: 'Adidas',
        price: 300000,
        color: 'Black',
        size: 'M'
    },
    {
        name: 'Hoodie',
        brand: 'Puma',
        price: 250000,
        color: 'Grey',
        size: 'L'
    }
]

Product.insertMany(seedProduct).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})

Product.deleteMany({}).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})