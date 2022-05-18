/* global gapi */
const d3 = require('d3')

// Client ID and API key from the Developer Console
var CLIENT_ID = process.env.CLIENT_ID
var API_KEY = process.env.API_KEY

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4']

// Authorization scopes required by the API multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'

const GoogleAuth = function () {
  const self = {}
  self.isAuthorizedCallbacks = []
  self.isLoggedIn = undefined

  self._updateProfile = function () {
    const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
    if (!profile) {
      return
    }
    self.profile = {
      id: profile.getId(),
      fullName: profile.getName(),
      givenName: profile.getGivenName(),
      familyName: profile.getFamilyName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
    }
  }

  self.loadGoogle = function (callback) {
    self.loadedCallback = callback
    var content = d3.select('body')
    content
      .append('script')
      .attr('src', 'https://apis.google.com/js/api.js')
      .on('load', function () {
        self.handleClientLoad()
      })
  }

  self.isLoggedInCallback = function (isLoggedIn) {
    self.isLoggedIn = isLoggedIn
    self._updateProfile()
    self.isAuthorizedCallbacks.forEach(function (callback) {
      callback(isLoggedIn)
    })
  }

  self.handleClientLoad = function () {
    gapi.load('client:auth2', function () {
      self.initClient()
    })
  }

  self.updateSigninStatus = function (isSignedIn) {
    self.isLoggedInCallback(isSignedIn)
  }

  self.isAuthorized = function (callback) {
    self.isAuthorizedCallbacks.push(callback)
    if (self.isLoggedIn !== undefined) {
      callback(self.isLoggedIn)
    }
  }

  self.initClient = function () {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(function () {
        self.loadedCallback()
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(function (data) {
          self.updateSigninStatus(data)
        })

        // Handle the initial sign-in state.
        self.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
      })
  }

  self.logout = function () {
    gapi.auth2.getAuthInstance().signOut()
  }

  self.geEmail = () => {
    const isLoggedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
    if (isLoggedIn) {
      return gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()
    }
  }

  self.login = function (callback, force = false) {
    if (force) {
      gapi.auth2.getAuthInstance().signIn({ prompt: 'select_account' }).then(callback)
      return
    }

    const isLoggedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
    if (isLoggedIn) {
      callback()
    } else {
      gapi.auth2.getAuthInstance().signIn().then(callback)
    }
  }

  return self
}

module.exports = new GoogleAuth()
