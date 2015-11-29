'use strict';

(function(){
	angular
		.module("app")
		.factory("SearchService", SearchService);
	SearchService.$inject=["$http", "$q"]; //modules dependencies
	
	function SearchService($http, $q){
		/*var plistUrl="http://localhost:3000/api/v1/plist";
		var allSongs="http://localhost:3000/api/v1/songs";
		var plist_songsUrl="http://localhost:3000/api/v1/plist-songs";
		*/
		var service={};			//should be an object, 		
		service.GetAll = GetAll;	
		service.Getsongsforplaylist = Getsongsforplaylist;	
		return service;

		function GetAll(){
			var deferred = $q.defer();
			$http.get(plistUrl)
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

	}//end of SearchService
	
})();
// Anonymouse function
