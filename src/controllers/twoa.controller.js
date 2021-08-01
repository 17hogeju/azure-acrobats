const db = require("../models");
const sequelize = db.sequelize;


exports.findTwoA = (req, res) => {
    sequelize.query(`
    with uniq_trans as (
        select distinct basket_num, hshd_num, product_num, purchase_date::timestamp, cast(spend as float)
        from kroger.transactions 
        ), 
        uniq_hhd as (
        select distinct hshd_num, btrim(loyalty_flag) as loyalty_flag, btrim(age_range) as age_range, btrim(marital_status) as marital_status, btrim(income_range) as income_range, btrim(homeowner_desc) as homeowner_desc, btrim(hshd_composition) as hshd_composition,
        btrim(hh_size) as hh_size, btrim(children) as children
        from kroger.households
        ),
        trans_hhd as (
        select uniq_trans.hshd_num, spend, loyalty_flag, age_range, marital_status, income_range, homeowner_desc, hshd_composition, hh_size, children
        from uniq_trans
        left join uniq_hhd
        on uniq_trans.hshd_num = uniq_hhd.hshd_num
        ), 
        loyalty_calc as (
        select hshd_num, loyalty_flag, sum(spend) as total_spend 
        from trans_hhd
        where loyalty_flag is not null
        group by hshd_num, loyalty_flag
        ),
        loyalty_result as (
        select concat('Loyalty_', loyalty_flag) as category, avg(total_spend)::integer as average_household_spending
        from loyalty_calc
        group by category
        ),
        age_range_calc as (
        select hshd_num, age_range, sum(spend) as total_spend 
        from trans_hhd
        where age_range is not null and age_range <> 'null'
        group by hshd_num, age_range
        ),
        age_range_result as (
        select concat('Age_Range_', age_range) as category, avg(total_spend)::integer as average_household_spending
        from age_range_calc
        group by category
        ), 
        marital_calc as (
        select hshd_num, marital_status, sum(spend) as total_spend
        from trans_hhd
        where marital_status is not null and btrim(marital_status) <> 'null'
        group by hshd_num, marital_status
        ), 
        maritial_result as (
        select concat('Marital_', marital_status) as category, avg(total_spend)::integer as average_household_spending
        from marital_calc
        group by category
        ), 
        income_range_calc as (
        select hshd_num, income_range, sum(spend) as total_spend
        from trans_hhd
        where income_range is not null and btrim(income_range) <> 'null'
        group by hshd_num, income_range
        ),
        income_range_result as (
        select concat('Income_Range_', income_range) as category, avg(total_spend)::integer as average_household_spending
        from income_range_calc
        group by category
        ), 
        homeowner_desc_calc as (
        select hshd_num, homeowner_desc, sum(spend) as total_spend
        from trans_hhd
        where homeowner_desc is not null and btrim(homeowner_desc) <> 'null'
        group by hshd_num, homeowner_desc
        ),
        homeowner_desc_result as (
        select concat('Homeowner_', homeowner_desc) as category, avg(total_spend)::integer as average_household_spending
        from homeowner_desc_calc
        group by category
        ), 
        hshd_composition_calc as (
        select hshd_num, hshd_composition, sum(spend) as total_spend
        from trans_hhd
        where hshd_composition is not null and btrim(hshd_composition) <> 'null'
        group by hshd_num, hshd_composition
        ),
        hshd_composition_result as (
        select concat('hshd_composition_', hshd_composition) as category, avg(total_spend)::integer as average_household_spending
        from hshd_composition_calc
        group by category
        ), 
        hh_size_calc as (
        select hshd_num, hh_size, sum(spend) as total_spend
        from trans_hhd
        where hh_size is not null and btrim(hh_size) <> 'null'
        group by hshd_num, hh_size
        ),
        hh_size_result as (
        select concat('hh_size_', hh_size) as category, avg(total_spend)::integer as average_household_spending
        from hh_size_calc
        group by category
        ),
        children_calc as (
        select hshd_num, children, sum(spend) as total_spend
        from trans_hhd
        where children is not null and btrim(children) <> 'null'
        group by hshd_num, children
        ),
        children_result as (
        select concat('children_', children) as category, avg(total_spend)::integer as average_household_spending
        from children_calc
        group by category
        ), 
        combined_result as (
        select * 
        from loyalty_result
        union 
        select *
        from age_range_result
        union 
        select * 
        from maritial_result
        union 
        select * 
        from income_range_result
        union 
        select * 
        from homeowner_desc_result
        union 
        select * 
        from hshd_composition_result
        union 
        select * 
        from hh_size_result
        union 
        select * 
        from children_result
        )
        select * from combined_result
        order by average_household_spending`).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving two a."
      });
    });
}