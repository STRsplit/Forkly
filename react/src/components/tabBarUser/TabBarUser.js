import React from 'react'
import style from './tabBarUser-css'
import {Tabs, Tab} from 'material-ui/Tabs'
import DisplayRecipesContainer from '../displayRecipesContainer/DisplayRecipesContainer'
const { headline } = style

/* * state, setStateThroughProps are passed in as Props * */
/* * state = {selectedView: 'User'} * */

/* * * CHANGED FORKED AND USERS RECIPES ALL TO ORDERED TO ENSURE COMPONENT RENDERED -> COULD NOT MAP OVER USERS OR FORKED AS THERE IS NO SUITABLE DATA * * */
const TabBarUser = ({ state, setStateThroughProps, recipeStats, renderSelectedRecipe }) => {
  const { orderedRecipes, forkedRecipes, usersRecipes } = recipeStats

  const handleChange = (event, index, selectedView) => {
    setStateThroughProps(event, selectedView)
    // or event.value?
  }

  return (
    <Tabs
      value={state.selectedView}
      onChange={handleChange}
      >
      <Tab label="User's Recipes" value='User'>
        <div>
          <h2 style={headline} />
          <DisplayRecipesContainer state={state} setStateThroughProps={setStateThroughProps} recipes={orderedRecipes} renderSelectedRecipe={renderSelectedRecipe} />
        </div>
      </Tab>
      <Tab label="User's Forks" value='Fork'>
        <div>
          <h2 style={headline} />
          <DisplayRecipesContainer state={state} setStateThroughProps={setStateThroughProps} recipes={orderedRecipes} renderSelectedRecipe={renderSelectedRecipe} />
        </div>
      </Tab>
      <Tab label='Recent Activity' value='Recent'>
        <div>
          <h2 style={headline} />
          <DisplayRecipesContainer state={state} setStateThroughProps={setStateThroughProps} recipes={orderedRecipes} renderSelectedRecipe={renderSelectedRecipe} />
        </div>
      </Tab>
    </Tabs>
  )
}
export default TabBarUser
