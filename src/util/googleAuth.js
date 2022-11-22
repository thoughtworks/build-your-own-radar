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
  self.forceLogin = false
  self.isAuthorizedCallbacks = []
  self.isLoggedIn = undefined
  self.userEmail = ''
  let tokenClient
  let gapiInited = false
  let gsiInited = false

  self.loadGoogle = function (forceLogin = false, callback) {
    self.loadedCallback = callback
    self.forceLogin = forceLogin
    const content = d3.select('body')

    if (!self.forceLogin) {
      content.append('script').attr('src', 'https://apis.google.com/js/api.js').on('load', self.handleClientLoad)

      content
        .append('script')
        .attr('src', 'https://accounts.google.com/gsi/client')
        .on('load', function () {
          self.gsiLogin()
        })
    } else {
      self.handleClientLoad()
      self.gsiLogin(forceLogin)
    }
  }

  function parseJwt(token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    )

    return JSON.parse(jsonPayload)
  }

  self.gsiCallback = async function (credentialResponse) {
    let jwToken
    if (credentialResponse) {
      jwToken = parseJwt(credentialResponse.credential)
    }

    tokenClient = await window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '',
      prompt: self.forceLogin ? 'select_account' : '',
      hint: self.forceLogin ? '' : jwToken?.email,
    })

    gsiInited = true
    self.prompt()
  }

  self.gsiLogin = async function (forceLogin = false) {
    self.forceLogin = forceLogin
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: self.gsiCallback,
      auto_select: self.forceLogin ? false : true,
      cancel_on_tap_outside: false,
    })
    if (!self.forceLogin) {
      window.google.accounts.id.prompt()
    } else {
      self.gsiCallback()
    }
  }

  self.handleClientLoad = function () {
    gapi.load('client', self.initClient)
  }

  self.isAuthorized = function (callback) {
    self.isAuthorizedCallbacks.push(callback)
    if (self.isLoggedIn !== undefined) {
      callback(self.isLoggedIn)
    }
  }

  self.prompt = async function () {
    if (gsiInited && gapiInited) {
      const token = gapi.client.getToken()
      if (token && token.access_token && !self.forceLogin) {
        const options = { method: 'GET', headers: { authorization: `Bearer ${token.access_token}` } }
        const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', options)
        const profile = await response.json()
        self.userEmail = profile.email
        self.loadedCallback()
      } else {
        tokenClient.callback = () => {
          self.forceLogin = false
          self.prompt()
        }
        tokenClient.requestAccessToken()
      }
    }
  }

  self.initClient = async function () {
    gapi.client
      .init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(() => {
        gapiInited = true
        self.prompt()
      })
  }

  self.getEmail = () => {
    return self.userEmail
  }

  return self
}

module.exports = new GoogleAuth()
