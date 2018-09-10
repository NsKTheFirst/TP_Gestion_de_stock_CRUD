/* jshint esversion : 6 */

// @root/index.js

const express = require("express");
const port = 8082;
const app = express();
const baseURL = `http://localhost:${port}`;
const api = require(__dirname + "/api")(app);
const http = require('http');

// APP CONFIG !!!
app.use(express.json({
    extended: false
}));
app.use(api.prefix, api.routers);
app.set('view engine', 'ejs'); // CHECK THE DOC http://ejs.co/
app.set('views', __dirname + '/view'); //  précise à express le dossier des vues
// définition de ressources statiques...
app.use('/ejs', express.static(__dirname + '/node_modules/ejs'));
app.use(express.static(__dirname + '/public'));


// TEMPLATE VARS !!!
// Accessibles dans tout le template via app.locals (API express)
app.locals.site = {};
app.locals.baseURL = baseURL;
app.locals.site.title = "TP - Gestion du Stock III";
app.locals.site.description = "C.R.U.D. gestion de stock";
app.locals.site.nav = [
  {label: "Stock", route: "/"},
];

// ROUTES DES PAGES DE l'APPLICATION
// app.get('/', function(req, res) {
//   res.render('index', {nom: "The Dude"});
//   // on passe un objet ({nom: "gui"}) à la vue, utilisable dans le template EJS
// });

app.get('/', function(req, res) {
  const url = "http://localhost:8082/api/v1/produit";
  const url2 = "http://localhost:8082/api/v1/marque";
  var result = [];

  http.get(url, function (response){
   response.on("data", function (chunk){
     result[0] = chunk;
       });

  http.get(url2, function (response){
    response.on("data", function (chunk){
      result[1] = chunk;
    });
    response.on("end", function () {
            res.render("index", {
                produits: JSON.parse(result[0]),
                marques: JSON.parse(result[1])
    })
    });
    response.on("error", function () {
            console.error("erreur")
        });
    });
});
});

app.listen(port, function() {
  console.log("node server started on port " + port);
});
