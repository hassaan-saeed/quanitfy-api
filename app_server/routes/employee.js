const express = require('express');
var controllerEmployee = require('../controllers/employee');

var router = express.Router();


router.post("/login", controllerEmployee.login);
router.post("/create-employee" , checkAuth, controllerEmployee.createSubaccount);
router.get("/employees" , checkAuth ,controllerEmployee.viewSubaccounts);
router.delete('/:subId', checkAuth ,controllerEmployee.deleteSubaccount);


module.exports = router;