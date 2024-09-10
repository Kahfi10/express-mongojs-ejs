const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const ErrorHandler = require('./ErrorHandler');

const Product = require('./models/products');

mongoose.connect('mongodb://127.0.0.1/shop_db').then((result) => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send('Hello Kahfi');
})

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    }else {
        const products = await Product.find({});
        res.render('products/index', { products, category:'All' });
    }
})
app.get('/products/create', (req, res) => {
    res.render('products/create');
})

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect(`/products/${product._id}`);
})

app.get('/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render('products/show', { product });
    } catch (error) {
        next(new ErrorHandler(404, 'Product Not Found'));
    }
})
app.get('/products/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render('products/edit', { product });
    } catch (error) {
        next(new ErrorHandler(412, 'Gagal Edit Product'));
    }
})

app.put('/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
    } catch (error) {
        next(new ErrorHandler(412, 'Gagal Update Product'));
    }
})

app.delete('/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        await Product.findByIdAndDelete(id)
        res.redirect('/products')
    } catch (error) {
        next(new ErrorHandler(412, 'Gagal Delete Product'));
    }
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('Server is running on http://127.0.0.1:3000');
});