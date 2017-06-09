import React, { Component } from 'react'
/**
 * Components
 */
import NavMain from '../navMain/NavMain'
/**
 * Grid Layout
 */
import ReactGridLayout from 'react-grid-layout'
/**
 * Styles
 */
import style from './main-css'

const { background, nav } = style

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const layout = [
    ]
    return (
      <div style={background}>
          <div style={style.menu}>
            <NavMain />
          </div>
      </div>
    )
  }
};

export default Main
