const mongoose = require('mongoose');
const Product = require('./models/products');
const { name } = require('ejs');

mongoose.connect('mongodb://127.0.0.1/shop_db').then((result) => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const seedProduct = [
    {
        name: 'Casual Shirt',
        brand: 'Nike',
        price: 150000,
        color: 'Red',
        category: 'Baju'
    },
    {
        name: 'Tracktop',
        brand: 'Adidas',
        price: 300000,
        color: 'Black',
        category: 'Jaket'
    },
    {
        name: 'Pullover Black',
        brand: 'Puma',
        price: 250000,
        color: 'Grey',
        category:'Jaket'
    },
    {
        name: 'Jogger Pants',
        brand: 'Uniqlo',
        price: 200000,
        color: 'Blue',
        category: 'Celana'
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