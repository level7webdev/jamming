const clientId = "d9097d493a0d46028413d920ef333838";
const redirectURI = "http://192.168.2.10:3000/";

var accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    if (
      window.location.href.match(/access_token=([^&]*)/) &&
      window.location.href.match(/expires_in=([^&]*)/)
    ) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      var expiresIn;
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  async search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    console.log(`searching with "${searchTerm}"`);
    let response = await fetch(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    let data = await response.json();
    if (!data.tracks) {
      console.log("failed - no tracks");
      return [];
    } else {
      console.log("successful search");
      let results = await data.tracks.items.map((track) => ({
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
    if (!playlistName || !tracks) {
      return;
    } else {
      const accessToken = Spotify.getAccessToken();
      const headers = { headers: { Authorization: `Bearer ${accessToken}` } };
      var userId;

      // request current user ID
      let response = await fetch(`https://api.spotify.com/v1/me`, headers);
      let jsonResponse = await response.json();
      console.log("gotten user ID");
      userId = jsonResponse.id;
      console.log(`User ID is ${userId}`);

      // create playlist
      let playlistPost = {
        name: playlistName,
      };
      console.log(playlistPost);
      let post = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          method: "post",
          body: JSON.stringify(playlistPost),
        }
      );
      let newPlaylist = await post.json();
      console.log(`creating new playlist: ${newPlaylist.name}`);

      // parse playlist ID from response
      let playlistID = await newPlaylist.id;
      console.log(playlistID);

      // submit playlist
      console.log(
        JSON.stringify(tracks.map((track) => `spotify:track:${track}`))
      );
      let submit = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          method: "post",
          body: JSON.stringify(tracks.map((track) => `spotify:track:${track}`)),
        }
      );

      let filledPlaylist = await submit.json();
      console.log(filledPlaylist);

      let snapshotID = await filledPlaylist.snapshot_id;
      console.log(snapshotID);
    }
  },
};

export default Spotify;
