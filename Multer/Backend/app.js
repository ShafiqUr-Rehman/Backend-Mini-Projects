//Backend >> app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

mongoose.connect("mongodb://127.0.0.1:27017/Multer&CrudOperations");
const userModel = require("./models/file");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Public/images') ; // set path according to where you want to store the files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage });

// the above part is I copy form the npm multer => disstorage

app.post("/upload", upload.single("file"), (req, res) => {
 userModel.create({img : req.file.filename})
 .then(result =>  res.json(result))
 .catch(err => console.log(err))
});

app.get("/getimg", (req,res)=>{
  userModel.find()
  .then(users => res.json(users))
  .catch(err=> res.json(err))
})


app.listen(3000, () => {
  console.log('server is running on port 3000')
})