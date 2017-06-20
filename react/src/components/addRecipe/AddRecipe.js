import React, { Component, PropTypes } from 'react'
import IngredientsTable from '../ingredientsTable/IngredientsTable'
import style from './addRecipe-css.js'
import axios from 'axios'

const styleProps = {
  fixedHeader: true,
  fixedFooter: true,
  stripedRows: false,
  showRowHover: true,
  selectable: false,
  multiSelectable: false,
  enableSelectAll: false,
  deselectOnClickaway: true,
  showCheckboxes: false
}
const { recipeContainer } = style

const testData = {
  recipeName: '',
  recipeDirections: '',
  ingredients: [{quantity: '', units: '', ingredient: ''}],
  creator: '',
  image: '',
  originalRecipe: ''
}

class AddRecipe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentRecipe: this.props.state.activeRecipe || testData,
      originalRecipe: this.props.state.originalRecipe || '',
      isForking: this.props.state.isForking,
      edit: this.props.state.isForking
    }

    this.handleIngredientsChange = this.handleIngredientsChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRecipeSave = this.handleRecipeSave.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
  }

 

  handleRecipeSave () {
    const { router } = this.context
    const { originalRecipe, currentRecipe, isForking } = this.state

    const sendOriginalRecipe = isForking ? originalRecipe : currentRecipe
    const reqRoute = isForking ? '/api/addForkedRecipe' : '/api/addRecipe'

    const storeRecipe = {currentRecipe, sendOriginalRecipe}
    
    this.props.setStateThroughProps(event, {isForking: false, activeRecipe: this.state.currentRecipe})

    axios.post(reqRoute, storeRecipe)
      .then(recipeId => {
        // router.history.push('/recipe/' + recipeId)
      })
      .catch(error => {
        console.log(error)
      })

    this.context.router.history.push('/home/viewrecipe')
  }

  handleIngredientsChange (ingredientInd, updatedIngredient) {
    // const target = event.target
    // const name = target.name
    // const value = target.value

    let newIngredients = Object.assign({}, updatedIngredient);

    if (this.state.currentRecipe.ingredients[ingredientInd] === undefined) {
      this.setState((state) => {
        state.currentRecipe.ingredients = state.currentRecipe.ingredients.concat([newIngredients])
        return state
      })
    } else {
      let forkCopy = this.state.currentRecipe
      forkCopy.ingredients[ingredientInd] = newIngredients
      this.setState({currentRecipe: forkCopy}, function () {
        console.log(this.state.currentRecipe)
      })
    }
  }

  handleInputChange (field, value) {
    console.log(field, value)
    let updatedRecipeInfo = this.state.currentRecipe
    updatedRecipeInfo[field] = value
    this.setState({currentRecipe: updatedRecipeInfo}, function () {
      console.log(this.state.currentRecipe)
    })
  }

  handleImageChange (imgString) {
    let currentRecipe = this.state.currentRecipe
    currentRecipe.image = imgString
    this.setState({currentRecipe: currentRecipe})
  }

  render () {
    const { isForking, name } = this.state
    const recipeHeader = isForking ? 'Fork the Recipe' : 'Add Your Recipe'

    return (

      <div style={recipeContainer}>

        <h1>{recipeHeader}</h1>

          <IngredientsTable
            handleRecipeSave={this.handleRecipeSave}
            handleChange={this.handleIngredientsChange}
            handleInputChange={this.handleInputChange}
            handleImageChange={this.handleImageChange}
            stats={this.state.currentRecipe}
            isDisabled={this.state.edit}
            styleProps={styleProps}
          />

      </div>
    )
  }
}

AddRecipe.contextTypes = {
  router: React.PropTypes.object
}

export default AddRecipe