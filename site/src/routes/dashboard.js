var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/capturarPontos", function (req, res) {
    dashboardController.capturarPontos(req, res);
});

module.exports = router;