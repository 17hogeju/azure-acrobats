const db = require("../models");
const Household = db.households;



exports.findAllHouseHolds = (req, res) => {

  Household.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving households."
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const household = {
    hshd_num: req.body.hshd_num,
    loyalty_flag: req.body.loyalty_flag,
    age_range: req.body.age_range ,
    marital_status: req.body.marital_status,
    homeowner_desc: req.body.homeowner_desc,
    income_range: req.body.income_range,
    hshd_composition: req.body.hshd_composition,
    hh_size: req.body.hh_size,
    children: req.body.children
  };

  // Save Tutorial in the database
  Household.create(household)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
  };
