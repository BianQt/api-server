'use strict';

const express = require('express');
const {customersCollection} = require('../models/index');

const booksRouter = express.Router();

booksRouter.get('/customers', getAllCustomers);
booksRouter.get('/customer/:id', getOneCustomer);
booksRouter.post('/customer', createCustomer);
booksRouter.put('/customer/:id', updateCustomer);
booksRouter.delete('/customer/:id', deleteCustomer);

async function getAllCustomers(req, res) {
    const allbooks = await customersCollection.read();
    res.status(200).json(allbooks);

  }
  
  async function getOneCustomer(req, res) {
    const id = parseInt(req.params.id); 
    const customer = await customersCollection.read(id);
    res.status(200).json(customer);
  }
  
  async function createCustomer(req, res) {
    const obj = req.body;
    let customer = await customersCollection.create(obj);
    res.status(201).json(customer);
  
  }
  
  async function updateCustomer(req, res) {
    const id = parseInt(req.params.id);
    const obj = req.body;
    const updatedCustomer = await customersCollection.update(id,obj);
    res.status(201).json(updatedCustomer);
  }
  
  async function deleteCustomer(req, res) {
    const id = parseInt(req.params.id);
    const deletedCustomer = await customersCollection.delete(id);
    res.status(204).json(deletedCustomer);
  }
  
  
  module.exports = booksRouter;