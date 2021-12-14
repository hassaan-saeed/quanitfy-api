const express = require('express');
var controllerEmployee = require('../controllers/employee');

var router = express.Router();


// router.post("/login", controllerEmployee.login);
// router.post("/createSub-account" , checkAuth, controllerEmployee.createSubaccount);
// router.get("/sub-accounts" , checkAuth ,controllerEmployee.viewSubaccounts);
// router.delete('/:subId', checkAuth ,controllerEmployee.deleteSubaccount);


module.exports = router;