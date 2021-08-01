const db = require("../models");
const sequelize = db.sequelize;


exports.findHshdNums = (req, res) => {
    sequelize.query(`
    select btrim(hshd_num) 
    from kroger.households
    order by btrim(hshd_num)`).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hshds."
      });
    });
}