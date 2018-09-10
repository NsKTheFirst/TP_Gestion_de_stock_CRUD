/* jshint esversion : 6 */

// @root/api/index.js

// ROUTAGE DE L'API
const api = function api() {

  const APIVersion = 1; // notre api est en version 1

  const database = require(__dirname + "/../model")({
    password: "", // définition du mot de passe de mySQL
    database: "gestion_stock_crud" // base de donnée cible
  });

  // IMPORT DES ROUTES DE l'API produit
  const routers = []; // on expotera ce tableau une fois rempli
  const produitRouter = require("./produit")(database.connection); // module api user
  routers.push(produitRouter);
  ///////////////////////////////////
  // C'est à vous pour la suite ....
  ///////////////////////////////////

  // IMPORT DES ROUTES DE l'API marque
  const marqueRouter = require("./marque")(database.connection); // module api user
  routers.push(marqueRouter);

  return { // définition des propriétés publiques du module /api/index.js
    version: APIVersion,
    prefix: `/api/v${APIVersion}`,
    routers: routers
  }; // on récupère ces valeurs dans @root/index.js
};

module.exports = api;
