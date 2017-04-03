import React, { Component, PropTypes } from 'react'
import axios from 'axios'
import style from './viewRecipeDetails-css'
import {pinkA200, transparent} from 'material-ui/styles/colors'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import IngredientsDirections from './IngredientsDirections'
import DualRecipes from './DualRecipes'
import ForkList from './ForksList.js'

import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};



class ViewRecipeDetails extends Component {
  constructor(props) {
    super(props)
    
    this.forkThisRecipe = this.forkThisRecipe.bind(this)
    this.handleCompare = this.handleCompare.bind(this)
  }

  /*
  componentDidMount() {
    // const id = this.props.params.recipeId
    const id = '58e02f58e71032728ea46fcd' //|| this.props.params.id // remove this line and uncomment the one on top when ready to use 
    axios.get(`api/recipes/${id}`)
    .then(result => {
      this.setState({
        recipe: result.data,
        activeRecipe: result.data, 
        compareRecipe: result.data
      }), () => console.log('hello world component will mount')})
    .catch(err => console.log('ViewRecipeDetails.js - error: ', err))
  }
  */

  forkThisRecipe(recipe){
    this.props.setStateThroughProps(event, {isForking: true, activeRecipe: recipe})
    this.context.router.history.push('/home/add')
  }

  handleCompare (event, selectedRecipe) {
    this.props.setStateThroughProps(event, {compareRecipe: selectedRecipe, isComparison: true})
  }
//     axios.get(`api/recipes/${id}`)
//     .then(result => {
//       this.setState({
//         recipe: result.data,
//         activeRecipe: result.data, 
//         compareRecipe: result.data
//       }), () => console.log('hello world component will mount')})
//     .catch(err => console.log('ViewRecipeDetails.js - error: ', err))

//   }

  createRecipeCard(recipe, isComparison) {
    return (<div style={{padding: '10px', display: 'table-cell'}}>
      <DualRecipes compare={isComparison} onFork={this.forkThisRecipe} stats={recipe} styles={style.dualRecipesLayout} />
    </div>)
  }
  
  shouldComponentUpdate(){
    return true;
  }
  

  render() {
    const { activeRecipe, compareRecipe, isComparison } = this.props.state
   
    const hasMounted = !!activeRecipe.name
    const { name,  _creator, forks, directions, ingredients } = activeRecipe

    const recipeDetails = (
      <IngredientsDirections recipeStats={activeRecipe} />
    )

    const contentLeft = isComparison ? this.createRecipeCard(compareRecipe, isComparison) : recipeDetails 

    return (
      <div style={style.mainContainer}>
        <div style={style.topContainer}>
          {contentLeft}
          {this.createRecipeCard(activeRecipe, isComparison)}
        </div>
        
        <div style={{width: '100%'}}>
      
        </div>
        <div style={{width: '100%'}}>
          <Divider />
          <Tabs >
            <Tab label="Recipe Forks" value="a">
              <div style={{marginTop: '2%'}}>
                <ForkList handleCompare={this.handleCompare} forks={forks}/>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

ViewRecipeDetails.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ViewRecipeDetails

