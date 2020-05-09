const express= require('express');
const app=express();
const fs = require('fs');
const multer = require('multer');


const {TesseractWorker}=require('tesseract.js');
const worker = new TesseractWorker();
const storage =multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,"./uploads");
  },
  filename:(req,file,cb)=>{
   cb(null,file.originalname)
  }
});
const upload = multer({ storage: storage }).single('avtar');

app.set('view engine','ejs');
app.use(express.static("public"));


app.get('/',function(req,res){
  return res.render('index');
})
app.post('/uploads',function(req,res){
upload(req,res,err =>{
  fs.readFile(`./uploads/${req.file.originalname }`,(err,data)=>{
    if(err){
      return console.log("Error",err);
    }
    worker
    .recognize(data,"eng",{tessjs_create_pdf:'1'})
    .progress(progress=>{
      console.log(progress);
    })
    .then(result=>{
      res.redirect("/download");
    })
    .finally(()=> worker.terminate());
  })
  console.log(req.file);
})
console.log("hello");
})
app.get("/download",function(req,res){
const file=`${__dirname}/tesseract.js-ocr-result.pdf`;
console.log("Hello");
res.download(file);
})

const port=5000 || process.env.PORT;
app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    console.log("Server is runinig at:",port);
});



