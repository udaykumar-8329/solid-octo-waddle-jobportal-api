require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const rtsIndex = require('./routes/index.router');
const multer = require('multer')
var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.get('/',(req,res)=>{
    res.status(200).send({"name":"uday kumar thota"});
})

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `Resume_${file.originalname.split('.')[0]}_`+Date.now()+'.'+file.originalname.split('.')[1])
    }
  })
  
const upload = multer({ storage: storage })
// POST File
app.post('/api/file/upload', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })

// app.get('/api/download/:path', function(req, res){
//     console.log(req.params.path);
//     const file = `${__dirname}/`+req.params.path;
//     res.download(file);
// });

app.use('/api', rtsIndex);

// start server
app.listen(process.env.PORT || 3000, () => console.log(`Server started at port : ${process.env.PORT}`));