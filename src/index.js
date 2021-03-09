const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const port = 3000;
const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Quan ly routes
route(app);

//Template engine
app.engine('hbs', handlebars({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


app.listen(port, () => console.log(`App listening at http://localhost:${port}`));