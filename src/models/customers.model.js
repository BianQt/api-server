'use strict';

const customers = (sequelize, DataTypes) => sequelize.define('customers', {
    firstName:{ type:DataTypes.STRING, allowNull: false},
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_num: DataTypes.INTEGER
});

module.exports = customers;