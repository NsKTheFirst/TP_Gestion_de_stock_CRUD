/*global window /
/global document /
/global console /
/jshint esversion :  6 /
/jslint multivar, browser: true */
/**
 * @file Gestion du stock
 * @author : Nicolas Jouenne
 * @copyright bizOnline 2018
 * @version 1.0
 */


const appClient = (function appClient() {
	"use strict";
	console.log("hello world of full stacks !!");
  var gerProd, gerBrand, prodClass, marClass, secProd, secMar, url = "http://localhost:8082", marque, nom, prix, description, name;

	const doAjax = function doAjax(url, method, callback, data) {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json'); // on paramètre un peu l'entête de notre requête
      data = data ? JSON.stringify(data) : null;

      if (method.toLowerCase() === "post") {
        if (!data) throw new Error("bad call");
      }
      // on attend le retour de l'appel AJAX
      xhr.onload = evt => callback(evt.target.response || evt.srcElement.response);

      xhr.send(data);

    } catch(err) { console.error(err); }
  };

  const activateProd = function activateProd () {
    
    console.log(prodClass);
    console.log(marClass);
    if ((prodClass === "inactive") && (marClass === "inactive")){
      secProd.classList.remove("inactive");
    }
    if (marClass != "inactive") {
      secProd.classList.remove("inactive");
      secMar.classList.add("inactive");
    }
  };

  const activateBrand = function activateBrand () {
    if ((marClass === "inactive") && (prodClass === "inactive")){
      secMar.classList.remove("inactive");
    }
    if (prodClass != "inactive") {
      secMar.classList.remove("inactive");
      secProd.classList.add("inactive");
    }
  };

  const refresh = function refresh() {
    document.location.reload(true);
  };

  const simulClick = function simulClick () {
    gerProd.click();
  };

  const createProd = function createProd(e) { //déclenchée par submit FORM
    doAjax(url + "/api/v1/produit", "POST", res => {
      console.log(JSON.parse(res)); // faire quelque chose ici si erreur : )
    }, getFormValues()); // récupérer les valeurs actuelles du form
    console.log(getFormValues());
    alert("Le produit a été créé, veuillez rafraichir la page.");
  };

  const getFormValues = function getFormValues() {
    return {
      id_marque: marque.value,
      nom: nom.value,
      prix: prix.value,
      description: description.value
    };
  };

  const deleteProd = function deleteProd (){
    const idToDelete = Number(this.id.split("_")[1]);
    doAjax(url + "/api/v1/produit", "DELETE", res => {
      console.log(JSON.parse(res));
    }, {ids: idToDelete});
    alert("Le produit a été supprimé, veuillez rafraichir la page.")
  };

  const getDelBtn = function getDelBtn () {
    var delBtn = document.getElementsByClassName("delBtn");
    var tabDelBtn = Array.from(delBtn);
    console.log(tabDelBtn);
    tabDelBtn.forEach(function(btn) {
      btn.onclick = deleteProd;
    });
  };

  const editProd = function editProd () {
    const idToEdit = Number(this.id.split("_")[1]);
    var obj = {};
    obj.id = idToEdit;
    obj.id_marque = marque.value;
    obj.nom = nom.value;
    obj.prix = prix.value;
    obj.description = description.value;
    doAjax(url + "/api/v1/produit", "PATCH", res => {
      console.log(JSON.parse(res));
    }, obj);
    alert("Le produit a été modifié, veuillez rafraichir la page.")
  };

  const getEditBtn = function getEditBtn () {
    var editBtn = document.getElementsByClassName("editBtn");
    var tabEditBtn = Array.from(editBtn);
    console.log(tabEditBtn);
    tabEditBtn.forEach(function(btn) {
      btn.onclick = editProd;
    });
  };

  const createBrand = function createBrand(e) { //déclenchée par submit FORM
    doAjax(url + "/api/v1/marque", "POST", res => {
      console.log(JSON.parse(res)); // faire quelque chose ici si erreur : )
    }, getFormValues2()); // récupérer les valeurs actuelles du form
    console.log(getFormValues2());
    alert("La marque a été créée, veuillez rafraichir la page.")
  };

  const getFormValues2 = function getFormValues2 () {
    return {
      name: name.value,
    };
  };

  const brandToDelete = function brandToDelete(){
    const idToDelete = Number(this.id.split("_")[1]);
    doAjax(url + "/api/v1/marque", "DELETE", res => {
      console.log(JSON.parse(res));
    }, {ids: idToDelete});
    alert("La marque a été supprimée, veuillez rafraichir la page.")
  };

  const getDelBtn2 = function getDelBtn2 () {
    var delBtn2 = document.getElementsByClassName("delBtn2");
    var tabDelBtn2 = Array.from(delBtn2);
    console.log(tabDelBtn2);
    tabDelBtn2.forEach(function(btn) {
      btn.onclick = brandToDelete;
    });
  };
  
  const brandToEdit = function brandToEdit () {
    const idToEdit = Number(this.id.split("_")[1]);
    var obj = {};
    obj.id = idToEdit;
    obj.name = name.value;
    doAjax(url + "/api/v1/marque", "PATCH", res => {
      console.log(JSON.parse(res));
    }, obj);
    alert("La marque a été modifiée, veuillez rafraichir la page.") 
  };

  const getEditBtn2 = function getEditBtn2 () {
    var editBtn2 = document.getElementsByClassName("editBtn2");
    var tabEditBtn2 = Array.from(editBtn2);
    console.log(tabEditBtn2);
    tabEditBtn2.forEach(function(btn) {
      btn.onclick = brandToEdit;
    });
  };

  const start = function start (){
    secProd = document.getElementById("produits");
    secMar = document.getElementById("marques");
    prodClass = secProd.className;
    marClass = secMar.className;
    gerProd = document.getElementById("gerProd");
    gerBrand = document.getElementById("gerBrand");
    marque = document.getElementById("brandName");
    nom = document.getElementById("prodName");
    prix = document.getElementById("prodPrix");
    description = document.getElementById("description");
    name = document.getElementById("nomBrand")
    gerProd.onclick = activateProd;
    gerBrand.onclick = activateBrand;
    const btnNewProd = document.getElementById("newProd");
    btnNewProd.onclick = createProd;
    const btnNewBrand = document.getElementById("newBrand")
    btnNewBrand.onclick = createBrand;
    getDelBtn();
    getEditBtn();
    getDelBtn2();
    getEditBtn2();
  };

   window.addEventListener("DOMContentLoaded", start);
}());

