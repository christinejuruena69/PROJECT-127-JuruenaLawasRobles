var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', '../', 'config'));
var http = require('http');

/*
@  Functions below respond to '/api/v1/todos/'
*/

exports.init = function(req,res){
		var results = [];
    // Grab data from http request
    var data = {
        UserName: req.body.UserName, //1
        Name: req.body.FName + " " +req.body.MName + " " + req.body.LName, //2
        Password:req.body.Password, //3
        Sex: req.body.Sex, //4
        Email_Address: req.body.Email_Address, //5
        Birthday: req.body.Birthday, //6
        Age: req.body.Age //7
    };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
       client.query("INSERT INTO ACCOUNTS(Username, Name, Password, Sex, Email_Address, Birthday, Age, User_role, Date_Joined) values( $1, $2, $3, $4, $5, $6, $7, null, current_date)",
            [ data.UserName,
              data.Name,
              data.Password,
              data.Sex,
              data.Email_Address,
              data.Birthday,
              data.Age
            ]);
        // A dollar sign ($) followed by digits is used to represent a positional parameter in the body of a function definition or a prepared statement. In other contexts the dollar sign may be part of an identifier or a dollar-quoted string constant.
        // SQL Query > Select Data
            var query = client.query("SELECT * FROM ACCOUNTS ORDER BY User_id ASC");
            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                return res.json(results);
            });
    });
};

exports.getAllAccounts = function(req,res){
	var results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM ACCOUNTS ORDER BY User_id ASC;");
        // Stream results back one row at a time
        query.on('row', function(row) {
        		console.log(row);
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
};


/*
@  Functions below respond to '/api/v1/todos/:id'
*/

exports.getOneAccount = function(req,res){
	 console.log(req.params.id);
	 pg.connect(connectionString, function(err, client, done) {
	 var x = [];
	 var id = req.params.id;
		var query = client.query("SELECT * FROM ACCOUNTS where user_id = $1", [id]);
			query.on('row', function(row) {
		      		console.log(row);
		          x.push(row);
		      });

		      // After all data is returned, close connection and return results
		      query.on('end', function() {
		          done();
		          return res.json(x);
		      });
		});
};

exports.updateRole = function(req, res) {
     var results = [];
     // Grab data from the URL parameters
     var id = req.params.id;
     // Grab data from http request
     var data = {user_role: req.body.user_role};
     // Get a Postgres client from the connection pool
     pg.connect(connectionString, function(err, client, done) {
         // Handle connection errors
         if(err) {
           done();
           console.log(err);
           return res.status(500).send(json({ success: false, data: err}));
         }
         // SQL Query > Update Data
         client.query("UPDATE accounts SET user_role=($1) WHERE user_id=($2)", [data.user_role, id]);
         // SQL Query > Select Data
         var query = client.query("SELECT * FROM accounts ORDER BY user_id ASC");
         // Stream results back one row at a time
         query.on('row', function(row) {
             results.push(row);
         });
         // After all data is returned, close connection and return results
         query.on('end', function() {
             done();
             return res.json(results);
         });
     });
 };
