const express= require('express');
const app=express();
const fs = require('fs');
const multer = require('multer');
// const { TesseractWorker } = require("tesseract.js");
// const worker = new TesseractWorker();


const { createWorker } =require( 'tesseract.js');

const worker = createWorker({
  logger: m => console.log(m)
});
 





let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, res, cb) {
      cb(null, req.file)
    }
  });
   
  var upload = multer({ storage: storage }).single('avatar');

app.set('view engine','ejs');


app.get('/',function(req,res){
  return res.render('index');
})



const port=5000 || process.env.PORT;
app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    console.log("Server is runinig at:",port);
});



