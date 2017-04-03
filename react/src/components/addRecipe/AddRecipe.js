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
    // this.addRow = this.addRow.bind(this)
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRecipeSave = this.handleRecipeSave.bind(this)

    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  // componentDidMount () {
  //   var forked = this.context.router.history.location.pathname
  //   let forkedId = forked.slice(forked.lastIndexOf('/') + 1)
  //   let boundThis = this
  //   // if history has url at end
  //   if (forkedId.length > 0) {
  //     console.log('hi')
  //     $.ajax({
  //       url: '/getRecipeById',
  //       type: 'POST',
  //       data: JSON.stringify({id: forkedId}),
  //       contentType: 'application/json',
  //       success: function (data) {
  //         boundThis.setState({
  //           recipeName: data.recipeName,
  //           recipeDirections: data.recipeDirections,
  //           ingredients: data.ingredients
  //         })
  //       },
  //       error: function (err) {
  //         console.error('could not retrieve any recipes for user')
  //       }
  //     })
  //   }
  // }

  handleRecipeSave () {
    const { router } = this.context
    const { originalRecipe, currentRecipe, isForking } = this.state

    const sendOriginalRecipe = isForking ? originalRecipe : currentRecipe
    const reqRoute = isForking ? '/api/addForkedRecipe' : '/api/addRecipe'

    const storeRecipe = {currentRecipe, sendOriginalRecipe}
    
    this.props.setStateThroughProps(event, {isForking: false, activeRecipe: this.state.currentRecipe})

    axios.post(reqRoute, storeRecipe)
      .then(recipeId => {
        console.log('return value Recipe Saved', recipeId)
        router.history.push('/recipe/' + recipeId)
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleIngredientsChange (ingredientInd, updatedIngredient) {
    // const target = event.target
    // const name = target.name
    // const value = target.value

    let newIngredients = {
      quantity: updatedIngredient.quantity,
      units: updatedIngredient.units,
      ingredient: updatedIngredient.ingredient
    }

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
        <form>

          <IngredientsTable
            handleRecipeSave={this.handleRecipeSave}
            handleChange={this.handleIngredientsChange}
            handleInputChange={this.handleInputChange}
            handleImageChange={this.handleImageChange}
            stats={this.state.currentRecipe}
            isDisabled={this.state.edit}
            styleProps={styleProps}
          />

        </form>
      </div>
    )
  }
}

AddRecipe.contextTypes = {
  router: React.PropTypes.object
}

export default AddRecipe
