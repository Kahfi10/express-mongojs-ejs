const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Product = require('./models/products');

mongoose.connect('mongodb://127.0.0.1/shop_db').then((result) => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello Kahfi');
})

app.get('/products', async (req, res) => {
    const product = await Product.find({});
    res.render('products/index', { product });
})
app.get('/products/create', (req, res) => {
    res.render('products/create');
})

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect(`/products/${product._id}`);
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product });
})


app.listen(3000, () => {
    console.log('Server is running on http://127.0.0.1:3000');
});