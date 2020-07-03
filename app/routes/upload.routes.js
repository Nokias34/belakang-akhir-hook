const express = require("express");

const {upload} = require("../middleware");
const uploadController = require("../controllers/upload.controller.js");
// const router =  require("express").Router();
// const multer = require('multer');
//const uploadi = multer({dest: __dirname + '/resources/static/assets/uploads'});

module.exports = app => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token,Origin,Content-Type,Accept"
        ) ;
 
        next(); 
    });

 
    app.post("/upload", upload.single("file"), uploadController.uploadFiles);

  
    app.get("/files", uploadController.findAll);

    app.get("/resources/static/assets/uploads/:name", uploadController.findName);
    // app.post("/upload", upload.single("file"),function(req, res, next) {
    //     console.log(req.file);
    //     if(!req.file) {
    //       res.status(500);
    //       return next(err);
    //     }
    //     res.json({ fileUrl: 'http://192.168.0.7:3000/images/' + req.file.filename });
    //   });
    // app.use('/upload', router);
};