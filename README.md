# Forkly


## Description

Version control for recipe sharing.

## Installing Dependencies

### npm
```
npm install
```

### bower
```
npm install -g bower
bower install
```

## API Queries

### Yummly
###### Performing GET requests to search for recipes

The base url for the Search Recipes GET is
`http://api.yummly.com/v1/api/recipes?_app_id=app-id&_app_key=app-key&your _search_parameters`
- *[query params](https://developer.yummly.com/documentation#Parameters)*
- *[guide to API response](https://developer.yummly.com/documentation#Consumer)*

###### Performing GET requests for Recipe IDs

The base url for the a Get Recipe GET is
`http://api.yummly.com/v1/api/recipe/recipe-id?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY`
where recipe IDs may be obtained from the Search Recipes call. The recipe ID is the part of a Yummly recipe page URL after the last slash:
`http://www.yummly.com/recipe/RECIPE-ID`
- *[guide to API response](https://developer.yummly.com/documentation#Recipe)*

## Team

  - Steve!
  - Eugene!
  - Dario!
  - Mycah!



