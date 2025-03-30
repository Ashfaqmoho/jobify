require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./server/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

//connect database
connectDB();

app.use(express.urlencoded({ extended: true })); // For form POST data
app.use(express.json()); // For JSON payloads
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyword cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}));

app.use(express.static('public'));


//middleware
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


