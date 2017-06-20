import React, {Component} from 'react'
import $ from 'jquery'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
const style = {
    backgroundColor: 'red',
    height: '100vh',
    display: 'flex',
    flexGrow: 1,
    flexItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
}
class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
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


    var user = {
      username: this.state.username
    }
    axios.post('/login')
    .then(user => {
      console.log(user)
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    axios.get('/verify/login')
    .then(user => console.log('user data:', user))
    .catch(err => console.log('Error:', err))
  }

  render () {
    if (this.props.username === '') {
      return (
        <div style={style}>
        <div>
          <a className='loginFacebook' href='/auth/facebook'>Login with Facebook</a>
          <Link to='/signup'>Sign up for an account</Link>
          </div>
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
LoginPage.contextTypes = {
  router: React.PropTypes.object,
  Link: React.PropTypes.object
}


export default LoginPage
