'use strict';

(function(){
	angular
		.module("app")
		.factory("HomeService", HomeService)
	HomeService.$inject=["$http", "$q"]; //modules dependencies
	
	function HomeService($http, $q){
		var plistUrl="http://localhost:3000/api/v1/plist";
		var allSongs="http://localhost:3000/api/v1/songs";
		var plist_songsUrl="http://localhost:3000/api/v1/plist-songs";
		var albumsUrl="http://localhost:3000/api/v1/album";
		var artistUrl="http://localhost:3000/api/v1/artist";

		var service={};			//should be an object, 		
		service.GetAll = GetAll;	
		service.Getsongsforplaylist = Getsongsforplaylist;	
		service.GetAllSongs = GetAllSongs;	
		service.MakenewPlaylist = MakenewPlaylist;	
		service.AddsongtoPlaylist = AddsongtoPlaylist;	
		service.RemovefromSongs = RemovefromSongs;	
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
		return service;

		function GetAll(){
			var deferred = $q.defer();
			$http.get(plistUrl)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;		
		}
		function MakenewPlaylist(newplaylist){
			var deferred = $q.defer();
			$http.post( plistUrl , newplaylist)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;				
		}	
		function Getsongsforplaylist(){
			var deferred = $q.defer();
			$http.get(plist_songsUrl)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
		}
		function GetAllSongs(){
			var deferred = $q.defer();
			$http.get(allSongs)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
		}
		function AddsongtoPlaylist(plistsong){
			var deferred = $q.defer();			
			console.log(plistsong);
			$http.post( plist_songsUrl , plistsong)
				.success(function(data){
					deferred.resolve(data);
				});
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
				.error(function (data, status, header, config) {
					console.log("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
                alert("Cannot remove from songs");
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
				});
				
				return deferred.promise;
		}
		function RemoveSongfromPlaylist(){
			var deferred = $q.defer();
			// $http.delete(allSongs , {params: {song_id: songid}})
			$http.delete(plist_songsUrl +"/"+ songid)
				.success(function(data){
					console.log(data);				
					deferred.resolve(data);
					// alert("Song removed!");
				});
		}




		function RemovefromSongs(songid){
			var deferred = $q.defer();
			// $http.delete(allSongs , {params: {song_id: songid}})
			$http.delete(allSongs +"/"+ songid)
				.success(function(data){
					console.log(data);				
					deferred.resolve(data);
					// alert("Song removed!");
				}) 
				.error(function (data, status, header, config) {
					console.log("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
                alert("Cannot remove from songs");
        });	
				return deferred.promise;
		}
		function AddSong(newsong){
			var deferred = $q.defer();			
			$http.post(allSongs , newsong)
				.success(function(data){
					deferred.resolve(data);
				});
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
