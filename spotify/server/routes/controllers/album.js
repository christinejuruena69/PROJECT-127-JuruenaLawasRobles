var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', '../', 'config'));
var http = require('http');

/*
@  Functions below respond to '/api/v1/albums'
*/

exports.getAllAlbums = function(req, res) {
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
        var query = client.query("SELECT * FROM ALBUM;");
        // var query = client.query(
            // "WITH Song_ids_table as ( select * from SONG_PLAYLIST), select * from SONGS where song_id in ( select song_id in Song_ids_table);");
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

exports.getOneAlbum = function(req, res) {
 console.log(req.params.album_id);
 pg.connect(connectionString, function(err, client, done) {
 var x = [];
 var id = req.params.album_id;
    var query = client.query("SELECT * FROM ALBUM where album_id = $1", [id]);
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

exports.addNewAlbum= function(req, res) {
    var results = [];
    var data = {
        album_title : req.body.album_title
    };
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

       client.query("INSERT INTO ALBUM(Album_title, Album_no_of_songs) values( $1, 1)",
            [ data.album_title]);
            var query = client.query("SELECT * FROM ALBUM ORDER BY album_id ASC");
            query.on('row', function(row) {
                results.push(row);
            });
            query.on('end', function() {
                done();
                return res.json(results);
            });
    });
};

exports.GetallSongsinAlbum= function(req, res) {
    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

          var query = client.query("SELECT * FROM album_song ORDER BY album_id ASC;");
            query.on('row', function(row) {
                results.push(row);
            });
            query.on('end', function() {
                done();
                return res.json(results);
            });
    });
};

exports.GetallSongsPerAlbum = function(req, res){
	var results = [];
		pg.connect(connectionString, function(err, client, done) {
				if(err) {
					done();
					console.log(err);
					return res.status(500).json({ success: false, data: err});
				}
        console.log(req.params.album_id);
        var query = client.query("select s.song_id, s.song_title, s.song_genre, s.song_artist from album a, album_song also, song s where also.album_id=($1) and a.album_id=($1) and s.song_id=also.song_id;", [req.params.album_id]);
        query.on('row', function(row) {
						console.log(row);
						 results.push(row);
				 });
				 query.on('end', function() {
						 done();
						 return res.json(results);
				 });
		});
};

exports.AddSongtoAlbum= function(req, res) {
    var results = [];
    var data = {
          album_id : req.body.album_id,
          song_id: req.body.song_id
    };
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        client.query("INSERT INTO album_song(album_id, Song_id) values( $1, $2)", //ayusin ito
             [ data.album_id,
               data.song_id
             ]);
            var query = client.query("SELECT * FROM album_song ORDER BY album_id ASC");
            query.on('row', function(row) {
                results.push(row);
            });
            query.on('end', function() {
                done();
                return res.json(results);
            });
    });
};
exports.updateAlbumNoofSongs= function(req, res) {

    var results = [];
    // Grab data from the URL parameters
    var id = req.params.album_id;
      var data = {
        album_title : req.body.album_title
    };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }
        client.query("UPDATE ALBUM SET album_no_of_songs=(album_no_of_songs+1) WHERE Album_id=($1)",
          [ id ]);

          console.log("yep");
          console.log("yep");
          console.log("yep");
          console.log("yep");
          console.log("yep");
        var query = client.query("SELECT * FROM ALBUM ORDER BY Album_id ASC");

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('error', function(error) {
            console.log(error);
        });
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
};
