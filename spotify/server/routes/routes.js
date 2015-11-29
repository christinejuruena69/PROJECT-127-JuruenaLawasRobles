user = require('./controllers/account');
userSong = require('./controllers/song');
plController = require('./controllers/playlist');
albumController = require('./controllers/album');

var pathname = "/api/v1/todos";
var uspath = "/api/v1/user_song";
var playlist = "/api/v1/plist";
var playlistWithSongs = '/api/v1/plist-songs'
var albums = 'api/v1/albums';
var songs = '/api/v1/song';

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
    .get(userSong.getUserSongs);

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
  router.route(playlist)
    .get(plController.getAllPlaylist);

  router.route(playlist+'/:id')
    .post(plController.newPlaylist)
    .get(plController.getUserOwnedPlaylist);

  router.route(playlistWithSongs)
    .post(plController.addSongToPlaylist)
    .get(plController.getSongsInUserPlaylist);

//albums
  router.route(albums)
    .get(albumController.getAllAlbums);

  return router;
};
