'use strict';

(function(){
	angular
		.module("app")
		.factory("SignUpService", SignUpService);
	SignUpService.$inject=["$http", "$q"] //modules dependencies
	function SignUpService($http, $q){
		// var apiUrl="localhost:3000/api/v1/todo";
		var service={};			//should be an object, 
		service.Create = Create;	//bibigyan ng methodssssssss
		return service;

		function GetAll(){
			var deferred = $q.defer();
			//defer muna yung value na nirereturn ng GetAll
			$http.get('/api/v1/todos')
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
			
		}
		function Create(newAccount){
			var deferred = $q.defer();
			$http.post('/api/v1/todos', newAccount)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
				
		}	

	}



$scope.createTodo = function(todoID) {
        $http.post('/api/v1/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todoData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };


	

	
})();
// Anonymouse function
