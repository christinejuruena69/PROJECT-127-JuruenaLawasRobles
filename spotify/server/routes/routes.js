user = require('./controllers/account');
userSong = require('./controllers/song');
plController = require('./controllers/playlist');
albumController = require('./controllers/album');
artistController = require('./controllers/artist');
searchController = require('./controllers/search');

var pathname = "/api/v1/todos";
var uspath = "/api/v1/user-songs";
var playlist = "/api/v1/plist";
var playlistPerUser = "/api/v1/user-plist";
var playlistWithSongs = '/api/v1/plist-songs'
var albumWithSong = '/api/v1/album-songs'
var albums = '/api/v1/albums';
var songs = '/api/v1/songs';
var artist = '/api/v1/artist';
var searchSong = '/api/v1/search/song';
var searchArtist = '/api/v1/search/artist';
var searchAlbum = '/api/v1/search/album';


module.exports = function(router) {
//accounts
  router.route(pathname)
    .post(user.init)
    .get(user.getAllAccounts);

  router.route(pathname+'/:id')
    .put(user.updateRole)
    .get(user.getOneAccount);

//search
  router.route(searchSong+'/:searchthis')    
    .get(searchController.song);

  router.route(searchArtist+'/:searchthis')    
    .get(searchController.artist);

  router.route(searchAlbum+'/:searchthis')    
    .get(searchController.album);

//songs
  router.route(uspath)
    .get(userSong.getUserSongs)
    .post(userSong.insertSongtoUser);

  router.route(uspath+'/:user_id')
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


  router.route(playlist+'/:user_id')
  .get(plController.getUserOwnedPlaylist);

  router.route(playlist+'/:playlist_id')
  .delete(plController.deletePlaylist)
  .put(plController.updatePlaylistName);
  // .put(plController.updatePlistNoofSongs);


//playlist_songs
  router.route(playlistWithSongs)
    .post(plController.addSongToPlaylist)
    .get(plController.getPlaylistSongs);

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

    router.route(albumWithSong)
      .get(albumController.GetallSongsinAlbum)
      .post(albumController.AddSongtoAlbum);

//artist
 router.route(artist)
    .get(artistController.getAllArtist)
    .post(artistController.addNewArtist);

  router.route(artist+'/:artist_id')
    .get(artistController.getOneArtist)
    .put(artistController.updateArtistNofSongs);

  return router;
};
