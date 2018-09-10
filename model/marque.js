/*jshint esversion :  6 */

// @root/model/produit.js

const marqueModel = function marqueModel(connection) {

  const create = function createBrand(clbk, data) {
    const q = "INSERT INTO marques (name) VALUES (?)";
    const payload = [data.name];

    connection.query(q, payload, (err, res, cols) => {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };

  const remove = function deleteBrand(clbk, ids) {
    // la clause SQL IN permet de chercher une valeur dans un tableau
    const q = "DELETE FROM marques WHERE id IN (?)";

    connection.query(q, [ids], function (err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(res, null);
      return clbk(null, res);
    });
  };

  const update = function editBrand(clbk, marque) {
    const q = "UPDATE marques SET name = ? WHERE id = ?";
    const payload = [marque.name, marque.id];
    connection.query(q, payload, function (err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };

  const get = function getBrand(clbk, id) {
    var sql;

    if (id && !isNaN(id)) {
      sql = "SELECT * FROM marques WHERE id = ?";
    } else {
      sql = "SELECT * FROM marques";
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

module.exports = marqueModel;