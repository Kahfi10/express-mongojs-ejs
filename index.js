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

app.get('/', (req, res) => {
    res.send('Hello Kahfi');
})

app.listen(3000, () => {
    console.log('Server is running on http://127.0.0.1:3000');
});