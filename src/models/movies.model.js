'use strict';

const movies = (sequelize, DataTypes) => sequelize.define('movies', {
    title:{ type:DataTypes.STRING, allowNull: false},
    category: DataTypes.STRING,
    rate:DataTypes.STRING ,
    release_date:DataTypes.INTEGER,
    customer_id:{ type:DataTypes.INTEGER, allowNull: false}
});

module.exports = movies;