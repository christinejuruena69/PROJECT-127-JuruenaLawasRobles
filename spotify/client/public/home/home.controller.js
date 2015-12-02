'use strict';

(function(){
	angular
		.module("app")
		.controller("HomeCtrl",HomeCtrl); //this is a part of a module called app (yung nasa taas)
	HomeCtrl.$inject = ["$scope", "$location", "HomeService"]; // angularjs na property


	function HomeCtrl($scope, $location, HomeService){
		$scope.current = {};
		$scope.custom = true;
		$scope.album = true;
		$scope.artist = true;
		$scope.songlist = true;
		$scope.recmsc = true;

		$scope.editplaylisttextbox=true;
		$scope.editplaylistnametext=false;
		var user = {};
	  	$scope.newp= false;
    	$scope.createplist= true;
			$scope.browsediv=true;
			$scope.profile=true;

		$scope.allalbums={};
     	$scope.curreditedSong={};
    	$scope.curreditplist={};

		$scope.allusersongs={};
	    $scope.playlists={};
	    $scope.currentplaylist={};
	    $scope.allalbums={};
	    $scope.allartists={};
	    $scope.currentplaylistTitle="";
	   	$scope.song_filename='';
	   	$scope.selectedPlaylistid=0;
    	$scope.selectedSongid = 0;


    	/*===========================Leensey's Search Functionalities start here===========================*/

    $scope.song_results = {};
		$scope.artist_results = {};
		$scope.album_results = {};		

		$scope.SearchFxn = function(searchdata){	

			var searchtype = searchdata.searchtype;
			var wordtobesearched = searchdata.searchthis;			
			console.log('wordtobesearched: ', wordtobesearched);
			console.log('searchtype: ', searchtype);

			if(searchtype=='song'){
				HomeService.GetSongs(wordtobesearched, searchtype)	
				.then(function (data){
					console.log(data);
					if(data.length==0){data.push({"song_title":"No song match found."})}
					$scope.song_results=data;

				}).catch(function() {
					console.log('Error at HomeService.GetSongs(), home.controller.js');				
				 });//end of HomeService.GetSongs
			}

			else if(searchtype=='artist'){
				HomeService.GetArtists(wordtobesearched, searchtype)
				.then(function (data){
					console.log(data);
					if(data.length==0){data.push({"artist_name":"No artist match found."})}
					$scope.artist_results=data;
				}).catch(function() {
					console.log('Error at HomeService.GetArtists(), home.controller.js');				
				});//end of HomeService.GetArtists
			}

			else if(searchtype=='album'){
				HomeService.GetAlbums(wordtobesearched, searchtype)
				.then(function (data){
					console.log(data);
					if(data.length==0){data.push({"album_title":"No album match found."})}
					$scope.album_results=data;
				}).catch(function() {
					console.log('Error at HomeService.GetAlbums(), home.controller.js');				
				});//end of HomeService.GetAlbums
			}

			else{
				console.log('Error: no value for searchtype');
				alert('choose a search type');
			}	
			
		}//end of $scope.SearchFxn

    	/*===========================Leensey's Search Functionalities end here===========================*/

	   	// $scope.editedSong=[];

		isLoggedIn();
		HomeService.GetallUserSongs(user.user_id)
			.then(function(data){
				$scope.displayUsersongs=data;
				// $scope.allsongsofUser=data;
		});
		console.log(user.user_id+' '+user.user_role);
		$scope.getallUserSongs = function(){
			HomeService.GetallUserSongs(user.user_id)
				.then(function(data){
					console.log(data);
					$scope.allusersongs=data;
					// $scope.allusersongs=data;
			});
		}
		$scope.getallUserSongs();
		HomeService.GetAllSongs()
			.then(function(data){
    	$scope.allsongs=data;
			// $scope.refreshsongs();
		});
		HomeService.GetUserPlaylists(user.user_id)
		.then(function(data){
			$scope.playlists=data;

		});

		$scope.refreshsongs = function (){
			console.log( "allsongs");
			console.log(	$scope.allsongs);
			console.log("allsongsofUser");
			console.log(	$scope.allsongsofUser);
				var songid;
				var tempallsongs =[];
				$.each( $scope.allsongsofUser, function( index, item ) {
					if (item.user_id == user.user_id){
						songid = item.song_id;
						$.each( $scope.allsongs, function( index, song ) {
							if (song.song_id == songid){
							console.log(song);
							tempallsongs.push(song);
							}
						});
					}
				});
				$scope.displayUsersongs=tempallsongs;
		}


		HomeService.GetAllAlbums().then(function(data){
    	$scope.allalbums=data;
		});
		HomeService.GetAllArtist().then(function(data){
    	$scope.allartists=data;
    	// console.log($scope.allartists);
		});


		//logout
		$scope.logout = function(){
			document.cookie ="user=\"\"";
			var cookie = document.cookie.split(";");
			console.log(cookie[0]);
			document.cookie = cookie[0];
			isLoggedIn();
		}


			// $scope.playlist = true;
			$scope.toggleBrowse = function() {
				$scope.browsediv = $scope.browsediv === false ? true: false;
				$scope.profile =true;
				$scope.your_music = true;

					// $scope.recmsc = true;
			};
			$scope.toggleProfile = function() {
				$scope.profile = $scope.profile=== false ? true: false;

				$scope.your_music = true;
				$scope.browsediv  = true;

					// $scope.recmsc = true;
			};
			$scope.toggleUrmsc = function() {
				$scope.your_music = $scope.your_music === false ? true: false;
				$scope.browsediv=true;
				$scope.profile =true;

					// $scope.recmsc = true;
			};


        $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true: false;
						$scope.recmsc = true;
        };

        $scope.toggleArtist = function() {
            $scope.artist = $scope.artist === false ? true: false;
            $scope.album = true;
						$scope.playlist = true;
						$scope.songlist = true;
						$scope.recmsc= true;
        };

        $scope.togglePlaylist = function() {
            $scope.playlist = $scope.playlist === false ? true: false;
            $scope.album = true;
						$scope.artist = true;
						$scope.songlist = true;
						$scope.recmsc = true;
        };

        $scope.toggleAlbum = function() {
            $scope.album = $scope.album === false ? true: false;
						$scope.artist = true;
						$scope.playlist = true;
						$scope.recmsc = true;
						$scope.songlist = true;
        };

        $scope.toggleSongs = function() {
            $scope.songlist = $scope.songlist === false ? true: false;
						$scope.artist = true;
            $scope.album = true;
						$scope.playlist = true;
						$scope.recmsc = true;
        };
				$scope.toggleRecMsc = function() {
						$scope.recmsc = $scope.recmsc === false ? true: false;
            $scope.songlist = true;
						$scope.artist = true;
            $scope.album = true;
						$scope.playlist = true;
        };

       $scope.shownewplist = function (){
        	// $scope.createplist= false;
          $scope.createplist = $scope.createplist === false ? true: false;
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
				$scope.playSong = function (song){
					console.log(song.song_id);
					HomeService.Inctimesplayed(song)
        		.then(function (data){
							$scope.getallUserSongs();
        			// $scope.allusersongs=data;

							console.log('inc no of times played');

					}).catch(function() {
						console.log('unable to inc no of times played');
					});

				}
        // toggle tabs

    	  // playlist // playlist // playlist // playlist // playlist

        $scope.newPlaylist= function(){
					console.log(user.user_id);
					var tempplist = {
						playlist_name: $scope.newplaylist.playlist_name,
						user_id: user.user_id
					};
        	HomeService.MakenewPlaylist(tempplist)
        		.then(function (data){
        			console.log(data);
							$scope.playlists=data;
        			$scope.newplaylist={};
							// $scope.playlists.push(tempplist);
					}).catch(function() {
						console.log('unable to add  new plist to scope');
						alert("new plist not added to scope!");
					});
        }

        $scope.deletePlaylist = function(playlist){
        	HomeService.DeletePlaylist(playlist.playlist_id)
        		.then(function (data){
        			var index = $scope.playlists.indexOf(playlist);
    					$scope.playlists.splice(index,1);
					});
        }

        $scope.canceleditPlaylist = function (){
           $scope.editplaylisttextbox = $scope.editplaylisttextbox === false ? true: false;
            $scope.editedplist = {};
        }

        $scope.geteditPlaylist = function(playlist){
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

				$scope.removeSongfromPlaylist =  function(){
        	HomeService.RemoveSongfromPlaylist($scope.curreditplist.playlist_id, $scope.editedplist, user.user_id)
        		.then(function (data){
        		$scope.editedplist={};
        		$scope.curreditplist={};
					});
        }

        $scope.getplaylist= function(playlist){
        console.log(playlist.playlist_name);
        console.log(playlist.playlist_id);

        $scope.currentplaylist = {};
        HomeService.Getsongsforplaylist(playlist.playlist_id)
        	.then(function (all_playlist){
					$scope.currentplaylist = all_playlist;
					$scope.currentplaylistTitle = playlist.playlist_name;
					console.log($scope.currentplaylist);
							});
				}

				$scope.removeSongfromPlaylist =  function(song){
					console.log($scope.currplist_id);
        	HomeService.RemoveSongfromPlaylist($scope.currplist_id,song.song_id)
        		.then(function (data){
							$scope.currentplaylist = data;
        		$scope.editedplist={};
        		$scope.curreditplist={};
						$scope.currplist_id=0;

					});
        }
				$scope.currplist_id=0;
        $scope.getplaylist= function(playlist){
        	console.log(playlist.playlist_name);
        	console.log(playlist.playlist_id);

        	$scope.currentplaylist = {};
        	HomeService.Getsongsforplaylist(playlist.playlist_id)
        		.then(function (all_playlist){

						$scope.currentplaylist = all_playlist;
						$scope.currentselectedplaylist = playlist;
						$scope.currentselectedplaylist.playlist_no_of_songs=($scope.currentplaylist.length);
						$scope.currplist_id= playlist.playlist_id;


				console.log($scope.currentplaylist);
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

    	  $scope.newsong={
	    	  	song_title : "",
	    	  	song_album: "",
	    	  	song_genre: "",
	    	  	song_artist: "",
						filepath: ""
    	  }
    	  $scope.getselectedPlist = function(playlist){

    	  	console.log(playlist.playlist_name);
    	  	$scope.selectedPlaylist= playlist.playlist_name;
    	  	$scope.selectedPlaylistid= playlist.playlist_id;
    	  	console.log($scope.selectedPlaylistid);

    	  }

    	  $scope.addsongtoPlaylist = function(){
	    	  var plistsong={
	    	  	playlist_id : $scope.selectedPlaylistid,
	    	  	song_id: $scope.selectedSongid,
						user_id : user.user_id
	    	  };
    	  	HomeService.AddsongtoPlaylist(plistsong)
        		.then(function (data){
							$scope.updatePlistnoofSongs(plistsong);
							alert("Song added to playlist!");

						}).catch(function() {
							alert("Song not added to playlist!");
					  });;
	    	  $scope.selectedSongid =0;
    	  	$scope.selectedPlaylistid=0;
    	  }
				$scope.updatePlistnoofSongs = function (plistsong){
					// HomeService.UpdatePlistnoofSongs(plistsong)
        	// 	.then(function (data){
					// 		$scope.allartists=data;
					// 	});

				}
				/* get temporary url
				$('#i_file').change( function(event) {
					var tmppath = URL.createObjectURL(event.target.files[0]);
					$("img").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
					$("#disp_tmp_path").html("<strong>"+tmppath+"</strong>");
				});
				*/
  	  $scope.fileNameChanged = function(input){
    	  	var filename=input.value;
					console.log(filename);
    	  	var temparr=filename.split('\\');
    	  	var filename2=temparr[temparr.length-1];
    	  	var filenametemp = filename2.split('.');
    	  	$scope.newsong.song_title=filenametemp[0];
					$scope.newsong.filepath=filename;
    	  	console.log($scope.newsong.song_title);
    	  }
				$scope.allsongstemp={};

				$scope.playSong = function(song){
					$scope.current.song = '../../../../music/'+song.song_title+'.mp3';
					$("#audioplayer").attr("src", $scope.current.song);
				}

    	  $scope.addsonganddetails = function(){
					var tempnewsong= {
						song_title : $scope.newsong.song_title,
						song_album : $scope.newsong.song_album,
						song_genre : $scope.newsong.song_genre,
						song_artist : $scope.newsong.song_artist,
						filepath: $scope.newsong.filepath,
						user_id : user.user_id
					}
					$scope.allsongsniuser = {};

    	  	HomeService.AddSong(tempnewsong)
    	  		.then(function (data){
							$scope.allsongs=data;
							// $scope.allusersongs=data;
							// $scope.getallUserSongs();
							$scope.newsong={};
							$scope.addtoUserSong(tempnewsong);
							$scope.AddArtistandAlbum(tempnewsong);
						}).catch(function() {
							$scope.allsongs=data;
							$scope.newsong={};
							$scope.addtoUserSong(tempnewsong);
							$scope.AddArtistandAlbum(tempnewsong);
					  });
    	  }

				$scope.addtoUserSong = function (tempnewsong){
					var usersong ={};
					$.each( $scope.allsongs, function( index, item ) {
						if( tempnewsong.song_title == item.song_title ){
							usersong = {
								song_id : item.song_id,
								user_id : user.user_id
							}
							return false;
						}
					});
					HomeService.AddSongtoUser(usersong)
						.then(function (data){
						$scope.getallUserSongs();
							// $scope.allusersongs=data;
						}).catch(function() {
					    console.log('unable to get the poneys');
							alert("Song not added!");
					  });
				}


				$scope.AddArtistandAlbum = function (tempnewsong){
					var song_artist= tempnewsong.song_artist;
					console.log(song_artist);
					var song_id;

					$.each( $scope.allsongs, function( index, item ) {
						if( tempnewsong.song_title == item.song_title ){
							song_id=item.song_id;
							console.log("song_id exists");
							return false;
						}
					});
					if (tempnewsong.song_album.length > 0){
						var tempalbum={
							album_title: tempnewsong.song_album
						}
						var albumid=0;
						var albumsong = {};
						console.log($scope.allalbums);

						$.each( $scope.allalbums, function( index, item ) {
								console.log("item.album_title: "+item.album_title + ", tempnewsong.song_album"+tempnewsong.song_album);
							if( tempnewsong.song_album == item.album_title){
								albumid=item.album_id;
								console.log("album exists");
								albumsong = {
									album_id: albumid,
									song_id: song_id
								}
								return false;
							}
						});
						if (albumid>0){ //if exists

							console.log("meron na");
							HomeService.UpdateAlbum(albumid, tempalbum)
								.then(function (data){
									console.log("albums");
									console.log(data);
									$scope.allalbums=data;
									$scope.addtoAlbumSongs(albumsong);

							});
						}else{ //if not make new album
							console.log("wala pa");
							HomeService.AddNewAlbum(tempalbum)
								.then(function (data){
								$scope.allalbums=data;

								$.each( $scope.allalbums, function( index, item ) {
									if( tempnewsong.song_album == item.album_title){
										albumid=item.album_id;
										console.log("album exists");
										albumsong = {
											album_id: albumid,
											song_id: song_id
										}
										return false;
									}
								});
								$scope.addtoAlbumSongs(albumsong);
								/////////////////////////////////////////////////////
							});
						}

					}
					if (song_artist.length > 0){
						var tempartist={
							artist_name: tempnewsong.song_artist,
							album_name: tempnewsong.song_album
						}
						var artistid=0;
						console.log($scope.allartists);
						$.each( $scope.allartists, function( index, item ) {
							if( tempnewsong.song_artist == item.artist_name){
								artistid=item.artist_id;
							return false;
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
									$.each( $scope.allartists, function( index, item ) {
										if( tempnewsong.song_artist == item.artist_name){
											artistid=item.artist_id;
											artistsong = {
												artist_id: artistid,
												song_id: song_id
											}
										return false;
										}
									});
									$scope.addtoArtistSongs(artistsong);
								});
						}
					}

				}
				$scope.addtoAlbumSongs=function (albumsong){
					HomeService.AddtoAlbumSongs(albumsong)
						.then(function (data){
						$scope.allsonginalbums=data;

						// $scope.allsonginalbums=data;
					});
				}
				$scope.getSongsAlbum=function (album_id){
					HomeService.GetSongsAlbum(album_id)
						.then(function (data){
						$scope.currentsonginalbum=data;
					});
				}
    	  $scope.removefromSongs =function(song){

	    	  	HomeService.RemovefromSongs(song.song_id)
	        		.then(function (data){
	        			console.log("removed!");
	        			var index = $scope.allsongs.indexOf(song);
	        // 			var index = $scope.degreePrograms.indexOf(degreeProgram);
    					// $scope.degreePrograms.splice(index,1);
    							$scope.allsongs.splice(index,1);
	    	  	HomeService.RemovefromUserSongs(song.song_id, user.user_id)
	        		.then(function (data){
	        			console.log("removed!");
	        			var index = $scope.allusersongs.indexOf(song);
	  						$scope.allusersongs.splice(index,1);
							});

    	  }

    	// $scope.editSong = function
    	$scope.getoneSong = function (song, editedSong){
    		$scope.editedSong = song;
    	}

    	$scope.updateSong = function (){
    		console.log($scope.editedSong.song_id);
    		var song_id= $scope.editedSong.song_id;
    		HomeService.UpdateSong(song_id, $scope.editedSong)
	        .then(function (data){
						$scope.getallUserSongs();
	        	$scope.editedSong={};
	        	console.log("edited!");
	        	$scope.saved=true;
					});

					if ($scope.saved == false){
	        	$scope.editedSong={};
					}
    	}

			// songsssssss // songsssssss // songsssssss // songsssssss

			//user stuff //user stuff //user stuff //user stuff
		function goSignUp(){
			$location.url("/sign-up");
		}
		function goLogin(){
			$location.url("/sign-in");
		}

		function goLoginHome(){
			$location.url("/home");
		}

		function goLoginAdmin(){
			$location.url("/admin");
		}

		function isLoggedIn(){
			$('body').css('display', 'none');
			try{
				user = $.parseJSON(document.cookie.substring(5));
				console.log(user);
				var pathname = $(location).attr('href');
				pathname = pathname.split("#");
				console.log(pathname[1]);

					if(user.user_role != null){
						if(user.user_role == 1){
							//alert("Standard");
							goLoginHome();
							$('body').css('display', '');
						} else {
							//alert("Admin");
							goLoginAdmin();
							$('body').css('display', '');
						}
					} else if(user=="" && pathname[1]=="/sign-up"){
						document.cookie = "user=\"\"";
						goSignUp();
						$('body').css('display', '');
					} else if(user==""){
						document.cookie = "user=\"\"";
						goLogin();
						$('body').css('display', '');
					} else {
						alert("Unauthorized user");
						document.cookie = "user=\"\"";
						goLogin();
					}

			}catch(err){
				//alert("No user is logged in");
				document.cookie = "user=\"\"";
				goLogin();
			}
		}
	}
})();
