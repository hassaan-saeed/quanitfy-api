const express = require('express');
const controllerResult = require('../controllers/main');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file , cb) {
        cd(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({storage: storage, limits: {
    fileSize: 1024*1024 * 15 
}});

router.post("/createresult", checkAuth, upload.single('productImage'), controllerResult.create);

module.exports = router;