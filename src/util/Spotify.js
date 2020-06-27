const clientId = "d9097d493a0d46028413d920ef333838";
const redirectUri = "http://192.168.2.10:3000/";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async getUserId() {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    let response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: headers,
    });
    let jsonResponse = await response.json();
    console.log("gotten user ID");
    let userId = jsonResponse.id;
    console.log(`User ID is ${userId}`);
    return userId;
  },

  async getUserPlaylists() {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const userId = Spotify.getUserId();

    let response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: headers,
    });
    let jsonResponse = await response.json();
    if (!jsonResponse.items) {
      console.log("failed - no playlists");
      return [];
    } else {
      console.log("successfully gotten playlists");
      let userPlaylists = await jsonResponse.items.map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        uri: playlist.uri
      }))
      return userPlaylists;
    }
  },

  async search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    console.log(`searching with "${searchTerm}"`);
    let response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    let jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      console.log("failed - no tracks");
      return [];
    } else {
      console.log("successful search");
      let results = await jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
      return results;
    }
  },

  async savePlaylist(playlistName, tracks) {
    if (!playlistName || !tracks.length) {
      return;
    } else {
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      const userId = Spotify.getUserId();

      // create playlist
      let playlistPost = {
        name: playlistName,
      };
      let post = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify(playlistPost),
        }
      );
      let newPlaylist = await post.json();
      console.log(`creating new playlist: ${newPlaylist.name}`);

      // parse playlist ID from response
      let playlistID = await newPlaylist.id;

      // submit playlist
      let submit = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify(tracks.map((track) => `spotify:track:${track}`)),
        }
      );
      return submit;
    }
  },
};

export default Spotify;
