const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const reg = require("./registration");
const flash = require("express-flash");
const session = require("express-session")


const app = express();
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://yongama:pg123@localhost:5432/registration';

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

app.post('/reg_numbers', async function (req, res) {
  let plate = req.body.regInput

  if (plate === '') {
    req.flash('error', 'Enter a registration number')
  } else if (!(/C[AKJ] \d{3,6}$/.test(plate))) {
    req.flash('error', 'Enter a correct registration number')
  } else {
    await registration.plateNumber(plate)
  }

  const plates = await registration.getReg()

  res.render('index', {
    plateNum: plates
  })

})




app.get("/reg_numbers", async function (req, res) {

  var indiReg = await registration.getReg()
  console.log(indiReg)

  res.render("index", {
    regDisplay: indiReg



  })

});
app.post('/reg_number', async function (req, res) {
  let area = req.body.town
  // console.log(area)
  const filtering= await registration.filter(area)
  res.render('index', {
      plateNum: filtering
  })
})


app.get('/reset', async function (req, res) {

  await registration.reset()

  res.render('index', {

  });

});






const PORT = process.env.PORT || 3009;
app.listen(PORT, function () {
  console.log("App started at port", PORT);
})

