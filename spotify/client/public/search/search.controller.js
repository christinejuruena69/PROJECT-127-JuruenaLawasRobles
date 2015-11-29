'use strict';

(function(){
	angular
		.module("app")									//module: app
		.controller("SearchCtrl", SearchCtrl); 			//controller: search; member of module
	SearchCtrl.$inject = ["$scope", "SearchService"];


	function SearchCtrl($scope, SearchService){
		var Regex = require("regex");
		//var regex = new Regex(/(a|b)*abb/);
		//var str = "How are you doing today?";
		//var res = str.replace(" ", ".*");
		//var re = new RegExp("a|b", "i"); // same as var re = /a|b/i;		

		//regex.test("abba");			

		$scope.allstuff={};										//contents of .json file with song, artist and album
		//$scope.results={};										//store results that match the search
	        
		SearchService.GetAll().then(function(data){
			$scope.allstuff=data;
			console.log(data);

			$scope.SearchItem = function(searchData){	
			var converted = searchData.replace(" ", ".*");		//replace space with .*
			var regex = new RegExp(converted, i);				//i = case insensitive matching of regex
			var results = [];

			$.each($scope.allstuff, function(index, item){		
			   	if(regex.test(item.Song_title) == true){		//if regex matches song_title, add to results
			 		results.push(item);
			   	}/*else if(regex.test(item.Artist_name) == true){
					results.push(item);							//if regex matches arist_name, add to results
			   	}else if(regex.test(item.Album_name) == true){
					results.push(item);							//if regex matches album_name, add to results
			   	}
			   	*/
			});
		}//end of $scope.SearchItem

		});//end of SearchService.GetAll()
		
	}//end of SearchCtrl
})();
// Anonymouse function