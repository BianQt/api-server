'use strict';

const express = require('express');
const {moviesCollection} = require('../models/index');

const moviesRouter = express.Router();

moviesRouter.get('/movies', getAllMovies);
moviesRouter.get('/movie/:id', getOneMovie);
moviesRouter.post('/movie', createMovie);
moviesRouter.put('/movie/:id', updateMovie);
moviesRouter.delete('/movie/:id', deleteMovie);

async function getAllMovies(req, res) {
    const allmovies = await moviesCollection.read();
    res.status(200).json(allmovies);

  }
  
  async function getOneMovie(req, res) {
    const id = parseInt(req.params.id); 
    const movie = await moviesCollection.read(id);
    res.status(200).json(movie);
  }
  
  async function createMovie(req, res) {
   
    const obj = req.body;
    console.log(obj)
    let movie = await moviesCollection.create(obj);
    res.status(201).json(movie);
  
  }
  
  async function updateMovie(req, res) {
    const id = parseInt(req.params.id);
    const obj = req.body;
    const updatedMovie = await moviesCollection.update(id,obj);
    res.status(201).json(updatedMovie);
  }
  
  async function deleteMovie(req, res) {
    const id = parseInt(req.params.id);
    const deletedMovie = await moviesCollection.delete(id);
    res.status(204).json(deletedMovie);
  }
  
  
  module.exports = moviesRouter;