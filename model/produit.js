/*jshint esversion :  6 */

// @root/model/produit.js

const produitModel = function produitModel(connection) {

  const create = function createProd(clbk, data) {
    const q = "INSERT INTO produits (id_marque, nom, prix, description) VALUES (?, ?, ?, ?)";
    const payload = [data.id_marque, data.nom,data.prix, data.description];

    connection.query(q, payload, (err, res, cols) => {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      console.log(payload);
      return clbk(null, res);
    });
  };

  const remove = function deleteProd(clbk, ids) {
    // la clause SQL IN permet de chercher une valeur dans un tableau
    const q = "DELETE FROM produits WHERE id IN (?)";

    connection.query(q, [ids], function (err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(res, null);
      return clbk(null, res);
    });
  };

  const update = function editProd(clbk, produit) {
    const q = "UPDATE produits SET id_marque = ?, nom = ?, prix = ?, description = ? WHERE id = ?";
    const payload = [produit.id_marque, produit.nom, produit.prix, produit.description, produit.id];
    connection.query(q, payload, function (err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };

  const get = function getProd(clbk, id) {
    var sql;

    if (id && !isNaN(id)) {
      sql = "SELECT * FROM produits WHERE id = ?";
    } else {
      sql = "SELECT p.id, m.name as 'id_marque', p.nom, p.prix, p.description FROM produits p INNER JOIN marques m ON m.id=p.id_marque ORDER BY p.id";
    }

    connection.query(sql, [id], (error, results, fields) => {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (error) return clbk(error, null);
      return clbk(null, results);
    });
  };

  return {
    create,
    remove,
    update,
    get
  };
};

module.exports = produitModel;
