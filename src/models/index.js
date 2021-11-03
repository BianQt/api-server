'use strict';
require('dotenv').config();

const POSTGRE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL ;

const {Sequelize, DataTypes} = require('sequelize');

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {dialectOptions: {ssl: {require: true, rejectUnauthorized: false}}} : {};

let sequelize = new Sequelize(POSTGRE_URL, sequelizeOptions);

const  movies = require('./movies.model');
const  customers = require('./customers.model');
const Collection = require('../lib/Collection.lib');

const moviesModel = movies(sequelize, DataTypes);
const customersModel = customers(sequelize, DataTypes);

customersModel.hasMany(moviesModel,{foreignKey:'customer_id',sourceKey:'id'});
moviesModel.belongsTo(customersModel,{foreignKey:'customer_id',targetKey:'id'})

const customersCollection = new Collection(customersModel);
const moviesCollection = new Collection(moviesModel);

module.exports = {
    db : sequelize,
    customersCollection : customersCollection,
    moviesCollection : moviesCollection,
}