const db = require("../models");
const sequelize = db.sequelize;


const upload = async (req, res) => {
    try {

        let myquery = ``;
        if (req.body.table === "households") {
            myquery = myquery.concat(`insert into kroger.households (hshd_num,loyalty_flag, age_range,marital_status, income_range, homeowner_desc, hshd_composition, hh_size, children) values `);
            req.body.data.forEach(function (row, index) {
                let help = Array.from(row.data);
                myquery = myquery.concat(`(`);
                for (let i = 0; i < help.length - 1; i++) {
                    let temp = help[i];
                    myquery = myquery.concat(`'`, temp, `', `);
                }
                myquery = myquery.concat(`'`, help[help.length - 1], `')`);
                if (req.body.data.length > 1 && index < req.body.data.length - 1) {
                    myquery = myquery.concat(`,`);
                }
            });

        } else if (req.body.table === "products") {
            myquery = myquery.concat(`insert into kroger.products (product_num, department, commodity, brand_ty, natural_organic_flag) values `);
            req.body.data.forEach(function (row, index) {
                let help = Array.from(row.data);
                myquery = myquery.concat(`(`);
                for (let i = 0; i < help.length - 1; i++) {
                    let temp = help[i];
                    myquery = myquery.concat(`'`, temp, `', `);
                }
                myquery = myquery.concat(`'`, help[help.length - 1], `')`);
                if (req.body.data.length > 1 && index < req.body.data.length - 1) {
                    myquery = myquery.concat(`,`);
                }
            });

        } else if (req.body.table === "transactions") {
            myquery = myquery.concat(`insert into kroger.transactions (basket_num, hshd_num, purchase_date, product_num, spend, units, store_region, week_num, year) values `);
            req.body.data.forEach(function (row, index) {
                let help = Array.from(row.data);
                myquery = myquery.concat(`(`);
                for (let i = 0; i < help.length - 1; i++) {
                    let temp = help[i];
                    myquery = myquery.concat(`'`, temp, `', `);
                }
                myquery = myquery.concat(`'`, help[help.length - 1], `')`);
                if (req.body.data.length > 1 && index < req.body.data.length - 1) {
                    myquery = myquery.concat(`,`);
                }
            });
        }

        sequelize.query(myquery).then(data => {
            res.send(data);
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while updating households"
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