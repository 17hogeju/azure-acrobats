module.exports = app => {
    const hshds = require("../controllers/hshdnums.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve a single Tutorial with id
    router.get("/hshd_nums", hshds.findHshdNums);

    app.use('/api', router);
  };