import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import IngredientsDirections from './IngredientsDirections'

class CardExampleWithAvatar extends Component {
  constructor(props){
    super(props);
    this.state= {
      recipe: this.props.stats
    }
    this.handleFork = this.handleFork.bind(this)
  }
  handleFork(){
    const forkedRecipe = this.state.recipe
    this.props.onFork(forkedRecipe)
  }

  render(){
    const { name,  _creator, forks, directions, ingredients, image } = this.props.stats
    const { compare } = this.props
    const recIMG = image === undefined ? '' : image
    const recipeIMG = recIMG === '' ? 'https://www.chowstatic.com/assets/recipe_photos/30175_easy_pumpkin_pie.jpg' : recIMG
    const summary = directions ? directions.split().slice(directions.length / 3) : ''
    const recipeContent = compare ? <IngredientsDirections recipeStats={this.props.stats} /> : null
    return (
      <div>
      <div>
      <Card style={this.props.styles}>

        <CardMedia
          overlay={<CardTitle title={name} subtitle={summary + '...'} />}
        >
          <img src={recipeIMG} width="240px" />
        </CardMedia>
        <CardText>
           
        </CardText>
        <CardActions>
          <FlatButton onClick={this.handleFork} label="Fork This Recipe" />
        </CardActions>
      </Card>
      </div>
      <div>
        {recipeContent}
      </div>
      </div>

  );
  }
}

export default CardExampleWithAvatar