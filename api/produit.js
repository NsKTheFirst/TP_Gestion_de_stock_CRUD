/* jshint esversion : 6 */

// @root/api/user.js

const prodAPi = function prodAPi(connection) {

  const router = require("express").Router();
  const produitModel = require("./../model/produit")(connection);

  router.post('/produit', (req, res) => {
    produitModel.create((err, dataset) => {
      res.send(dataset);
    }, req.body); // post datas ici ...
    console.log(req.body);
  });

  router.get('/produit/:id', (req, res) => {
    produitModel.get((err, dataset) => {
      res.send(dataset[0]);
    }, req.params.id);
  });

  router.get('/produit', (req, res) => {
    console.log("ca get");
    produitModel.get( (err, dataset) => {
      res.send(dataset);
    }, null);
  });

  router.delete('/produit', (req, res) => {
    produitModel.remove((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.body.ids); // tableau d'ids ici ...
  });

  router.patch('/produit', (req, res) => {
    produitModel.update((err, dataset) => {
      if (err) return res.status(500).send(err);
      else return res.status(200).send(dataset);
    }, req.body); // un tableau d'ids ici ...
  });

  return router;
};

module.exports = prodAPi;
