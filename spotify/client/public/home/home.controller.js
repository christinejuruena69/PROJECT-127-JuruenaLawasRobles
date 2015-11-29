'use strict';

(function(){
	angular
		.module("app")
		.controller("HomeCtrl",HomeCtrl); //this is a part of a module called app (yung nasa taas)
	HomeCtrl.$inject = ["$scope", "HomeService"]; // angularjs na property 
	//HomeCtrl may dependencies or gagamit ng other modules/services 
	//angularsj construct
	//$scope =angularjs service na parang require

// var example = angular.module("example", ['exceptionOverride']);
// example.controller("ExampleController", function($scope) {
//     var x = n + 1;
// });


	function HomeCtrl($scope, HomeService){
		$scope.custom = true;
		$scope.album = true;
		$scope.artist = true;
		$scope.songlist = true;
		$scope.saved=false;
		$scope.editplaylisttextbox=true;
		$scope.editplaylistnametext=false;
		
     $scope.curreditedSong={};
     $scope.curreditplist={};

		$scope.allsongs={}	;
	    $scope.playlists={};
	    $scope.currentplaylist={};
	    $scope.allalbums={};
	    $scope.allartists={};
	    $scope.currentplaylistTitle="";
	   	$scope.song_filename='';
	   	$scope.selectedPlaylistid=0;
    	$scope.selectedSongid = 0;

	   	// $scope.editedSong=[];
	        
		HomeService.GetAll().then(function(data){
			$scope.playlists=data;
		});
		HomeService.GetAllSongs().then(function(data){
    	$scope.allsongs=data;
		});
		HomeService.GetAllAlbums().then(function(data){
    	$scope.allalbums=data;
		});
		HomeService.GetAllArtist().then(function(data){
    	$scope.allartists=data;
    	// console.log($scope.allartists);
		});



			// $scope.playlist = true;
			
        $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true: false;
        };
        $scope.toggleArtist = function() {        	
            $scope.artist = $scope.artist === false ? true: false;
            $scope.album = true;
						$scope.playlist = true;
						$scope.songlist = true;
        };
        $scope.togglePlaylist = function() {
            $scope.playlist = $scope.playlist === false ? true: false;
            $scope.album = true;
						$scope.artist = true;
						$scope.songlist = true;

        };
        $scope.toggleAlbum = function() {
            $scope.album = $scope.album === false ? true: false;
						$scope.artist = true;
						$scope.playlist = true;
						$scope.songlist = true;

        };
        $scope.toggleSongs = function() {
            $scope.songlist = $scope.songlist === false ? true: false;
						$scope.artist = true;
            $scope.album = true;						
						$scope.playlist = true;		

        };
        $scope.newp= false;
        $scope.createplist= true;
        $scope.shownewplist = function (){
        	// $scope.createplist= false;   
          $scope.createplist = $scope.createplist === false ? true: false;

        	     	
        }
        // toggle tabs

        // playlist
        $scope.newPlaylist= function(){
        	HomeService.MakenewPlaylist($scope.newplaylist)
        		.then(function (data){
        			console.log("hiiiiii");
        			console.log(data);
							// $scope.playlists.push($scope.newplaylist);
							$scope.playlists=data;
        			$scope.newplaylist={};
					});	
        }


        $scope.deletePlaylist = function(playlist){
        	HomeService.DeletePlaylist(playlist.playlist_id)
        		.then(function (data){
        			var index = $scope.playlists.indexOf(playlist);
	        // 			var index = $scope.degreePrograms.indexOf(degreeProgram);
    					// $scope.degreePrograms.splice(index,1);
    					$scope.playlists.splice(index,1);
					});	
        }
        $scope.canceleditPlaylist = function (){
           $scope.editplaylisttextbox = $scope.editplaylisttextbox === false ? true: false;   
            $scope.editedplist = {};
        }
        $scope.geteditPlaylist = function(playlist){
        	// $scope.editplaylistnametext=true;
           // $scope.editplaylisttextbox = $scope.editplaylisttextbox === false ? true: false;
           $scope.editplaylisttextbox=false;

        	console.log(playlist.playlist_id);
        	$scope.editedplist= playlist;
        	$scope.curreditplist=playlist;

        }
        $scope.editPlaylist = function(playlist){
        	// $scope.editplaylistnametext=true;
        	console.log($scope.curreditplist.playlist_id);
        	console.log($scope.editplaylistname);
        	// $scope.editplaylistname= playlist.playlist_name;
        	HomeService.EditPlaylist($scope.curreditplist.playlist_id, $scope.editedplist)
        		.then(function (data){

        		$scope.editedplist={};
        		$scope.curreditplist={};

					});	
        }
        function removeSongfromPlaylist(){
        	HomeService.RemoveSongfromPlaylist($scope.curreditplist.playlist_id, $scope.editedplist)
        		.then(function (data){

        		$scope.editedplist={};
        		$scope.curreditplist={};

					});	
        }


        $scope.temp_all_playlist=[];
				$scope.temp_all_songs=[];
 				var temp_playlist = [];

    	  $scope.putsongid = function (song){
	    	  $scope.selectedSongid = song.song_id;
    	  }
    	  $scope.songalbum="album";
    	  $scope.songtype = function(button){
    	  	console.log(button.value);
          $scope.songalbum = $scope.songalbum === false ? true: false;   
    	  }

    	  $scope.isShown = function(albumtype) {
        	return albumtype === $scope.albumtype;
    		}
    		$scope.getallAlbum  =function (){

    		}
        $scope.getplaylist= function(playlist){
        	console.log(playlist.playlist_name);
        	console.log(playlist.playlist_id);
        	
        	$scope.currentplaylist = {};
        	HomeService.Getsongsforplaylist()
        		.then(function (all_playlist){
        			var temp = [];
							$scope.temp_all_playlist=all_playlist;

        			HomeService.GetAllSongs()
		        		.then(function (all_songs){
									$scope.temp_all_songs=all_songs;
		        		});	
							});


        		// console.log($scope.temp_all_playlist);
        		// console.log($scope.temp_all_songs);
        		// // console.log(temp_playlist);
      			var temp_song_id;
		   			$.each( $scope.temp_all_playlist, function( index, item ) {
				  		if (item.playlist_id == playlist.playlist_id){
				  			temp_song_id = item.song_id;
				  			// console.log( item.song_id );
							  			
			   				$.each( $scope.temp_all_songs, function( index, song ) {					 
			   					if( temp_song_id == song.song_id){
			 						temp_playlist.push(song);
			   					}
								});
		   				}
						});
						$scope.currentplaylist = temp_playlist;
						$scope.currentplaylistTitle = playlist.playlist_name;

						$scope.temp_all_songs= [];
						$scope.temp_all_playlist= [];
						temp_playlist=[];


				console.log($scope.currentplaylist);
    	  }
    	  $scope.newsong={
	    	  	song_title : "",
	    	  	song_album: "",
	    	  	song_genre: "",
	    	  	song_artist: ""
    	  }
    	  $scope.getselected = function(playlist){

    	  	console.log(playlist.playlist_name);   	  	
    	  	$scope.selectedPlaylist= playlist.playlist_name;
    	  	$scope.selectedPlaylistid= playlist.playlist_id;
    	  	console.log($scope.selectedPlaylistid);
    	  }	
    	  $scope.addsongtoPlaylist = function(){
	    	  $scope.plistsong={
	    	  	playlist_id : $scope.selectedPlaylistid,
	    	  	song_id: $scope.selectedSongid
	    	  }	

    	  	HomeService.AddsongtoPlaylist($scope.plistsong)
        		.then(function (data){

						});	
	    	  $scope.selectedSongid =0;
    	  	$scope.selectedPlaylistid=0;
    	  }
    	  
        // playlist

        // songs
    	  $scope.fileNameChanged = function(input){
    	  	var filename=input.value;
    	  	var temparr=filename.split('\\');
    	  	filename=temparr[2];
    	  	var filenametemp = filename.split('.');
    	  	$scope.newsong.song_title=filenametemp[0];
    	  	console.log($scope.newsong.song_title);
    	  	
    	  }
    	  $scope.addsonganddetails = function(newsongp){
    	  	console.log($scope.newsong);
    	  	console.log(newsongp.song_album);
    	  	HomeService.AddSong($scope.newsong)
    	  		.then(function (data){
							// $scope.allsongs.push(newsongp);
							$scope.allsongs=data;
							$scope.newsong={};
		    	  	if (newsongp.song_album.length > 0){
		    	  		var tempalbum={
		    	  			album_title: newsongp.song_album
		    	  		}
		    	  		var albumid=0;
		    	  		console.log($scope.allalbums);
		    	  		$.each( $scope.allalbums, function( index, item ) {	
		    	  				console.log("item.album_title: "+item.album_title + ", newsongp.song_album"+newsongp.song_album);
		    	  				console.log(item.album_id);

			   					if( newsongp.song_album == item.album_title){
			   						albumid=item.album_id;
			   						console.log(albumid);
			   					}			   					
								});
								if (albumid>0){ //if exists
									console.log("meron na");
			   					HomeService.UpdateAlbum(albumid, tempalbum)
					       		.then(function (data){

									});
								}else{ //if not make new album
									console.log("wala pa");
									HomeService.AddNewAlbum(tempalbum)
					       		.then(function (data){
										$scope.allalbums=data;						
									});
								}

		    	  	}
		    	  	if (newsongp.song_artist.length > 0){
		    	  		var tempartist={
		    	  			artist_name: newsongp.song_artist,
		    	  			album_name: newsongp.song_album
		    	  		}
		    	  		var artistid=0;
		    	  		console.log($scope.allartists);
		    	  		$.each( $scope.allartists, function( index, item ) {	
		    	  				console.log(item.artist_id);

			   					if( newsongp.song_artist == item.artist_name){
			   						artistid=item.artist_id;
			   						console.log(artistid);
			   					}			   					
								});
								if (artistid>0){ //if exists
									console.log("meron na");
			   					HomeService.UpdateArtist(artistid, tempartist)
					       		.then(function (data){
									});
								}else{ //if not make new album
									console.log("wala pa");
									HomeService.AddNewArtist(tempartist)
					       		.then(function (data){
										$scope.allartists=data;						
									});
								}
		    	  	}

						});
						// function( error ){Do something with error
						// 	console.log("error!");
						// });	
				$scope.newsong={};
				alert("Song added!");
    	  }
    	  $scope.removefromSongs =function(song){
    	  	
	    	  	HomeService.RemovefromSongs(song.song_id)
	        		.then(function (data){
	        			console.log("removed!");
	        			var index = $scope.allsongs.indexOf(song);
	        // 			var index = $scope.degreePrograms.indexOf(degreeProgram);
    					// $scope.degreePrograms.splice(index,1);
    					$scope.allsongs.splice(index,1);
							});
			
    	  }

    	// $scope.editSong = function 
    	$scope.getoneSong = function (song, editedSong){
    		$scope.editedSong = song;   

    // 		HomeService.GetOneSong(song.song_id)
    // 			.then(function (data){
    // 				console.log(data);
				// 	// $scope.editedSong=data;
				// 	$scope.curreditedSong=data;
				// 	// console.log($scope.editedSong);
				// 	// $scope.editedSong.song_title=data.song_title;								
				// });		 		
    	}
    	$scope.updateSong = function (){
    		console.log($scope.editedSong.song_id);
    		var song_id= $scope.editedSong.song_id;
    		HomeService.UpdateSong(song_id, $scope.editedSong)
	        .then(function (data){	       
	        	$scope.editedSong={};
	        	console.log("edited!");
	        	$scope.saved=true;
					});

					if ($scope.saved == false){
	        	$scope.editedSong={};
					}
    	}
	
        // songs
	}
})();
// Anonymouse function
