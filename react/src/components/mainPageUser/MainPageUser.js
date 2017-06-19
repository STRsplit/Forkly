import React, { Component, PropTypes } from 'react'
/**
 * Utilities
 */
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
 
// Components
import AddRecipe from '../addRecipe/AddRecipe'

 /**
 * Styles
 */
import style from './mainPageUser-css'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { FlatButton, IconButton, MenuItem, FontIcon, Drawer, AppBar } from 'material-ui'
import ActionHome from 'material-ui/svg-icons/action/home'
/**
 * Mock Data
 */
// import MockData from './MockData'
const { toolbar } = style
class MainPageUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  handleClose (action) {
    this.context.router.history.push(action)
    this.setState({open: false})
  }
  handleLogOut (event) {
    event.preventDefault()
    this.handleClose()
    this.context.router.history.push('/welcome')
  }


  render () {
    return (
      <div>
        <div>
          <Toolbar style={toolbar}>
            <ToolbarGroup>
              <IconButton tooltip='Open menu' onClick={this.handleToggle.bind(this)}>
                <ActionHome />
              </IconButton>
              <ToolbarTitle text='Forkly' />
            </ToolbarGroup>
          </Toolbar>
          <Drawer 
            open={this.state.open}
            docked={false}
            onRequestChange={(open) => this.setState({open})}>
            <AppBar
              title='Menu'
              showMenuIconButton={false}
            />
            <MenuItem onClick={() => this.handleClose('/home')}>Your profile</MenuItem>
            <MenuItem onClick={() => this.handleClose('/home/add')}>Add recipe</MenuItem>
            <MenuItem onClick={() => this.handleClose('/home/search')}>Search recipes</MenuItem>
            <MenuItem onClick={event => this.handleLogOut(event)}>Log Out</MenuItem>
          </Drawer>
        </div>
      </div>
    )
  }
}

MainPageUser.contextTypes = {
  router: PropTypes.object
}

export default MainPageUser
