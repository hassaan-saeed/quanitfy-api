const express = require('express');
var controllerUser = require('../controllers/user');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');


router.post("/signup", controllerUser.signup);
router.post("/login", controllerUser.login);
// router.get("/_id" , checkAuth,controllerUser.viewProfile);
// router.delete('/:id', checkAuth ,controllerUser.delete);

module.exports = router;