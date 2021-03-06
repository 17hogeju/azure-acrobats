const db = require("../models");
const sequelize = db.sequelize;


exports.findCategorySales = (req, res) => {
    sequelize.query(`select sum(cast(trim(ta.spend) as float)), trim(p.commodity) as "commodity",
    concat(extract(month from ta.purchase_date), '-20', extract(year from ta.purchase_date)) as "month/year" 
    from kroger.transactions as ta
    inner join kroger.products p on p.product_num = ta.product_num 
    group by p.commodity, extract(year from ta.purchase_date), extract(month from ta.purchase_date)`).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
  }