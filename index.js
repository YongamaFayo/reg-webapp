const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const reg = require("./registration");
const flash = require("express-flash");
const session = require("express-session")


const app = express();
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:codex123@localhost:5432/registration';

const pool = new Pool({
  connectionString,

});

const registration = reg(pool);

app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: 'views/layouts' }));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


app.use(flash());


app.use(express.static('public'));


app.get("/", function (req, res) {

  res.render("index")
});

app.post("/reg_numbers", async function (req, res) {

  var reg = req.body.regInput;
  var lang = req.body.regDisplay;

  if(!reg){
    req.flash("error", "Please enter registration number")
    res.render("index");
  }

  res.render("index", {
    regDisplay: await registration.getReg(reg, lang),
    
  })
});


app.get("/reg_numbers", async function (req, res) {

  var indiReg = getReg()
        
        res.render("reg_numbers", {
            message: indiReg



  })

});


app.get("/reset", async function (req, res) {

  await registration.reset()

  res.render('index', {


  })

});






const PORT = process.env.PORT || 3009;
app.listen(PORT, function () {
  console.log("App started at port", PORT);
})



















// const express = require('express');
// const exphbs = require('express-handlebars');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const flash = require('express-flash');


// const model = require("./models");
// const models = process.env.DATABASE_URL || 'postgresql://yongama:pg123@localhost:5432/regNum';
// // console.log(models);
// const regRoutes = require('./registration');
// const regRoute = regRoutes(models);

// var app = express();

// app.use(express.static('../public'));

// app.use(bodyParser.urlencoded({
//     extended: false
// }));

// app.use(bodyParser.json());


// app.set('trust proxy', 1) 
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }))

// app.use(flash());

//  app.engine('hbs', exphbs({
//      defaultLayout: 'main',
//      extname: 'hbs'
//  }));

// app.set('view engine', 'hbs');

// app.get('/', function (req, res) {
//     res.render("regNum");
// });

// app.post('/', function (req, res) {
//     regRoute.addFun(req, res);
// });
// app.post('/reg_Numbers', regRoute.filterData);



// var server = app.listen(process.env.PORT || 3009, function () {

//     var host = server.address().address;
//     var port = server.address().port;



// });
