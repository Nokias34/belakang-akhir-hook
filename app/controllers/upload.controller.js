const fs = require("fs");
const db = require("../models");
const Image = db.images;



const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.status(404).send({
        status : false,
        message : `You must select a file.`
      });
    }

    Image.create({
      type: req.file.mimetype,
      name: `istar-${req.file.originalname}`,
      // data: fs.readFileSync(
      //   __basedir + "/resources/static/assets/uploads/" + req.file.filename
      // ),
    }).then((image) => {
      // fs.writeFileSync(
      //   //__basedir + "/resources/static/assets/tmp/" + image.name,
      //   image.name,
      //   image.data
      // );

      return res.send({
        status : true,
        message : `File has been uploaded.`
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      status : false,
      message : `Error when trying upload images: ${error}`
    });
  }
};

//find a single

const findAll =  (req, res) => {


  Image.findAll().then(data => {
    const dat = data.map(dt => {
      //tidy up the user data
      return Object.assign(
        {},
        {
          id: dt.id,
          name: dt.name,
          type: dt.type,
          url :  req.get('host')+"/resources/static/assets/uploads/"+dt.name,
          createdAt : new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              hour: 'numeric', minute: 'numeric', second: 'numeric', 
              timeZone: 'Asia/Jakarta',
             
              
            }).format(dt.createdAt),
          updatedAt : new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              hour: 'numeric', minute: 'numeric', second: 'numeric', 
              timeZone: 'Asia/Jakarta',
             
            }).format(dt.updatedAt),
    
        });
      });
  res.send(dat);
      })
  .catch(err => {
      res.status(500).send({
          status:false,
          message : err.message || "something error while retrieving data "
      });
  });

};



const findName =  (req, res) => {
  const name = req.params.name;

  Image.findOne({where : {name :  name}}).then(data => {
   //res.send(data);
    res.download(__basedir+'/resources/static/assets/uploads/'+data.name);
      })
  .catch(err => {
      res.status(500).send({
          status:false,
          message : err.message || "something error while retrieving data "
      });
  });

};

// app.get('/someImageUrlOnlyForAuthorizedUsers.jpg', function(req,res){
//   if(req.user){
//       res.sendFile('./mySecretImage.jpg');
//   } else {
//       res.status(401).send('Authorization required!');
//   }
// });

module.exports = {
  uploadFiles,
  findAll,
  findName
};

