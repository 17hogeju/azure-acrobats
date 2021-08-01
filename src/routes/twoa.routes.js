module.exports = app => {
    const twoa = require("../controllers/twoa.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve a single Tutorial with id
    router.get("/twoa", twoa.findTwoA);

    app.use('/api', router);
  };