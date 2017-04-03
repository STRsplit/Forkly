const express = require('express')
const request = require('request')
const fsPath =  require('fs-path')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const db = require('../db/index.js')

// for Home Component - from searchRecipes function
/** ORIGINAL **
exports.searchRecipes = function(req, res) {
  var searchTerm = req.body.searchTerm;

  // regex -> allows the search to contain string instead of === string
  // options i -> allows search to be case insensitive
  db.Recipe.find({name:{'$regex' : searchTerm, '$options' : 'i'}})
    .exec(function (err, recipe) {
      if (err)
        {
          return err;
        } else {
        res.json(recipe);
      }
  });
};
** ORIGINAL **/

exports.searchRecipes = function (req, res) {
  var searchTerm = req.body.searchTerm

  // regex -> allows the search to contain string instead of === string
  // options i -> allows search to be case insensitive
  // queues for the most forked recipe
  db.Recipe.find({name: {'$regex': searchTerm, '$options': 'i'}})
    .sort({'forks': -1}).limit(1).populate('forks').exec()
      .then(recipe => {
        console.log('exports.searchRecipes', recipe)
        res.json(recipe)
      })
      .catch(err => {
        console.log('exports.searchRecipes err:', err)
        res.status(500)
      })
}

// for Nav Component - from getUsername function
exports.getUsername = function (req, res) {
  if (req.user) {
    res.json(req.user.name)
  } else {
    res.json(null)
  }
}

// for viewRecipes Component - get all recipes for user
exports.getUserRecipes = function (req, res) {
  // remove this line when fb/login is back
  req.user = {_id: '58dc02b1950849860eb4b167', _creator: '58dc02b1950849860eb4b167' } 
  if (req.user) {
    db.User.findById(req.user._id)
    .limit(16) //change the limit if needed
    .populate('recipes')
    .exec(function (err, user) {
      res.send(user.recipes)
    })
  } else {
    res.end()
  }
}

exports.getUserData = function (req, res) {
  // remove this line when fb/login is back
  req.user = {_id: '58dc02b1950849860eb4b167', _creator: '58dc02b1950849860eb4b167' } 
  if (req.user) {
    db.User.findById(req.user._id)
    .limit(16) //change the limit if needed
    .populate('recipes')
    .populate('originalRecipes')
    .populate('_creator')
    .exec(function (err, user) {
      console.log(user)
      res.send(user)
    })
  } else {
    res.end()
  }
}


exports.addRecipe = function (req, res) {
  // remove this line when fb/login is back
  req.user = {_id: '58dc02b1950849860eb4b167', _creator: '58dc02b1950849860eb4b167' }
  
  if (req.user) {
    const currRecipe = req.body.currentRecipe
    const origRecipe = req.body.sendOriginalRecipe

    let currentRecipe = new db.Recipe({
      name: currRecipe.recipeName,
      ingredients: currRecipe.ingredients,
      directions: currRecipe.recipeDirections,
      _creator: req.user._id,
      image: currRecipe.image // remove this line when multiple uploading of image to the client is done
    })

    let originalRecipe = new db.Recipe({
      name: origRecipe.recipeName,
      ingredients: origRecipe.ingredients,
      directions: origRecipe.recipeDirections,
      _creator: req.user._id,
      image: origRecipe.image // remove this line when multiple uploading of image to the client is done
    })
    /* Uncomment when multiple uploading of image to the client is done */
    // convertToImageFile(currRecipe.image, currentRecipe._id)
    // originalRecipe.image = currentRecipe.image = `./recipes/images/${currentRecipe._id}.png`

    currentRecipe.save()
    .then(newCurrRecipe => {
      return originalRecipe.save()
    })
    .then(newOrigRecipe => {
      return db.User.findByIdAndUpdate(req.user._id, {$push: {recipes: currentRecipe._id, originalRecipes: originalRecipe._id}})
        .then((user) => {
          res.status(200).send(currentRecipe._id)
        })
      })
    .catch(err => res.status(500).send('error creating recipe'))

  } else {
    res.status(500).send('user not logged');
  }
}


exports.addForkedRecipe = function (req, res) {
  if (req.user) {

    db.Recipe.create(req.body.original)
      .then(origRecipe => {
        return db.Recipe.create(req.body.recipe)
          .then(updatedRecipe => {
            return db.User.findByIdAndUpdate(req.user._id, {$push: {recipes: updatedRecipe._id, originalRecipes: origRecipe._id}})
              .then((user) => {
                res.send(200)
              })
          })
      })
      .catch(err => {
        console.log('exports.addRecipe origRecipe err:', err)
        res.send(500)
      })
  } else {
    res.send(500)
  }
}

exports.getRecipeById = function (req, res) {
  const id = req.body.id || req.params.id
  db.Recipe.findById(id)
    .populate('forks')
    .populate('_creator')
    .then(recipe => {  
      console.log('exports.getRecipeById recipe:', recipe)  
      res.json(recipe)
    })
    .catch(err => console.log('exports.getRecipeById error: ', err))
}



const convertToImageFile = (imgString, filename) => {
  const base64Data = imgString.replace(/^data:image\/jpeg;base64,/, '')
  
  fsPath.writeFile(`./server/recipes/images/${filename}.jpeg`, base64Data, 'base64', function(err) {
    err ? console.log('convertToImageFile err', err) : console.log('convertToImageFile success')
  })
}
