import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { FlatButton, Dialog } from 'material-ui'

import style from './navMain-css'

const { container, title, button } = style


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
  };

  handleClose(){
    this.setState({open: false});
  };
    

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
          {}
        </Dialog>
        
      </div>
    )
  }
}

NavMain.contextTypes = {
  router: PropTypes.object
}

export default NavMain
