'use strict';

(function(){
	angular
		.module("app")
		.factory("HomeService", HomeService)
	HomeService.$inject=["$http", "$q"]; //modules dependencies

	function HomeService($http, $q){
		var plistUrlperUser="http://localhost:3000/api/v1/user-plist";
		var plistUrl="http://localhost:3000/api/v1/plist";
		var allSongs="http://localhost:3000/api/v1/songs";
		var userSongs="http://localhost:3000/api/v1/user-songs";
		var albumSongsUrl="http://localhost:3000/api/v1/album-songs";
		var plist_songsUrl="http://localhost:3000/api/v1/plist-songs";
		var albumsUrl="http://localhost:3000/api/v1/albums";
		var artistUrl="http://localhost:3000/api/v1/artist";
		var artistSongUrl="http://localhost:3000/api/v1/artist-songs";
		var resultsUrl="http://localhost:3000/api/v1/search";
		var uploadUrl='http://localhost:3000/api/v1/upload';

		var service={};			//should be an object,
		service.GetAllLahatSongs = GetAllLahatSongs;
		service.GetAllPlaylists = GetAllPlaylists;
		service.GetallUserSongs = GetallUserSongs;
		service.Inctimesplayed = Inctimesplayed;
		service.UpdatePlistnoofSongs= UpdatePlistnoofSongs;
		service.GetUserPlaylists = GetUserPlaylists;
		service.GetSongsAlbum = GetSongsAlbum;
		service.AddtoAlbumSongs = AddtoAlbumSongs;
		service.Getsongsforplaylist = Getsongsforplaylist;
		service.GetAllSongs = GetAllSongs;
		service.MakenewPlaylist = MakenewPlaylist;
		service.AddsongtoPlaylist = AddsongtoPlaylist;
		service.AddSongtoUser = AddSongtoUser;
		service.RemovefromUserSongs = RemovefromUserSongs;
		service.AddSong = AddSong;
		service.UpdateSong= UpdateSong;
		service.GetOneSong = GetOneSong;
		service.DeletePlaylist = DeletePlaylist;
		service.EditPlaylist = EditPlaylist;
		service.RemoveSongfromPlaylist = RemoveSongfromPlaylist;
		service.GetAllAlbums =GetAllAlbums;
		service.GetAllArtist =GetAllArtist;
		service.AddNewAlbum =AddNewAlbum;
		service.UpdateAlbum=UpdateAlbum;
		service.UpdateArtist=UpdateArtist;
		service.AddNewArtist=AddNewArtist;
		//for search functionalities
		service.GetSongs = GetSongs;			
		service.GetArtists= GetArtists;			
		service.GetAlbums=GetAlbums;

		return service;

		/*===========================Leensey's Search Functionalities start here===========================*/
		function GetSongs(converted, songs){
			console.log('getsongs:', converted);
			var deferred = $q.defer();
			$http.get(resultsUrl+'/'+songs+'/'+converted)
				.success(function(searchdata){
					console.log(searchdata);
					deferred.resolve(searchdata);
				})
				.error(function () {
	        		deferred.reject();
	      		});
				return deferred.promise;
		}//end of GetSongs()

		function GetArtists(converted, artists){
			console.log('getartists:', converted);
			var deferred = $q.defer();
			$http.get(resultsUrl+'/'+artists+'/'+converted)
				.success(function(searchdata){
					console.log(searchdata);
					deferred.resolve(searchdata);
				})
				.error(function () {
	        		deferred.reject();
	      		});
				return deferred.promise;
		}//end of GetArtists()

		function GetAlbums(converted, albums){
			console.log('getalbums:', converted);
			var deferred = $q.defer();
			$http.get(resultsUrl+'/'+albums+'/'+converted)
				.success(function(searchdata){
					console.log(searchdata);
					deferred.resolve(searchdata);
				})
				.error(function () {
	        		deferred.reject();
	      		});
				return deferred.promise;
		}//end of GetAlbums
		/*===========================Leensey's Search Functionalities end here===========================*/

		function GetAllLahatSongs(){
			var deferred = $q.defer();
			$http.get(allSongs)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
		}
		function GetAllPlaylists(){
			var deferred = $q.defer();
			$http.get(plistUrl)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
		}

		function GetUserPlaylists(user_id){
			var deferred = $q.defer();
			$http.get(plistUrl+'/'+user_id)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
		}

		function MakenewPlaylist(newplaylist){
			console.log(newplaylist);
			var deferred = $q.defer();
			$http.post( plistUrl , newplaylist)
				.success(function(data){
					deferred.resolve(data);
					console.log("playlist added");
				}).error(function () {
					console.log("playlist not added");
	        deferred.reject();
	      });
				return deferred.promise;
		}
		function Getsongsforplaylist(playlist_id){
			var deferred = $q.defer();
			$http.get(plist_songsUrl+'/'+playlist_id)
				.success(function(data){
					deferred.resolve(data);
				}).error(function () {
	        deferred.reject();
	      });
				return deferred.promise;
		}
		function GetAllSongs(){
			var deferred = $q.defer();
			$http.get(allSongs)
				.success(function(data){
					deferred.resolve(data);
				}).error(function () {
	        deferred.reject();
	      });
				return deferred.promise;
		}
		function GetallUserSongs(user_id){
			var deferred = $q.defer();
			$http.get(userSongs+"/"+user_id)
				.success(function(data){
					console.log(data);
					deferred.resolve(data);
				}).error(function () {
	        deferred.reject();
	      });
				return deferred.promise;
		}

		function AddsongtoPlaylist(plistsong){
			var deferred = $q.defer();
			console.log(plistsong);
			$http.post( plist_songsUrl , plistsong)
				.success(function(data){
					deferred.resolve(data);
				}).error(function () {
	        deferred.reject();
	      });
				return deferred.promise;

		}
		function UpdatePlistnoofSongs (plistsong){
			playlist_id = plistsong.playlist_id;
			var deferred = $q.defer();
			console.log(plistsong);
			$http.put( plistUrl+'/'+playlist_id, plistsong)
				.success(function(data){
					deferred.resolve(data);
				}).error(function () {
					deferred.reject();
				});
				return deferred.promise;

		}
		function Inctimesplayed (song){////////////////////////
			var song_idplayed= song.song_id;
			var deferred = $q.defer();
			$http.put( allSongs+'/'+song_idplayed+'/'+song.song_id, song)
				.success(function(data){
					deferred.resolve(data);
					console.log("yep oki");
				}).error(function () {
					deferred.reject();
					console.log("kennot");
				});
				return deferred.promise;
		}



		function DeletePlaylist(playlist_id){
			var deferred = $q.defer();
			// $http.delete(allSongs , {params: {song_id: songid}})
			$http.delete(plistUrl +"/"+ playlist_id)
				.success(function(data){
					console.log(data);
					deferred.resolve(data);
					// alert("Song removed!");
				})
				.error(function () {
	        deferred.reject();
	      });
				return deferred.promise;
		}
		function DeleteSongPlaylist(playlist_id,song_id){
			var deferred = $q.defer();
			// $http.delete(allSongs , {params: {song_id: songid}})
			$http.delete(plistUrl +"/"+ playlist_id +"/"+ song_id)
				.success(function(data){
					console.log(data);
					deferred.resolve(data);
					// alert("Song removed!");
				})
				.error(function () {
	        deferred.reject();
	      });
				return deferred.promise;
		}
		function EditPlaylist(playlist_id, editedplist){
			console.log(editedplist)
			var deferred = $q.defer();
			$http.put(plistUrl+ "/"+ playlist_id, editedplist)
				.success(function(data){
					console.log(data);
					deferred.resolve(data);
				}).error(function () {
	        deferred.reject();
	      });

				return deferred.promise;
		}
		function RemoveSongfromPlaylist(playlist_id, song_id){
			var deferred = $q.defer();
			$http.delete(plist_songsUrl +"/"+ playlist_id+"/"+ song_id)
				.success(function(data){
					console.log(data);
					deferred.resolve(data);
					console.log("success remove from plist");
				}).error(function () {
					console.log("failed remove from plist");
	        deferred.reject();
	      });
				return deferred.promise;


		}


		function RemovefromUserSongs(songid, user_id){
			var deferred = $q.defer();
			$http.delete(userSongs +"/"+ songid +"/"+user_id)
				.success(function(data){
					console.log(data);
					deferred.resolve(data);

				});
				return deferred.promise;
		}

		function AddSong(newsong){
			var deferred = $q.defer();
			$http.post(allSongs , newsong)
				.success(function(data){
					deferred.resolve(data);
					alert("Song added!");
				}).error(function () {
	        deferred.reject();
					alert("Invalid | Song not added");
	      });
				console.log(deferred.promise.$$state.status); // 0
				return deferred.promise;
		}

		function AddtoAlbumSongs(albumsong){
			var deferred = $q.defer();
			$http.post(albumSongsUrl, albumsong)
				.success(function(data){
					deferred.resolve(data);
				}).error(function () {
	        deferred.reject();
					alert("cannot insert to songs!");
	      });
				console.log(deferred.promise.$$state.status); // 0
				return deferred.promise;

		}
		function AddSongtoUser(usersong){
			var deferred = $q.defer();
			$http.post(userSongs , usersong)
				.success(function(data){
					deferred.resolve(data);
					// console.log(data);
				}).error(function () {
	        deferred.reject();
					alert("cannot insert to songs!");
	      });
				console.log(deferred.promise.$$state.status); // 0
				return deferred.promise;

		}
		function UpdateSong(song_id, editedSong){
			console.log(song_id);
			var deferred = $q.defer();
			$http.put(allSongs+ "/"+ song_id, editedSong)
				.success(function(data){
					console.log(data);
					deferred.resolve(data);
				});
				return deferred.promise;
		}
		function GetSongsAlbum(album_id){
			var deferred = $q.defer();
			$http.get(albumSongsUrl+"/"+ album_id)
				.success(function(data){
					deferred.resolve(data);
					console.log(data);
				});
				return deferred.promise;
		}
		function GetSongsArtist(artist_id){
			var deferred = $q.defer();
			$http.get(artistSongUrl+"/"+ artist_id)
				.success(function(data){
					deferred.resolve(data);
					console.log(data);
				});

				return deferred.promise;
		}
		function GetOneSong(song_id){
			var deferred = $q.defer();
			$http.get(allSongs+"/"+ song_id)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function (data, status, header, config) {
					alert("no song found!");
				});

				return deferred.promise;
		}
		function GetAllAlbums(){
				var deferred = $q.defer();
			$http.get(albumsUrl)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function (data, status, header, config) {
					alert("no album found!");
				});
				return deferred.promise;
		}
		function GetAllArtist(){
			var deferred = $q.defer();
			$http.get(artistUrl)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function (data, status, header, config) {
					alert("no artist found!");
				});
				return deferred.promise;
		}

		function AddNewAlbum(tempalbum){
			var deferred = $q.defer();
			$http.post(albumsUrl , tempalbum)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
		}
		function UpdateAlbum(albumid, tempalbum){
			var deferred = $q.defer();
			$http.put(albumsUrl +"/"+ albumid, tempalbum)
				.success(function(data){
					deferred.resolve(data);
					console.log(data);
				});
				return deferred.promise;
		}
		function AddNewArtist(tempartist){
			var deferred = $q.defer();
			$http.post(artistUrl , tempartist)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
		}
		function UpdateArtist(artistid, tempartist){
			var deferred = $q.defer();
			$http.put(artistUrl +"/"+ artistid, tempartist)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
		}
	}

})();
// Anonymouse function
