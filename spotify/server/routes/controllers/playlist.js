var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', '../', 'config'));
var http = require('http');

/*
@  Functions below respond to '/api/v1/plist'
*/

exports.getallPlaylist = function(req, res) {
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
        user_id: req.body.user_id
    };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
       client.query("INSERT INTO Playlist( Playlist_Name,user_id, playlist_no_of_songs) values( $1,$2,0)", //ayusin ito
            [ data.playlist_name,data.user_id]);

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
        // var query = client.query("SELECT * FROM Playlist where user_id=$1;", [req.params.id]);
        var query = client.query("SELECT * FROM Playlist where user_id=($1);", [req.params.user_id]);
        // var query = client.query("select s.song_id, s.song_title, s.song_genre, s.song_artist from user_song us,account a, song s where a.user_id=$1 and us.user_id=a.user_id and s.song_id=us.song_id;",[req.params.user_id]);

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
       client.query("INSERT INTO playlist_song(Playlist_id, Song_id) values( $1, $2)", //ayusin ito
            [ data.playlist_id,
              data.song_id
            ]);
            var query = client.query("SELECT * FROM playlist_song ORDER BY Playlist_id ASC");

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


exports.getPlaylistSongs = function(req, res){
	var results = [];
		pg.connect(connectionString, function(err, client, done) {
				if(err) {
					done();
					console.log(err);
					return res.status(500).json({ success: false, data: err});
				}
				// var query = client.query("select s.song_id, s.song_title,        s.song_genre, s.song_artist from playlist p, playlist_song us,        account a, song s where a.user_id=$1 and p.user_id=a.user_id and us.playlist_id=p.playlist_id and s.song_id=us.song_id;",
        // [req.params.id]);

        var query = client.query("select s.song_id, s.song_title, s.song_genre, s.song_artist from playlist p, playlist_song ps, song s where ps.playlist_id=($1) and p.playlist_id=($1)  and s.song_id=ps.song_id;",
        [req.params.playlist_id]);

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
    var id = req.params.playlistid;

    console.log(data);
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        client.query("UPDATE PLAYLIST SET playlist_no_of_songs=(playlist_no_of_songs+1) WHERE playlist_id=($2)",
         [ id ]);

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
exports.updatePlaylistName = function(req,res){
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
         [  data.playlist_name, id
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
exports.deletePlaylist = function(req,res){
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
exports.deleteSongfromPlaylist = function(req,res){
    var results = [];


    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        client.query("DELETE FROM PLAYLIST_SONG where playlist_id = $1 and song_id=$2 ", [req.params.playlist_id, req.params.song_id]);
        var query = client.query("SELECT * FROM PLAYLIST_SONG ORDER BY playlist_id ASC");
        query.on('row', function(row) {
            results.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
};

exports.getAllPlaylistSongs = function(req,res){
  pg.connect(connectionString, function(err, client, done) {
  var x = [];
  var id = req.params.playlist_id;
  var query = client.query("SELECT * FROM PLAYLIST_SONG order by playlist_id ASC;");
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

//
// exports.getPlaylistSongs = function(req,res){
//  pg.connect(connectionString, function(err, client, done) {
//  var x = [];
//  var id = req.params.playlist_id;
//     var query = client.query("SELECT * FROM PLAYLIST_SONG  where playlist_id = $1", [id]);
//         query.on('row', function(row) {
//                 console.log(row);
//             x.push(row);
//         });
//         query.on('end', function() {
//             done();
//             return res.json(x);
//         });
//     });
// };
