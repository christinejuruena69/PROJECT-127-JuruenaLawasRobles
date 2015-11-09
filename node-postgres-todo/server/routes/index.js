var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
// var connectionString = require(path.join(__dirname, 'config'));
var connectionString = require(path.join(__dirname, '../', '../', 'config'));
// var connectionString = "postgres://postgres:postgres@localhost/todo";
var http = require('http');


router.get('/', function(req, res, next) {
   res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));

});

module.exports = router;



/*gumagana */
// var http = require('http');
// // var pg = require('pg');

// var connectionString = "postgres://postgres:postgres@localhost/todo";

// var server = http.createServer(function(req, res) {

//   // get a pg client from the connection pool
//   pg.connect(connectionString, function(err, client, done) {

//     var handleError = function(err) {
//       // no error occurred, continue with the request
//       if(!err) return false;

//       // An error occurred, remove the client from the connection pool.
//       // A truthy value passed to done will remove the connection from the pool
//       // instead of simply returning it to be reused.
//       // In this case, if we have successfully received a client (truthy)
//       // then it will be removed from the pool.
//       if(client){
//         done(client);
//       }
//       res.writeHead(500, {'content-type': 'text/plain'});
//       res.end('An error occurred');
//       return true;
//     };

//     // handle an error from the connection
//     if(handleError(err)) return;

//     // record the visit
//     client.query('INSERT INTO visit (date) VALUES ($1)', [new Date()], function(err, result) {

//       // handle an error from the query
//       if(handleError(err)) return;

//       // get the total number of visits today (including the current visit)
//       client.query('SELECT COUNT(date) AS count FROM visit', function(err, result) {

//         // handle an error from the query
//         if(handleError(err)) return;

//         // return the client to the connection pool for other requests to reuse
//         done();
//         res.writeHead(200, {'content-type': 'text/plain'});
//         res.end('You are visitor number ' + result.rows[0].count);
//       });
//     });
//   });
// })

// server.listen(3001)



router.post('/api/v1/todos', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

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
});


router.get('/api/v1/todos', function(req, res) {

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
        var query = client.query("SELECT * FROM items ORDER BY id ASC;");

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

});
router.put('/api/v1/todos/:todo_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;

    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

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

});

router.delete('/api/v1/todos/:todo_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

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

});