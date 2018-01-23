const d3 = require('d3');
const GoogleAuth = require('./googleAuth');
const USE_AUTHENTICATION = process.env.USE_AUTHENTICATION;

const ProfileMenu = function () {
    const self = {};

    self.build = function (content) {
        if (GoogleAuth.isLoggedIn && GoogleAuth.getProfile() && USE_AUTHENTICATION) {
            self._render(content);
        }
    };

    self._toggleProfileMenu = function () {
        const menu = d3.select('.profile__menu');
        const display = menu.style('display')
        display === 'none' ? menu.style('display', 'block') : menu.style('display', 'none');
    };

    self._logout = function () {
        GoogleAuth.logout();
    };

    self._render = function (content) {
        const profile = GoogleAuth.getProfile();
        const profileDiv = content.append('div')
            .attr('class', 'profile');
        const image = profileDiv
            .append('img')
            .attr('src', profile.imageUrl)
            .on('click', self._toggleProfileMenu);

        const profileMenu = profileDiv.append('div')
            .attr('class', 'profile__menu');

        profileMenu
            .append('ul')
            .append('li')
            .append('a')
            .text('Sign Out')
            .on('click', self._logout);
    };


    return self;
}

module.exports = new ProfileMenu();
