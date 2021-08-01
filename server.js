const express = require("express");
const cors = require("cors");

const path = __dirname + '/build/';
global.__basedir = __dirname;
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.static(path));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");
const Role = db.role;
db.sequelize.sync();
// db.sequelize.sync({ force: true, logging: console.log }).then(() => {
//     console.log("Drop and re-sync db.");
//     initial();
// });

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to hogejr application." });
// });

// routes
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);
require('./src/routes/user-functions.routes')(app);
require('./src/routes/household.routes')(app);
require('./src/routes/onea.routes')(app);
require('./src/routes/twoa.routes')(app);
require('./src/routes/category.routes')(app);
require('./src/routes/upload.routes')(app);
require('./src/routes/hshdnums.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});