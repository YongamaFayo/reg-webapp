const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');


const model = require("./models");
const models = process.env.DATABASE_URL || 'postgresql://yongama:pg123@localhost:5432/regNum';

const regRoutes = require('./registration');
const regRoute = regRoutes(models);

var app = express();

app.use(express.static('../public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.set('trust proxy', 1) 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(flash());

 app.engine('hbs', exphbs({
     defaultLayout: 'main',
     extname: 'hbs'
 }));

app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render("regNum");
});

app.post('/', function (req, res) {
    regRoute.addFun(req, res);
});
app.post('/reg_Numbers', regRoute.filterData);



var server = app.listen(process.env.PORT || 3009, function () {

    var host = server.address().address;
    var port = server.address().port;



});
