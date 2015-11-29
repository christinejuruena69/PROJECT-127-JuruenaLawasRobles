var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', '../', 'config'));
var http = require('http');

/*
@  Functions below respond to '/api/v1/plist'
*/

exports.getAllPlaylist = function(req, res) {
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
        var query = client.query("SELECT * FROM Playlist;");

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


/*
@  Functions below respond to '/api/v1/plist/:id'
*/

exports.addNewPlaylist = function(req, res) {
    var results = [];
    var data = {
        playlist_name: req.body.playlist_name, //1
    };
    console.log( data.UserName, data.Name );
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
       client.query("INSERT INTO Playlist( Playlist_Name,user_id) values( $1,$2)", //ayusin ito
            [ data.playlist_name,req.params.id]);

    });
};

exports.getUserOwnedPlaylist = function(req, res) {
    var results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM Playlist where user_id=$1;", [req.params.id]);
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


/*
@  Functions below respond to '/api/v1/plist/:id'
*/

exports.addSongToPlaylist = function(req, res) { //fix
    var results = [];
    // Grab data from http request
    var data = {
        playlist_id : req.body.playlist_id,
        song_id: req.body.song_id
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
       client.query("INSERT INTO SONG_PLAYLIST(Playlist_id, Song_id) values( $1, $2)", //ayusin ito
            [ data.playlist_id,
              data.song_id
            ]);
        // A dollar sign ($) followed by digits is used to represent a positional parameter in the body of a function definition or a prepared statement. In other contexts the dollar sign may be part of an identifier or a dollar-quoted string constant.

        // SQL Query > Select Data
            var query = client.query("SELECT * FROM SONG_PLAYLIST ORDER BY User_id ASC");

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

exports.getSongsInUserPlaylist = function(req, res){
	var results = [];
		pg.connect(connectionString, function(err, client, done) {
				if(err) {
					done();
					console.log(err);
					return res.status(500).json({ success: false, data: err});
				}
				var query = client.query("select s.song_id, s.song_title, s.song_genre, s.song_artist from playlist p, song_playlist us, account a, songs s where a.user_id=$1 and p.user_id=a.user_id and us.playlist_id=p.playlist_id and s.song_id=us.song_id;",[req.params.id]);
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



exports.updatePlaylistNoofSongs = function(req,res){
    var results = [];
    var id = req.params.playlist_id;
    var data = {
      playlist_name : req.body.playlist_name
    };
    console.log(data);
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        client.query("UPDATE PLAYLIST SET playlist_name=($1) WHERE playlist_id=($2)",
         [  data.playlist_name,id
        ]);

        var query = client.query("SELECT * FROM PLAYLIST ORDER BY playlist_id ASC");
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

};
exports.updateToDecPlaylistNoofSongs = function(req,res){
    var results = [];

    var id = req.params.playlist_id;
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        client.query("DELETE FROM PLAYLIST WHERE playlist_id=($1)", [id]);

        client.query("DELETE FROM PLAYLIST_SONG where playlist_id = $1", [id]);
        var query = client.query("SELECT * FROM PLAYLIST ORDER BY playlist_id ASC");

        query.on('row', function(row) {
            results.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

};

exports.getPlaylistSongs = function(req,res){
 pg.connect(connectionString, function(err, client, done) {
 var x = [];
 var id = req.params.playlist_id;
    var query = client.query("SELECT * FROM PLAYLIST where playlist_id = $1", [id]);
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
