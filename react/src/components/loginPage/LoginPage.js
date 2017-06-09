import React, {Component} from 'react'
import $ from 'jquery'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
const style = {
    backgroundColor: 'red',
    height: '100vh',
    display: 'flex',
    flexGrow: 1
}
class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // username: '',
      // password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    console.log('username: ', this.state.username)

    var user = {
      username: this.state.username,
      password: this.state.password
    }

    $.ajax({
      url: '/login',
      type: 'POST',
      // contentType: 'application/JSON',
      data: JSON.stringify(user),
      success: function (data) {
        console.log('successful login post')
      },
      error: function (err) {
        console.log('login error')
      }
    })
  }

  componentDidMount () {
    $.ajax({
      url: '/verifylogin',
      type: 'GET',
      success: function (user) {
        console.log('req.user object: ', user)
      },
      error: function (err) {
      }
    })
  }

  render () {
    console.log('got here')
    if (this.props.username === null) {
      return (
        <div style={style}>
          <a className='loginFacebook' href='/auth/facebook'>Login with Facebook</a>
          <Link to='signup'>Sign up for an account</Link>
        </div>
      )
    } else {
      return (
        <div>Welcome, {this.props.username}
          <Link to='/home/'> Go to your page</Link>
        </div>
      )
    }
  }
}

export default LoginPage
