const multer = require("multer");


const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir +"/resources/static/assets/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `istar-${file.originalname}`);
  },
});

// // var multer  = require('multer');
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, __basedir +'/resources/static/assets/uploads');
//     },
//     filename: (req, file, cb) => {
//       console.log(file);
//       var filetype = '';
//       if(file.mimetype === 'image/gif') {
//         filetype = 'gif';
//       }
//       if(file.mimetype === 'image/png') {
//         filetype = 'png';
//       }
//       if(file.mimetype === 'image/jpeg') {
//         filetype = 'jpg';
//       }
//       cb(null, 'image-' + Date.now() + '.' + filetype);
//     }
// });
// //var upload = multer({storage: storage});

var upload = multer({ storage: storage, fileFilter: imageFilter });
module.exports = upload;
