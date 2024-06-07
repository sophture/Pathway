var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/capturarPontos", function (req, res) {
    dashboardController.capturarPontos(req, res);
});

router.get("/listarCidades", function(req,res){
    dashboardController.listarCidades(req,res)
})

router.get("/ranking", function(req,res){
    dashboardController.ranking(req,res)
})

module.exports = router;