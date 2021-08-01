const db = require("../models");
const Household = db.households;

const fs = require("fs");
const csv = require("fast-csv");

const upload = async (req, res) => {
  try {
    if (req.body.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let households = [];
    let path = __basedir + "/resources/static/assets/uploads/" + req.body.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
          console.log(path);
        throw error.message;
      })
      .on("data", (row) => {
        households.push(row);
      })
      .on("end", () => {
        Household.bulkCreate(households, {updateOnDuplicate: ["hshd_num"]})
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.body.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};


module.exports = {
  upload
};