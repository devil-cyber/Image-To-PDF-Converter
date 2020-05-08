const express= require('express');
const app=express();
const fs = require('fs');
const multer = require('multer');
const {TesseractWorker} =require('tesseract.js')
const worker = new TesseractWorker();




let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, res, cb) {
      cb(null, req.file)
    }
  });
   
  var upload = multer({ storage: storage }).single('avatar');
