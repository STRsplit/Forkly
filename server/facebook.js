const express = require('express')
let { User } = require('../db/index.js')
const { facebookAuth: { clientID, clientSecret, callbackURL } } = require('../react/env/config.js')

const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

passport.use(new FacebookStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: callbackURL
}, (accessToken, refreshToken, profile, done) => {
      let { displayName, id, _json } = profile;
      User.findOne({'facebook.id': id})
      .then(user => {
        if(user) {
          return done(null, user)
        }
        else {
          user = new User({
            name: displayName,
            provider: 'facebook',
            facebook: _json
          })
          user.save((err, user) => {
            return done(err, user)
          })
        }
      })
      .catch(err => {
        return done(err)
      })
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})
