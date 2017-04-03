import React, { Component } from 'react'
/**
 * Utilities
 */
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import $ from 'jquery'

/**
 * Components
 */
import Main from './components/main/Main'
import MainPageUser from './components/mainPageUser/MainPageUser'
import MainPageNonUser from './components/mainPageNonUser/MainPageNonUser'
import SignUpPage from './components/signUpPage/SignUpPage'
import LoginPage from './components/loginPage/LoginPage'
import AddRecipe from './components/addRecipe/AddRecipe'
import ProfilePageUser from './components/profilePageUser/ProfilePageUser'
import ViewOwnRecipes from './components/viewOwnRecipes/ViewOwnRecipes'
import SearchRecipes from './components/searchRecipes/SearchRecipes'
import ViewSelectedRecipe from './components/viewRecipeDetails/ViewRecipeDetails'
import MockData from './components/mainPageUser/MockData'

/**
 * Styles
 */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: null,
      currentRecipe: [],
      /* Profile Page User */
      userID: '',
      userName: '',
      recipes: MockData,
      originalRecipes: MockData,
      /* Tab Bar User */
      selectedView: 'User',
      selectedRecipeName: '',
      selectedRecipeMethods: [],
      selectedRecipeIMG: null,
      activeRecipe: undefined,
      compareRecipe: undefined,
      isComparison: false,
      isForking: false
    }

    this.setStateThroughProps = this.setStateThroughProps.bind(this)
    this.setTabView = this.setTabView.bind(this)
    this.setRecipeState = this.setRecipeState.bind(this)
  }

  componentDidMount () {
    // this.getUsername()
  }

  session () {
    return true
    /* * change to true or false to 'mimic' a session * */
    /* * should return true if session is active else return false * */
  }

  checkSession () {
    if (this.session()) {
      return <Redirect to='/home/' />
    } else {
      console.log('no session')
      return <Redirect to='/welcome' />
    }
  }

  setTabView (value) {
    this.setState({selectedView: value})
  }

  setRecipeState (property, recipe){
    this.setState({property: recipe})
  }

  setStateThroughProps (event, newStateValue) {
    console.log('setStateThroughProps', newStateValue)
    event ? event.preventDefault() : ''
    this.setState(newStateValue, () => console.log('this.state.activeRecipe'))
  }

  renderSelectedRecipe (recipeID) {
    axios.get(`/api/recipes/${recipeID}`)
    .then(res => {
      const { selectedRecipeName, selectedRecipeMethods, selectedRecipeIMG } = res
      this.setState({ selectedRecipeName, selectedRecipeMethods, selectedRecipeIMG }, () => {
      })
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

  renderComponentWithProps (component) {
    console.log('COMPONENT called', component)
    if (component === 'ProfilePageUser') {
      return <ProfilePageUser setTabView={this.setTabView} state={this.state} setStateThroughProps={this.setStateThroughProps} setRecipeState={this.setRecipeState} renderSelectedRecipe={this.renderSelectedRecipe} />
    }
    if (component === 'ViewOwnRecipes') {
      return <ViewOwnRecipes state={this.state} setStateThroughProps={this.setStateThroughProps} />
    }
    if (component === 'ViewSelectedRecipe') {
      return <ViewSelectedRecipe state={this.state} setStateThroughProps={this.setStateThroughProps} />
    }
    if (component === 'AddRecipe') {
      return <AddRecipe state={this.state} setStateThroughProps={this.setStateThroughProps} />
    }
    if (component === 'SearchRecipes') {
      return <SearchRecipes state={this.state} setStateThroughProps={this.setStateThroughProps} />
    }

  }

  render () {
    return (
      <Router>
        <div>
          <MainPageUser />
          <Route exact path='/' render={this.checkSession.bind(this)} />          
          <Route path='/welcome' component={Main} />
          <Route exact path='/home' render={() => this.renderComponentWithProps('ProfilePageUser')} />
          <Route path='/home/recipes' render={() => this.renderComponentWithProps('ViewOwnRecipes')} />
          <Route path='/home/viewrecipe' render={() => this.renderComponentWithProps('ViewSelectedRecipe')} />
           <Route path='/home/add' render={() => this.renderComponentWithProps('AddRecipe')} />
          <Route exact path='/home/search' render={() => this.renderComponentWithProps('SearchRecipes')} />
          <Route path='/forkly' component={MainPageNonUser} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/login' component={LoginPage} />
        </div>
      </Router>
    )
  }
}


export default App

/* * * * * * *

<div className='group'>
  <section className='floatLeft'>
    <img className='logo' src='assets/images/forkly.png' alt='FORKLY' />
    <h3 className='title username'><Login username={this.state.username} /></h3>
  </section>
  <section className='floatRight'>
    <nav>
      <div className='icon logout'>
        <img className='navButton' src='assets/images/logout.png' alt='Logout' />
        <span><Link to='/' onClick={this.logout}><br />Logout</Link></span>
      </div>
      <div className='icon addRecipe'>
        <img className='navButton' src='assets/images/addRecipe.png' alt='Add Recipe' />
        <span><Link to='/addrecipe'>Create Recipe</Link></span>
      </div>
      <div className='icon myForks'>
        <img className='navButton' src='assets/images/fork.png' alt='My Recipes' />
        <span><Link to='/myrecipes'>My Recipes</Link></span>
      </div>
      <div className='icon home'>
        <img className='navButton' src='assets/images/home.png' alt='Home' />
        <span><Link to='/'><br />Home</Link></span>
      </div>
    </nav>
  </section>
</div>
<br />
<br />
<br />
<footer>
  <br />
  <small>&copy; <a href='https://github.com/TeamForkly/Forkly'>TeamForkly</a></small>
</footer>
* * * * * * */

//           // <Route path='/signup' component={SignUpPage} />
//           // <Route path='/main' component={MainPageNonUser} />

//           // <Route path='/addrecipe' component={AddRecipe} />
//           // <Route path='/recipe' component={ViewFork} />

// // Fred, for good luck.
// // https://a248.e.akamai.net/secure.meetupstatic.com/photos/member/c/e/b/e/highres_253972926.jpeg
// // ,,,,,,,,,,,,,,,,,*,,,,,,,***************,,/(//*((/*/*/(((#(#####((((#%%%%(*,,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // ,,,,,,,,,,,,,,,,,,,,,,,,,,*************,*(#**,,*,/*/*///.**/*/(*#%%##((#(/*(#(*,,,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // *****,,,,,,,,,,,,,,,,,,,,,***,***,*****//#*(.*,,,/,**,,(#*##(#((##(*(#%##%%#(((///,,,*,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // *****,,,,,,,,,,,,,,,,,,,,****../,****,****/,(%%%/*(%(,(%(*/,%%%%#(%%//#%&&&&&%%#(/(/.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // ,****,,,,,,,,*,,,,,,,,,,,,,**,*//*/*/*,*/(//%##%(((//(%%&@&&%//(&&%%((%(#/*/((#%&&&&%%%#, ,.,,,,,,,,,,,,,,,,,*,,,,,,,,,,,,**,,,,,,,,,,,,,,,
// // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*,/(/,**(#(*(&&%%%(#(#%&%&&@@@@&&%%@@&&**#%%%%%***((%%%%(&%*..,,,,,,,,************,,,,,,,,*****,,,,,,,,,,,,
// // ,,,,,,,,,,,,,,,*,,,,,,,,,,,,,,,,,**/(#%(#%&&&&&%%&%&&@%#@#%@@@&@&%/@@#%&(#%(%&&&%*/%//,#,////#.,,,,,**************,,,,,,,,,,,,,,,,,,,,,,,
// // ,,,,,,,,,,,,*****,,,,,,,,********(%/%%%&%&&%&&&&&&@@&@@&&&@@@@@@@&%@@%////&&&(&%&%/##*,/(,%%/,,,,***************,,,,,,,,,,,,,,,,,,,,,,,
// // ******,***********************,/#%(%%#%%&&&&&&%&@@@@@@@@&&@@&@@&&@&%&&%&%(/**%&&#(&&%#&%(/(&&(/*,,************,,,,,,,,,,,,,,,,,,,,,,,,,
// // ****************************,,#(/%&%/(%%&(&&@&&&%&@@@@@@@&@@&&@&@&@@&%%%&&&&%(*&%&&#&&&%&&%#(%%#/,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // **************,,********,*//*#(#&*#%%&&&@@&@&&&@@@@@@&@@@@&&&&&&&&&&&&&&&&&&&&&&%#&%&@&@&&&%(##*,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // ,,*********************/#((/%%#%%/(#&&&@&@&&@@&&@@@&@@@@@@@&&&&&&&&&&&&&&&&&&&@&&&&&@&&%&&%&@&&@&&&(&%(,,,,,,,,,,,*******,,,,,,,,,,,,,,,,
// // **********************/#(%#(%#%#((%&&&&@@@&@@&&&&@&@@@&@@@@&@&&&&&&&&&@@&&&&&&&@@@@&@&&&&&&&&@@&@&%&%&%%*,,,,,,,,*,,,,,,,,,,,,,,,,,,,,,,,
// // *********************(#(%%(%#%%#%#%&%&&&@&@@&@@&&&&&@@&@&&&&&&&&&&&&&@@&&@@&&&&@@@&&&&@@&&@&&&&@@@&&&&%%&%(,,,,,,,,,,,,,,,,,,,,....
// // ******,,,,,*********/#(#&%##&%(%%%%&%#%&&&@&&@&&&&&&&&&&&&&&&&&&&&&&@&&@@@@@@@@@@@&&@&&@@@&@@@@@@@@&&@&%%/.
// // ****,,,,,,,,********((###(%%%##%%%%&%%&&@&&&&&&%&&@&&&%&&&&%&&%&&&&&&&&@&@@@@@@@@&@&@&&@@@@@@@@@@@@@&@@%&&%(.                 ....,,,,,,,,,
// // ******,,,,,,*******/%##%%#%####%##%((%&&&&&&&&&&&&&&%%%&%%%%&%&&&&&&&&&@@&&&@&@@@@@@@@&@@@@@@@@@@@@@@&@&%%(,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // ********,,,,*******/%((%#%%(#%#%%%(#(%&&&&&&&&&&&&&%%&&%##%%%&&&&&&&&@&&&&&&&&&@@@&@@@@@@@@@@@@@@@@@@&&&&%%%#,,,,,,,,,,,,,,,,,,,,,,,,,,,,*,
// // ,,,,,,,,,,,,,,,,,,,,(##&%%%###%#%%((#&&&&&@&%&%&&%&%%###%%%&&&&&&&&&&&&&&&&&&&&@@&@@@@@@@@@@@@@@@@@@@@@&&%%%(/,,,,,,,,,,*******************
// // ....               ./%#&%&%##%##%((##%&&&&&&%#%%&%%%##%%%%&%%%%&&&&&&&&&&&&&&&&@@@@@@@@@@@@@@@&@@@@@@@@&%&&%#(*,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// //             .......,/%##&%#(%%(##%/(#&&&%&%%(#%%##(##%(#%%#%%%%&&&&&&&&&&&&&@@@@&&@@@&@@@&@@@@&&@@@@@@@#%%%%%#/,,,,,,,,,,,,,,,,,,,,,,,,,,**
// // ....................(%%#(%##((#/##%%%%%%#/%###%###(####%#%%%%&&%&&&&&&&&&&@@&&&@@&&&&&&&@@&&&&@@@@@##%%%%#(*,,,,,,*********************
// // ..................../#%%#((#(#(##((#%##%##(#((##########%#%%%%%&&&&&&&&&&&&@&&&&&&&&&&&&&&&&&@@@&%#####%%%##(/,,*************************
// // ,,,,,,,,,,,,,,,,,,,,,###(((%/((#%(#%%%##(%%#######((#(###%#(#(#%&&&&&&&&&&&&&&&&&&&&&&&%&&&&&&&((((#####%(#%#/,,*************************
// // ,,,,,,,,,,,,,,,.....,%((/((#/(((((%##%#(%%%%##########%((((((#%&&%%%%%%######%%&&&%%%%&&%%%#((((((((((#####%#%#/,****************,,,,,,,,,,
// // ...................../(///##((/((####(#(#%####((####%#(((((##%%%%%##((((((#####(####%###((((///(((((((#####%%%#(,,,,,.............
// // .....................(#/(/##/(/#(#(#(%##(%%#(((((##%#((((((%%%%#((//******//(((((((//////////////(((#######%%%%(
// // .....................(#///((((/(#(/###(##(((////(##((((((%&&%#((//*************/*//////////////((((((#######%%%/
// // ....................,*(((((((#(###(###((#(//////(((((//%&&(//*****************/////////////////(((########%%%(
// // ....................,,/((/(#((((((##((##(///////(#(((#&&%#////***********/******/*/////////////(((((((######%%%(
// // ......................(//((#(#((((#((/##(//////////#%#(//*//**********///*//**/*////////////////((((((#####(%%%/
// // ..                    /*(//((((((#(#(##((/////////////////***//******//*/////***//////////////////(((#####((#@%,
// //                       ./(*(#(((/((%(###(/////*///////////*//*//*/**/**/////////*///////////////////(((((((//#@%
// //                        ////(((((#%%###/////*******///////*//***/********//*//////////////*/////////((((#####(&@(
// //                       ,*///(%%(####%(///////*********/**********************/*//*/////*//*///////((((#%%%&%%   ##
// //                       *(/,*((##((#@////////*******************************//////////*////////((##%&&&&@@@@@@&&&.
// //                       *(/((/((/#(*#*(&%(//////**/**/////*****************/////*////////////(#%&&@@@@&&&@@@@@@@&%&%%
// //                       ,(*/*////(##(*,,(%##(//////(#%&%%%#####%%#######(##((((((/((((#%%&&%%@@@@@@@@@&&&@@@@@@@&%%%(
// //                        /*//////((###*..*#%###(/@@@@@&&&%%&&&@@@%#@@@@@&&@@@@@@(/////(%@@@@@@@@@@@@&&&@@@@@@@#                      .*((
// //                        //*///((//##%(/*.,,%#&@@@@@@&&%%%%%@@@@%%@@@@@@@@@@@@@&%###%%&&@%&@@@@@@@@@&&@@@@@@@@%##                    ./(##&
// //                        ,/*///((//(###//*,*,@&%&&@@@@@&&%%%%%%&@@@@@@@@@@%&@@@@@@#/*///#%@%@@@@@@@@@@&&@@@@@@@&((.              .*/**/(#%#%@
// //                         /////((///(##(/****@/&&%&&@@@@&&%%%%%%&@@@@@@@@@%&@@@@@@#/*///(&@&&@@@@@@@&&&@@@@@@@&%/(              ,/((####%%%&@
// //                          ////(#/*/((#(/*****//&%%%%&&@&&&&&&%%&&@@@@@@@@&&@@@@@&(*///((%&@@@@@&&&&&&@@@@@@@&&/(             .*(#%%&&&&&&&&@
// //                           ////*/(*//((//****//%&%%#%%%&&&&&@&&&@@@@@@@@@@@@@&&&(//*//((#%%&&&&&&&&&&@@@@@&&&&*             ,/#%%&&&&@@&&&&@
// //                            ,///***,(////******/%%%%#####%%%%&&&&&&@&&&&&&&&&&&(///**//(#%#&&&&&&&&&&&&&&&&#*   .,***,.,*/#%&&&&&&@@@@@@@@
// //                              */***,/////*******/##%%%######%%%%%%&&&&&&&&&&&%(////////((#%%%#&&&&&&&&&#####/,(%%%%%#(///#%&&&&@@@@@@@@@@@
// //                               *****//////********/###%%%#######%%%%%%%%&&(////////*/(((%%%#(((((((((#######/#%&&&&&%#%%%&&&&&@@@@@@@@@@@@
// //                                **,***,/////*/*******//(%###%%%%%%%%%%#////////(/////*((##%##((((((((#######/(%&&%%%&&%%%&&&@@@@@@@@@@@@@@
// //                                 .***,**//***/***********//*//**/******//////////////////(((#%#((((((((########((###(#%&&%%&&@@@@@@@@@@@@@@@
// //                                     ,,*/*///**********/**//**/*******/////(////////////((/(#%%#(((((((######(&&%((/(#%&@%%&@@@@@@@@@@@@@@@@
// //                                     .,***////************//*********////////////(/////////((#%#(((/((((#####%&&&&&&@@@@@&%&@@@@@@@@@@@@@@@@
// //                                      ,**,**///***/****/***/*******////***///////////*****//(##(((////((####/&&&@@@@@@@@@@%&@@@@@@@@@@@@@@@@
// //                                      .,*,*/**//******************/*//******/////////*//////(#(####((/((####%&&@@@@@@@@@@@&@@@@@@@@@@@@@@@@@
// //                                       ,*******//******************/******////(/((/((///((#%%##(%####((((###&&&@@@@@@@@@@@&@@@@@@@@@@@@@@@@@
// //            ....                        *************/*********/***///////////((((((((/((#%%%%####(####(###&&@@@@@@@@@@@@@&@@@@@@@@@@@@@@@@@
// // ##(/,*/*,,%#####((/,.                .*********/***/***/******/*////////(//(/((//(((((/((#####(#######(#(%&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @&%&((%%#&&%##&&&&%##/.       .*/(#%##****//***/**///******/////////(////(////*//(((///((#((######((#%%&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@&&@&&%#%&&&&&%%&@@&&&&%#(*.   ///#%%%%#,***/*/*/*/***//****///////////////////(//////(#%%%%#########%#&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // &@@&@@@&&%&@@&&&%&@@@@@&&&&%#(*(%#(#%%%%%#**/*///////********///((((/////(#(((((((((##((##########((#&&%&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@&@@@@@&@@@&&&&@@@@@@@@@@&&%#((##%&&&&%***///((/(//***/*///(///////////////////(//((((((((((###(%%%@&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // %@@@@@@@@@@@@@@@&&&@@@@@@@@@@@@@&%(#%&&&&***///**//(/*//((/(/(/#//*//*//////(/(((/(((((((((((##%%%&@@&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // &&@@@&@@@@@@@@@@@&&@@@@@@@@@@@@@@&&%(&@&&&&///*/**/*/((///(((////////*/(////////(((((#(((((#(((##%%&@@@@&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // &&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&%&@@@&&(((///*/*(((/(((((((/(((((/////////////(//(((((#(###%%@@@@@@&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // &@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&%@@@@#(/////**/((####(/((((/(//////////////(/((((/(/(#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&@@@@(((/////**//((####(((//(////////////(///(((((##&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&@@@@%#(////////*////##((/*////*//*////(/////((/((#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&@@@@@%((////(/////(((/(/(///**/////////((//####&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&(///////(///((#(((/(/(/////((((#(((((%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(//**///////////(/////////(//(%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
