var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', '../', 'config'));
var http = require('http');


exports.getOneArtist= function(req, res) {
 console.log(req.params.artist_id);
 pg.connect(connectionString, function(err, client, done) {
 var x = [];
 var id = req.params.artist_id;
    var query = client.query("SELECT * FROM ARTIST where artist_id = $1", [id]);
        query.on('row', function(row) {
                console.log(row);
            x.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(x);
        });
    });
};

exports.addNewArtist= function(req, res) {
    var results = [];

    // Grab data from http request
    var data = {
        artist_name : req.body.artist_name,
        album_name : req.body.album_name

    };
    console.log( data.playlist_id, data.song_id );

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
      client.query("INSERT INTO ARTIST(Artist_name, Artist_no_of_songs, artist_no_of_albums ) values( $1, 0, 0)", 
            [ data.album_title]);     
         // SQL Query > Select Data
            var query = client.query("SELECT * FROM ARTIST ORDER BY artist_id ASC");

            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                return res.json(results);
            });
            // ^^^^ KUNG MAY IRERETURN SA WE PAGE LIKE SA HOME! FUCK YEAH


    });
};

exports.updateArtistNofSongs= function(req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.artist;
      var data = {
        artist_name : req.body.artist_name
    };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE ARTIST SET Artist_no_of_songs=(Artist_no_of_songs+1), artist_name=($2) WHERE Album_id=($1)", 
          [ id,
          data.artist_name
          ]);
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM ARTIST ORDER BY Artist_id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('error', function(error) {
            console.log(error);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

};
exports.getAllArtist= function(req, res) {
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
        var query = client.query("SELECT * FROM Artist ORDER by Artist_id ASC;");
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