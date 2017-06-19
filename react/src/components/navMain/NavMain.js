import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { FlatButton, Dialog, TextField } from 'material-ui'

import style from './navMain-css'
import secondStyle from '../ingredientsTable/ingredientsTable-css'
const { container, title, button } = style

const { underlineStyle, floatingLabelStyle, floatingLabelFocusStyle } = secondStyle


class NavMain extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      content: ''
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleRouting (event, route) {
    event.preventDefault()
    this.context.router.history.push(route)
  }

  handleOpen(){
    this.setState({open: true});
  }

  handleClose(){
    this.setState({open: false});
  }
    
  handleChange (event) {
    let value = event.target.value
    let field = event.target.name
    this.props.handleChange(value, name);
  }

  render () {
  
     
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    let { username } = this.props.stats
    return (
      <div style={container}>
        <h1 style={title}>forkly</h1>
        <FlatButton labelStyle={button} style={button} label='Join' onTouchTap={this.handleOpen}/>
        <FlatButton labelStyle={button} style={button}  label='Log In' onTouchTap={this.handleOpen}/>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField multiLine name='username' defaultValue={username} onChange={this.handleChange}
            floatingLabelText='Username'
            floatingLabelStyle={floatingLabelStyle}
            floatingLabelFocusStyle={floatingLabelFocusStyle}
            /><br/>
            <TextField multiLine name='userPW' onChange={this.handleChange}
            floatingLabelText='Password'
            floatingLabelStyle={floatingLabelStyle}
            floatingLabelFocusStyle={floatingLabelFocusStyle}
            />
        </Dialog>
        
      </div>
    )
  }
}

NavMain.contextTypes = {
  router: PropTypes.object
}

export default NavMain
