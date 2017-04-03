/**
 * If Heroku is NOT running, run on local computer and pull local info from setup.js
 */

 /**
  * If setup.js file is deleted, create it again in the server folder and paste this in ->
    process.env.CLIENT_ID = '279588619132464'
    process.env.CLIENT_SECRET = '32e346f0296b752354db3328bd6280d4'
    process.env.MONGODB_URI = 'mongodb://localhost/forkly-dev'
    process.env.SITE_URL = 'http://localhost:3000/'
  */

if (!process.env.CLIENT_ID) {
  /**
   * Note: index.js runs before setup.js (see server-dev script in package.json)
   */
  const setup = require('./setup')
}

const express = require('express')
const bodyParser = require('body-parser')
const items = require('../db')
const handler = require('./requestHandler')
const facebook = require('./facebook')
const passport = require('passport')
const path = require('path')
const { yummlySearchRecipes, spoonacularGetRecipe } = require('./apiHandlers')

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '/../react/dist')))

/**
 * Login / Authentication
 */
/* * Facebook passport authentication - don't move * */
app.use(express.session({ secret: 'rum ham' }))
app.use(express.cookieParser())
app.use(passport.initialize())
app.use(passport.session())

/* * Facebook passport * */
app.get('/auth/facebook',
  passport.authenticate('facebook')
)
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' })
  // function(req, res) {
  //   // Successful authentication, redirect home.
  //   res.redirect('/');
  // });
)

/* * Verify login * */
app.get('/verifylogin', (req, res) => {
  res.send(req.user)
})

/* * Handle logout * */
app.get('/logout', function (req, res) {
  req.logout()
  // req.session.destroy();
  res.redirect('/')
})

/**
 * Components
 */
/* * Home Component - from searchRecipes function * */
app.post('/searchRecipes', handler.searchRecipes)

/* * AddRecipe Component - from handleSubmit function * */
app.post('/api/addRecipe', handler.addRecipe)

/* * New Feature * */
app.post('api/addForkedRecipe', handler.addForkedRecipe)

/* * Nav Component - from getUsername function * */
app.get('/username', handler.getUsername)

/**
 * Request for API search
 */
/* * Search Recipes - Mycah * */
app.get('/api/recipes/search*', yummlySearchRecipes)

/* * Get Recipe Methods - Mycah * */
app.get('/api/recipes/methods*', spoonacularGetRecipe)

/**
 * Request for database search
 */
/* * Recipe search * */
app.post('/searchRecipes', handler.searchRecipes)

/* * Find all recipes for given user id * */
app.get('/getAllRecipes', handler.getUserRecipes)
app.post('/getRecipeById', handler.getRecipeById)

/* Legacy Group */
app.get('/api/recipes/:id', handler.getRecipeById)
app.get('/api/users/user', handler.getUserData)

// Unhandled routes
app.get('/*', (req, res) => res.redirect('/'))

/**
 * Roll out
 */
app.listen(port, function () {
  console.log('listening on port ' + port + '!')
})
