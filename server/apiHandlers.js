const querystring = require('querystring')
const { YUMMLY_APP_ID, YUMMLY_APP_KEY, SPOONACULAR_KEY } = require('./setup')
const axios = require('axios')

/**
 * Yummly API Search Recipe Helpers
 */
const yummlyURL = 'http://api.yummly.com/v1/api/'
const spoonacularURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract'

const diets = {
  0: 'nutrition^nutrition-low-carb',
  1: 'nutrition^nutrition-low-sugar',
  2: '393^Gluten-Free',
  3: '396^Dairy-Free',
  4: '390^Vegan',
  5: '385^Lacto-ovo+vegetarian'
}

const searchParams = {
  _app_id: YUMMLY_APP_ID,
  _app_key: YUMMLY_APP_KEY,
  q: null,
  'allowedIngredient[]': null,
  'excludedIngredient[]': null,
  'allowedAttribute[]': [],
  'allowedAllergy[]': [],
  'allowedDiet[]': []
}

const composeRequest = (params) => {
  /**
   * If params = recipeID, we compose a Get Recipe request
   */
  if (typeof params === 'string') {
    const queryString = yummlyURL + `recipe/${params}?_app_id=${YUMMLY_APP_ID}&_app_key=${YUMMLY_APP_KEY}`
    return queryString
  }
  /**
   * If params = object of search filters, we compose a Search Recipes request
   */
  const { dish, allowedIngredient, excludedIngredient, dietKeys } = params
  const dishName = dish.split(' ').join('+')
  // /**
  //  * Converting search filters to required format, to set on object and stringify
  //  */
  searchParams.q = dishName
  searchParams['allowedIngredient[]'] = allowedIngredient
  searchParams['excludedIngredient[]'] = excludedIngredient
  dietKeys.forEach(key => {
    const diet = diets[key];
    (key === 0 || key === 1) && searchParams['allowedAttribute[]'].push(diet);
    (key === 2 || key === 3) && searchParams['allowedAllergy[]'].push(diet);
    (key === 4 || key === 5) && searchParams['allowedDiet[]'].push(diet)
  })
  // /**
  //  * Using querystring to stringify the search paramaters and compose a query URL
  //  */
  const searchParamsString = querystring.stringify(searchParams)
  const queryString = yummlyURL + `recipes?` + searchParamsString
  return queryString
}

exports.yummlySearchRecipes = (req, res) => {
  const params = req.body
  axios.get(composeRequest(params))
  .then(({ data }) => {
    const recipe = data.matches[0]
    const { id, ingredients, recipeName } = recipe
    const response = { id, ingredients, recipeName }
    res.status(200).send(response)
  })
/* * implement proper error handling * */
  .catch(error => console.log(error))
}

exports.spoonacularGetRecipe = (req, res) => {
  const { recipeID } = req.body
  axios.get(composeRequest(recipeID))
  .then(results => {
    const recipeURL = results.data.source.sourceRecipeUrl
    const recipeIMG = results.data.images[0].hostedLargeUrl
    axios.get(spoonacularURL, {
      params: {
        url: recipeURL,
        forceExtraction: 'false'
      },
      headers: {
        'x-mashape-key': SPOONACULAR_KEY
      }
    })
    .then(({ data }) => {
      const { readyInMinutes, instructions } = data
      const recipeMethods = instructions.split('\n').slice(2, -2).map((line) => {
        return line.slice(4, -5)
      })
      const response = { readyInMinutes, recipeMethods, recipeIMG }
      res.status(200).send(response)
    })
    /* * implement proper error handling * */
    .catch(error => console.log(error))
  })
  /* * implement proper error handling * */
  .catch(error => console.log(error))
}
