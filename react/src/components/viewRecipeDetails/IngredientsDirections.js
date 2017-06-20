import React, { Component } from 'react'
import Subheader from 'material-ui/Subheader'
import style from './viewRecipeDetails-css'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ActionGrade from 'material-ui/svg-icons/action/grade'

// class IngredientsDirections extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//   }

  const IngredientsDirections = ({ recipeStats }) => {

    return (
      <div style={style.dualRecipes}>
        <div style={style.shortDetailContainer}>
        <br/>
          <Subheader inset={true}> { recipeStats.name } </Subheader>
          <Divider />
          <ul style={style.shortDetailList}>
            <li>{`Recipe by: ${recipeStats._creator ? recipeStats._creator.name : ''}`}</li>
            <li>{'Short information of recipe.'}</li>
            <li>{`Forked ${recipeStats.forks ? recipeStats.forks.length : ''} times.`}</li>                     
          </ul>
        </div>
        <Subheader inset={true}>Recipe Details</Subheader>
        <Divider />
        <List>
          {  
            recipeStats.ingredients
            .map((detail, index) => {
              return (
                <div>
                  <h1> hello world </h1>
                  <ListItem 
                  key={index}
                  primaryText={`${detail.quantity} ${detail.units} ${detail.ingredient}`}
                  leftIcon={<ActionGrade color='B3E5FC' />}
                />
              </div>
            )
          })
        }
        </List>
        <div>
          <p>{recipeStats.directions}</p>
        </div>
      </div>
    )
}

export default IngredientsDirections