import React, { Component } from 'react'
/**
 * Components
 */
import EditTable from '../editTableDev'
/**
 * Styles
 */
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import style from './ingredientsTable-css'
import {orange500, blue500} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import Dialog from 'material-ui/Dialog'

const { containerStyle, formContainer, directionsBox, ingredientsGrid, errorStyle, underlineStyle, floatingLabelStyle, floatingLabelFocusStyle, propContainer, propToggleHeader, ingredientsContainer, ingredientsHeader, ingredientsRow, colHeader, fabButton, uploadButton, uploadInput, aligner, headerH2, headerContainer, recipeNameBox, imageLocal, recipeName, buttonStyle } = style

class AddIngredientsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      alertError: false,
      recipeImage: '' //E: CHANGE
    }
    this.onChange = this.onChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onRecipeSave = this.onRecipeSave.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
  }
  onChange (row) {
    const ingredientInd = row.id

    let updatedIngredient = {
      quantity: row.columns[0].value,
      units: row.columns[1].value,
      ingredient: row.columns[2].value
    }

    this.props.handleChange(ingredientInd, updatedIngredient)
  }

  onRecipeSave (event) {
    event.preventDefault()
    this.props.handleRecipeSave()
  }

  handleChange (event) {
    let value = event.target.value
    let field = event.target.name
    this.props.handleInputChange(field, value)
  }

  handleImageChange (event) {
    event.preventDefault()

    let reader = new FileReader()
    let file = event.target.files[0]

    reader.onloadend = () => {
      this.props.handleImageChange(reader.result)
      this.setState({recipeImage: reader.result})
    }

    reader.readAsDataURL(file)
  }

  render () {
    let { name, ingredients, img, directions, forking } = this.props.stats
    const recipeImg = img === undefined ? this.state.recipeImage : img
    const recipeImage = recipeImg === '' ? '../../assets/images/placeHolderIMG.jpg' : recipeImg
    console.log('RECIPE IMAGE!!!!!!!!!', recipeImage);

    const isDisabled = this.props.isDisabled
    const fieldType = isDisabled ? 'ReadOnly' : 'TextField'

    name = name || ''
    directions = directions || ''

    let rows = ingredients.map((ingredient, ind) => {
      let col = {columns: [], index: ind}
      Object.keys(ingredient).forEach(key => {
        col.columns.push({value: ingredient[key], ref: key})
      })
      return col
    })

    const headers = [
        {value: 'Units', type: fieldType, width: 200},
        {value: 'Amount', type: fieldType, width: 200},
        {value: 'Ingredient', type: fieldType, width: 200}
    ]

    return (

      <div style={formContainer}>
        <div style={{backgroundImage: `url('${recipeImage}')`, backgroundSize: 'cover', width: '100%', height: '35vh'}}>
        </div>
        <div style={headerContainer}>
        
        </div>
        <div style={aligner}>
          <div style={recipeNameBox}>
            <TextField multiLine disabled={isDisabled} name='recipeName' defaultValue={name} onChange={this.handleChange} style={recipeName}
              floatingLabelText='Recipe Name'
              floatingLabelStyle={floatingLabelStyle}
              floatingLabelFocusStyle={floatingLabelFocusStyle}
             />
          </div>
          <div style={imageLocal}>

            <FlatButton
              label='+ Choose an Image'
              labelPosition='before'
              style={uploadButton}
              containerElement='label'
            >
              <input type='file' style={uploadInput} onChange={this.handleImageChange} />
            </FlatButton>

          </div>
        </div>

        <div style={ingredientsGrid}>
          <div style={headerContainer}>
            <h2 style={headerH2}>Ingredients:</h2>
          </div>
          <EditTable forking={forking}
            onChange={this.onChange}
            rows={rows}
            headerColumns={headers}
          />
        </div>
        <div style={{margin: '0 auto'}}>
          
          <TextField multiLine name='recipeDirections' defaultValue={directions} disabled={isDisabled} style={directionsBox} onChange={this.handleChange}
            floatingLabelText='Directions'
            floatingLabelStyle={floatingLabelStyle}
            floatingLabelFocusStyle={floatingLabelFocusStyle}
            />
        </div>
        <div>
          <RaisedButton type='submit' onClick={this.onRecipeSave} label='Save Recipe' className='addRecipeSaveButton' primary />
        </div>
      </div>
    )
  }
}

export default AddIngredientsTable

/* <Table
          height={this.props.styleProps.height}
          fixedHeader={this.props.styleProps.fixedHeader}
          fixedFooter={this.props.styleProps.fixedFooter}
          selectable={this.props.styleProps.selectable}
          multiSelectable={this.props.styleProps.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.props.styleProps.showCheckboxes}
            adjustForCheckbox={this.props.styleProps.showCheckboxes}
            enableSelectAll={this.props.styleProps.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="4" style={styles.ingredientsHeader}>
                Ingredients
              </TableHeaderColumn>
            </TableRow>
            <TableRow style={styles.ingredientsRow}>
              <TableHeaderColumn tooltip="Quantity">Quantity</TableHeaderColumn>
              <TableHeaderColumn tooltip="Units">Units</TableHeaderColumn>
              <TableHeaderColumn tooltip="Ingredient">Ingredient</TableHeaderColumn>
              <TableHeaderColumn tooltip="Remove Ingredient">Remove Ingredient</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.props.styleProps.showCheckboxes}
            deselectOnClickaway={this.props.styleProps.deselectOnClickaway}
            showRowHover={this.props.styleProps.showRowHover}
            stripedRows={this.props.styleProps.stripedRows}
          >
            {ingredients.map( (ingredient, index) => (
              <TableRow key={index}>
                <TableRowColumn readonly="false">{ingredient.quantity}</TableRowColumn>
                <TableRowColumn readonly="false">{ingredient.units}</TableRowColumn>
                <TableRowColumn readonly="false">{ingredient.ingredient}</TableRowColumn>
                <TableRowColumn readonly="true"></TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter>
          </TableFooter>
        </Table> */