'use strict';

(function(){
	angular
		.module("app")
		.controller("AdminCtrl", AdminCtrl); //this is a part of a module called app (yung nasa taas)
	AdminCtrl.$inject = ["$scope", "$location", "AdminService", "HomeService" ]; // angularjs na property
	//HomeCtrl may dependencies or gagamit ng other modules/services
	//angularsj construct
	//$scope =angularjs service na parang require

	function AdminCtrl($scope, $location, AdminService, HomeService){
	//toggle tabs albums, songs, stuff
		$scope.custom = true;
		$scope.album = true;
		$scope.artist = true;
		$scope.songlist = true;
		$scope.apptoveuserbtn= false;
		$scope.allsongs={};
		$scope.allalbums={};
		$scope.allartists={};
		$scope.playlists={};

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


		HomeService.GetAllSongs().then(function(data){
			$scope.allsongs=data;
		});

		HomeService.GetAllAlbums().then(function(data){
			$scope.allalbums=data;
		});

		HomeService.GetAllArtist().then(function(data){
			$scope.allartists=data;
		});

		var user = {};
		$scope.users = [];
		$scope.accounts={};

		AdminService.GetAll().then(function(data){
					$('body').css('display', 'none');
					$scope.accounts = data;
					$scope.users = data;
					isLoggedIn();
					$('body').css('display', '');
			});

		$scope.logout = function(){
			document.cookie ="user=\"\"";
			var cookie = document.cookie.split(";");
			console.log(cookie[0]);
			document.cookie = cookie[0];
			isLoggedIn();
		}

		$scope.makeAdmin = function(account){
			account.user_role = 2;
			AdminService.update(account)
					.then(function(data){
						alert("Make admin success");
						console.log(data);
				});
			isLoggedIn();
		};

		$scope.approveUser = function(account){
			$scope.apptoveuserbtn=true;
			account.user_role = 1;
			AdminService.update(account)
					.then(function(data){
						alert("User approved");
						console.log(data);
				});
			isLoggedIn();
		};

		$scope.unauthorizeUser = function(account){
			account.user_role = null;
			AdminService.update(account)
					.then(function(data){
						alert("Restricted User");
						console.log(data);
				});
			isLoggedIn();
		};

	//login and riderecting
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
// Anonymous function
