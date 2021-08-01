module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transactions", {
      basket_num: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      hshd_num: {
        type: Sequelize.STRING,
      },
      purchase_date: {
        type: Sequelize.DATE,
      },
      product_num: {
        type: Sequelize.STRING,
      },
      spend: {
        type: Sequelize.STRING,
      },
      units: {
        type: Sequelize.STRING,
      },
      store_region: {
        type: Sequelize.STRING,
      },
      week_num: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.STRING,
      },
    }, {
        timestamps: false
    });
  
    return Transaction;
  };