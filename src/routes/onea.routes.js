module.exports = app => {
    const onea = require("../controllers/onea.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve a single Tutorial with id
    router.get("/onea/:hshd_num", onea.findOneA);

    app.use('/api', router);
  };