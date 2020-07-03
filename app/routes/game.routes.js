const {authJwt} = require("../middleware");
const artilce = require("../controllers/game.controller.js");
const router =  require("express").Router();

module.exports = app => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token,Origin,Content-Type,Accept"
        ) ;
 
        next(); 
    });
   

    //create
    app.post("/api/game", [authJwt.verifyToken],artilce.create);

    //retrieve all
    app.get("/api/game", [authJwt.verifyToken],artilce.findAll);

    //retrieve all published 
    app.get("/api/game/published", artilce.findAllPublished);

     //retrieve all game user
     app.get("/api/game/usercount", artilce.findGameUser);
    
    //retrieve all user 
    app.get("/api/game/user/:id",[authJwt.verifyToken], artilce.findAllUser);

    //retrieve a single game
    app.get("/api/game/:id",[authJwt.verifyToken], artilce.findOne);

    //update
    app.put("/api/game/:id",[authJwt.verifyToken], artilce.update);

    //delete by id 
    app.delete("/api/game/:id", [authJwt.verifyToken],artilce.delete);

    //delete by id 
    app.delete("/api/game/user/:id", [authJwt.verifyToken],artilce.deleteUser);

    //delete all
    app.delete("/api/game/",[authJwt.verifyToken], artilce.deleteAll);

    // app.use('/api/game', router);
};