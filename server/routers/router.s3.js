const multer = require('multer');
const Router = require('express').Router();
const s3Controller = require('../controllers/controller.s3');

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in 54 Megabytes
  limits: { fileSize: 52428800 },
});

Router.post('/upload/:authId', upload.single('theseNamesMustMatch'), s3Controller.uploadPhotos);
Router.get('/images/:authId', s3Controller.getPhotos);
Router.post('/profilepic/:authId/:type', upload.single('theseNamesMustMatch'), s3Controller.uploadProfilePic);
Router.get('/profilepic/:authId/:type', s3Controller.getProfilePic);
Router.post('/certificatepic/:authId/:type', upload.single('theseNamesMustMatch'), s3Controller.uploadCertificatePic);
Router.get('/verify/:snypprId/', s3Controller.getCertificatePic);

module.exports = Router;
