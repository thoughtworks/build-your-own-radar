const GoogleAuth = require('./googleAuth');
const d3 = require('d3');
const USE_AUTHENTICATION = process.env.USE_AUTHENTICATION;

const LoginForm = function () {
    const self = {};

    self.build = function (content) {
        self.render(content);
    }

    self.render = function (content) {
        const buttonWrapper = content
            .append('div')
            .attr('class', 'input-sheet__login');

        self.authorizeButton = buttonWrapper
            .append('button')
            .attr('id', 'authorize-button');

        self.authorizeButton
            .append('a')
            .attr('class', 'button')
            .text('Authorize');

        self.authorizeButton.on('click', function () { self.handleAuthClick() });
    }

    self.handleAuthClick = function (event) {
        gapi.auth2.getAuthInstance().signIn();
    }

    self.handleSignoutClick = function (event) {
        gapi.auth2.getAuthInstance().signOut();
    }

    return self;
}

module.exports = new LoginForm();
