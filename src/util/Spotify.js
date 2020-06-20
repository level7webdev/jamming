const clientId = 'd9097d493a0d46028413d920ef333838';
const redirectURI = 'http://192.168.2.10:3000/';

var accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } else if (window.location.href.match(/access_token=([^&]*)/)[1] && window.location.href.match(/expires_in=([^&]*)/)[1]) {
            accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
            var expiresIn;
            expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    }
};

export default Spotify;