--Question 1: a: Do households spend less or more for one household?
--Time series chart: 
with uniq_trans as (
-- remove duplicates
select distinct basket_num, hshd_num, product_num, purchase_date::timestamp, cast(spend as float)
from kroger.transactions 
where btrim(hshd_num) = '0010'
)
select hshd_num, date_trunc('week', purchase_date::timestamp) as purchase_week, sum(spend) as weekly_spending
from uniq_trans
group by hshd_num, purchase_week
order by purchase_week


--Julia: you just need to replace 0010 with any other house hold number to get calculation for that household
-- you can just display the results of this calculation in text messages
with uniq_trans as (
-- remove duplicates
select distinct basket_num, hshd_num, product_num, purchase_date::timestamp, cast(spend as float)
from kroger.transactions 
where btrim(hshd_num) = '0010'
),
min_max_date as (
select hshd_num, min(purchase_date) as min_transdate, max(purchase_date) as max_transdate
from uniq_trans
group by hshd_num
), 
trans_midpoint as (
select uniq_trans.hshd_num, purchase_date, spend, min_transdate + (max_transdate - min_transdate)/2 as mid_transdate
from uniq_trans 
left join min_max_date
on uniq_trans.hshd_num = min_max_date.hshd_num
)
select hshd_num, case when purchase_date < mid_transdate then 'early_half' else 'later_half' end time_group, sum(spend) as total_spending
from trans_midpoint
group by hshd_num, time_group
--hshd_num 0010 spent $5155 in early half of time, and spent $4299 in later half of the time. therefore, spend 5155-4299 = 856 less in later half of the time 


--Question 1 b: What categories are growing or shrinking with changing customer engagement?
--Question 1 c: How might we re-engage customers within the store? Or within a specific category?
--Julia, You just need to replace the 0010 with any household number to get calculations for that household
--You can show a bar chart for the following sql results
--Answer: send out coupons for categories that sees the most decreases to reengage with customer. For example, hshd 0010 will be tobacco products in commodity code
with uniq_trans as (
-- remove duplicates
select distinct basket_num, hshd_num, product_num, purchase_date::timestamp, cast(spend as float)
from kroger.transactions 
where btrim(hshd_num) = '0010'
),
uniq_prod as (
select distinct product_num, department, commodity, brand_ty, natural_organic_flag
from kroger.products
),
min_max_date as (
select hshd_num, min(purchase_date) as min_transdate, max(purchase_date) as max_transdate
from uniq_trans
group by hshd_num
), 
trans_midpoint as (
select uniq_trans.hshd_num, uniq_trans.product_num, purchase_date, spend, min_transdate + (max_transdate - min_transdate)/2 as mid_transdate, department, commodity, brand_ty, natural_organic_flag 
from uniq_trans 
left join min_max_date
on uniq_trans.hshd_num = min_max_date.hshd_num
left join uniq_prod
on uniq_trans.product_num = uniq_prod.product_num
),
commodity_calc as (
select case when purchase_date < mid_transdate then 'early_half' else 'later_half' end time_group, commodity, sum(spend) as total_spend
from trans_midpoint
group by commodity, time_group
order by commodity, time_group
), 
commodity_wind as (
select time_group, commodity, total_spend, LAG(total_spend,1) OVER (partition by commodity) early_half_spending
from commodity_calc
),
commodity_delta as (
select commodity, (total_spend - early_half_spending) as later_half_minus_first_half
from commodity_wind
where early_half_spending is not null
)
select * from commodity_delta
order by later_half_minus_first_half


--Question 2: Which demographic factors (e.g. household size, presence of children, income) appear to affect customer engagement?
--How do they affect customer engagement with certain categories?  
--Note: Julia, show a bar chart on the following result. the one with highest average_household_spending appears to have highest positive influence on customer engagement, 
--the one with the lowest average_household_spending have highest negative influence on customer engagement
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
order by average_household_spending