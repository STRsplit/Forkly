import React, { Component, PropTypes } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import style from './displayRecipesContainer-css'

const { container, gridList } = style

class DisplayRecipesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event, selectedRecipe) {
    this.props.setStateThroughProps(event, {activeRecipe: selectedRecipe})
    this.context.router.history.push('/home/viewrecipe')

  }
  render() {
    const { state, setRecipeState, setStateThroughProps, recipes, renderSelectedRecipe } = this.props
    
    return (
      <div style={container}>
        <GridList
          cellHeight={240}
          style={gridList}
          cols={4}
          rows={4}
        >
          <Subheader>{}</Subheader>
          {recipes.map((recipe, idx) => (
            <GridTile
              onClick={(event) => this.handleClick(event, recipe)}
              key={idx}
              title={recipe.name}
              subtitle={<span>by <b>{recipe._creator}</b></span>}
              actionIcon={<IconButton><StarBorder color='white' /></IconButton>}
            >
              <img src={recipe.image} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}
DisplayRecipesContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DisplayRecipesContainer
