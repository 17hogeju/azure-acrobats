const db = require("../models");
const sequelize = db.sequelize;


exports.findOneA = (req, res) => {
    sequelize.query(`
    with uniq_trans as (
      select distinct basket_num, hshd_num, product_num, purchase_date::timestamp, cast(spend as float)
      from kroger.transactions 
      where btrim(hshd_num) = cast(`+ req.params.hshd_num + ` as varchar)
      )
      select hshd_num, date_trunc('week', purchase_date::timestamp) as purchase_week, sum(spend) as weekly_spending
      from uniq_trans
      group by hshd_num, purchase_week
      order by purchase_week`).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions."
      });
    });
}