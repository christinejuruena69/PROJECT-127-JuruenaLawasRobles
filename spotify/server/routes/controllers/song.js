var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', '../', 'config'));
var http = require('http');


/*
@  Functions below respond to '/api/v1/user_song/'
*/

exports.getUserSongs = function(req,res){
	var results = [];
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        // var query = client.query("select s.song_id, s.song_title, s.song_genre, s.song_artist from user_song us, accounts a, songs s where a.user_id=$1 and us.user_id=a.user_id and s.song_id=us.song_id;",[req.params.id]);
        var query = client.query("select * from user_song order by user_id asc;");

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

exports.GetallUserSongs = function(req,res){
	var results = [];
	console.log("this");
	console.log(req.params.user_id);
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        // SQL Query > Select Data
				console.log("here here");
        var query = client.query("select distinct s.song_id, s.song_title, s.song_genre, s.song_album, s.song_artist, s.song_no_of_times_played from user_song us,account a, song s where us.user_id=($1) and s.song_id=us.song_id;",[req.params.user_id]);
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
@  Functions below respond to '/api/v1/song/'
*/

exports.insertNewSong = function(req, res) {
    var results = [];
    // Grab data from http request
    var data = {
        song_title: req.body.song_title,
        song_album: req.body.song_album,
        song_genre: req.body.song_genre,
        song_artist: req.body.song_artist,
				filepath: req.body.filepath,
				user_id: req.body.user_id
    };
    console.log( data.user_id);
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
       client.query("INSERT INTO song(song_title, song_album, song_genre, song_artist, Song_no_of_times_played) values( $1, $2, $3, $4, 0)",
            [ data.song_title,
              data.song_album,
              data.song_genre,
              data.song_artist
            ]);
			client.query("insert into music(music_name, filepath, music_oid, song_id) values($1, $2, lo_import($3 ,(select max(song_id) from song as x)),(select max(song_id) from song as x));",[data.song_title, data.filepath, data.filepath]);

			client.query('select lo_export(music.music_oid, $1) from music WHERE music.music_id = (select max(music_id) from music as x);',['/home/joshua/Desktop/asd/PROJECT-127-JuruenaLawasRobles/music/'+data.song_title+'.mp3']);

			var query = client.query("SELECT * FROM SONG ORDER BY song_id ASC");
					 query.on('row', function(row) {
							 results.push(row);
					 });
					 query.on('end', function() {
							 done();
							 return res.json(results);
					 });
    });
};



exports.insertSongtoUser = function(req, res) {
    var results = [];
    // Grab data from http request
    var data = {
			song_id : req.body.song_id,
			user_id: req.body.user_id
    };
    console.log( data.user_id);
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
			client.query("INSERT INTO user_song(song_id, user_id) values( $1, $2)",
			 [ data.song_id,
				 data.user_id
				]);
			// var query = client.query("select s.song_id, s.song_title, s.song_genre, s.song_artist from user_song us,
			// accounts a, songs s where a.user_id=$1 and us.user_id=a.user_id and s.song_id=us.song_id;",[req.params.id]);
			//
			var query = client.query("SELECT * FROM user_SONG ORDER BY song_id ASC");
					 query.on('row', function(row) {
							 results.push(row);
					 });
					 query.on('end', function() {
							 done();
							 return res.json(results);
					 });
    });
};

exports.getAllSongs = function(req, res) {
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
        var query = client.query("SELECT * FROM song ORDER by song_id ASC;");
        // var query = client.query(
            // "WITH Song_ids_table as ( select * from SONG_PLAYLIST), select * from song where song_id in ( select song_id in Song_ids_table);");
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
@  Functions below respond to '/api/v1/song/:song_id'
*/

	exports.getSongDetails = function(req,res) {
	 console.log(req.params.song_id);
	 pg.connect(connectionString, function(err, client, done) {
	 var x = [];
	 var id = req.params.song_id;
	    var query = client.query("SELECT * FROM song where song_id = $1", [id]);
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


exports.deleteUserSong = function(req, res) {
    var results = [];
    // Grab data from the URL parameters

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        // SQL Query > Delete Data
				// client.query("DELETE FROM song WHERE song_id=($1)", [id]);

				client.query("DELETE FROM user_song WHERE song_id=($1) and user_id=($2)", [req.params.song_id, req.params.user_id]);
				client.query("DELETE FROM PLAYLIST_SONG where song_id=$1 ", [req.params.song_id]);


        // SQL Query > Select Data
        var query = client.query("SELECT * FROM song ORDER BY song_id ASC");
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

	exports.updateSong = function(req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.song_id;
    // Grab data from http request
    var data = {
        song_id: req.body.song_id,
        song_title: req.body.song_title,
        song_album: req.body.song_album,
        song_genre: req.body.song_genre,
        song_artist: req.body.song_artist
    };
    console.log(data);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }
        // SQL Query > Update Data
        client.query("UPDATE song SET song_title=($1), song_album=($2), song_genre=($3), song_artist=($4) WHERE song_id=($5)",
         [  data.song_title,
            data.song_album,
            data.song_genre,
            data.song_artist,
            data.song_id
        ]);
        var query = client.query("SELECT * FROM song ORDER BY song_id ASC");
        query.on('row', function(row) {
            results.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });


/*
@
*/
	/*
	exports.uploadSong = function(req, res){
		var results = [];
		pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }
        // SQL Query > Update Data
        client.query("",);


				var query = client.query('select *from music order by music_id asc');
        query.on('row', function(row) {
            results.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(results);
        });
		});
	};
	*/
};

exports.Inctimesplayed = function(req, res) {
    var results = [];
    // Grab data from the URL parameters
		var id = req.params.song_idplayed;
    var id2 = req.params.song_id;

    var data = {
        song_id: req.body.song_id,
        song_title: req.body.song_title
    };
    console.log(data);

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }
        client.query("UPDATE song SET Song_no_of_times_played=(Song_no_of_times_played+1) WHERE song_id=($1)",
         [ id ]);
				 console.log("in song played");
        var query = client.query("SELECT * FROM song ORDER BY song_id ASC");
        query.on('row', function(row) {
            results.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

};
