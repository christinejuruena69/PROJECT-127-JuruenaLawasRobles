user = require('./controllers/account');
userSong = require('./controllers/song');
plController = require('./controllers/playlist');
albumController = require('./controllers/album');
artistController = require('./controllers/artist');

var pathname = "/api/v1/todos";
var uspath = "/api/v1/user-songs";
var playlist = "/api/v1/plist";
var playlistPerUser = "/api/v1/user-plist";
var playlistWithSongs = '/api/v1/plist-songs'
var albums = '/api/v1/albums';
var songs = '/api/v1/songs';
var artist = '/api/v1/artist';

module.exports = function(router) {
//accounts
  router.route(pathname)
    .post(user.init)
    .get(user.getAllAccounts);

  router.route(pathname+'/:id')
    .put(user.updateRole)
    .get(user.getOneAccount);

//songs
  router.route(uspath)
    .get(userSong.getUserSongs)
    .post(userSong.insertSongtoUser);

  router.route(uspath+'/:id')
    .get(userSong.getUserAdded);

  router.route(songs)
    .post(userSong.insertNewSong)
    .get(userSong.getAllSongs);

  router.route(songs+'/:song_id')
    .put(userSong.updateSong)
    .delete(userSong.deleteSong)
    .get(userSong.getSongDetails);

//playlist
router.route(playlistPerUser)
  .get(plController.getUserOwnedPlaylist);

  router.route(playlist)
    // .get(plController.getUserOwnedPlaylist)
    .get(plController.getallPlaylist)
    .post(plController.addNewPlaylist);

  router.route(playlist+'/:playlist_id')
    // .post(plController.newPlaylist)
    // .get(plController.getUserOwnedPlaylist)
    .put(plController.updatePlaylistNoofSongs)
    .delete(plController.updateToDecPlaylistNoofSongs);
    // .get(plController.getPlaylistSongs);

//playlist_songs
  router.route(playlistWithSongs)
    .post(plController.addSongToPlaylist)
    .get(plController.getAllPlaylistSongs);

    router.route(playlistWithSongs+'/:playlist_id')
      .get(plController.getPlaylistSongs);
    // .get(plController.getSongsInUserPlaylist);

//albums
  router.route(albums)
    .get(albumController.getAllAlbums)
    .post(albumController.addNewAlbum);

  router.route(albums+'/:album_id')
    .get(albumController.getOneAlbum)
    .put(albumController.updateAlbumNoofSongs);

//artist
 router.route(artist)
    .get(artistController.getAllArtist)
    .post(artistController.addNewArtist);

  router.route(artist+'/:artist_id')
    .get(artistController.getOneArtist)
    .put(artistController.updateArtistNofSongs);

  return router;
};
