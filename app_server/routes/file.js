const express = require('express');
var controllerFile = require('../controllers/main');

var router = express.Router();

// router.get("/", checkAuth, controllerFile.viewUsersFile);
// router.get("/all", controllerFile.viewFile); //will not be in the final routes
// router.post("/save", checkAuth, controllerFile.save);
// router.delete('/:id', controllerFile.delete); //will not be in the final routes


module.exports = router;