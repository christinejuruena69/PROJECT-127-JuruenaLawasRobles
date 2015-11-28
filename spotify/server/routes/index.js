var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
// var connectionString = require(path.join(__dirname, 'config'));
var connectionString = require(path.join(__dirname, '../', '../', 'config'));
// var connectionString = "postgres://postgres:postgres@localhost/todo";
var http = require('http');


    // router.get('/', function(req, res, next) {
    //    res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));

    // });

module.exports = router;

router.post('/api/v1/todos', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {
        UserName: req.body.UserName, //1
        Name: req.body.FName + " " +req.body.MName + " " + req.body.LName, //2
        Sex: req.body.Sex, //3
        Email_Address: req.body.Email_Address, //4
        Birthday: req.body.Birthday, //5
        Age: req.body.Age //6
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

       client.query("INSERT INTO ACCOUNTS3(UserName, Name, Sex, Email_Address, Birthday, Age, Date_Joined) values( $1, $2, $3, $4, $5, $6, current_date)", 
            [ data.UserName,
              data.Name, 
              data.Sex, 
              data.Email_Address, 
              data.Birthday, data.Age
            ]);
        
        // A dollar sign ($) followed by digits is used to represent a positional parameter in the body of a function definition or a prepared statement. In other contexts the dollar sign may be part of an identifier or a dollar-quoted string constant.

        // SQL Query > Select Data
            var query = client.query("SELECT * FROM ACCOUNTS3 ORDER BY User_id ASC");

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
});

router.get('/api/v1/plist', function(req, res) {

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

});

router.post('/api/v1/plist', function(req, res) {

    var results = [];

    // Grab data from http request
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

       client.query("INSERT INTO Playlist( Playlist_Name) values( $1)", 
            [ data.playlist_name ]);
        
        // A dollar sign ($) followed by digits is used to represent a positional parameter in the body of a function definition or a prepared statement. In other contexts the dollar sign may be part of an identifier or a dollar-quoted string constant.


    });
});

router.get('/api/v1/songs', function(req, res) {

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
        var query = client.query("SELECT * FROM SONGS ORDER by song_id ASC;");

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

});

router.get('/api/v1/plist-songs', function(req, res) {

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
        var query = client.query("SELECT * FROM SONG_PLAYLIST;");

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

});

router.get('/api/v1/albums', function(req, res) {

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
        var query = client.query("SELECT * FROM SONG_ALBUM;");
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
router.get('/api/v1/songs/:song_id', function(req,res) {
 console.log(req.params.song_id);
 pg.connect(connectionString, function(err, client, done) {
 var x = [];
 var id = req.params.song_id;
    var query = client.query("SELECT * FROM SONGS where song_id = $1", [id]);
        query.on('row', function(row) {
                console.log(row);
            x.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(x);
        });
    });
});
router.get('api/v1/plist/:playlist_id', function(req,res) {
 console.log(req.params.playlist_id);
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
});

// router.post('/api/v1/plist', function(req, res) {

//     var results = [];

//     // Grab data from http request
//     var data = {
//         Name: req.body.FName + " " +req.body.MName + " " + req.body.LName, //2
//         Sex: req.body.Sex, //3
//         Email_Address: req.body.Email_Address, //4
//         Birthday: req.body.Birthday, //5
//         Age: req.body.Age //6
//     };
//     console.log( data.UserName, data.Name );

//     // Get a Postgres client from the connection pool
//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//           done();
//           console.log(err);
//           return res.status(500).json({ success: false, data: err});
//         }

//        client.query("INSERT INTO ACCOUNTS3(UserName, Name, Sex, Email_Address, Birthday, Age, Date_Joined) values( $1, $2, $3, $4, $5, $6, current_date)", 
//             [ data.UserName,
//               data.Name, 
//               data.Sex, 
//               data.Email_Address, 
//               data.Birthday, data.Age
//             ]);
        
//         // A dollar sign ($) followed by digits is used to represent a positional parameter in the body of a function definition or a prepared statement. In other contexts the dollar sign may be part of an identifier or a dollar-quoted string constant.

//         // SQL Query > Select Data
//             var query = client.query("SELECT * FROM ACCOUNTS3 ORDER BY User_id ASC");

//             // Stream results back one row at a time
//             query.on('row', function(row) {
//                 results.push(row);
//             });

//             // After all data is returned, close connection and return results
//             query.on('end', function() {
//                 done();
//                 return res.json(results);
//             });
//             // ^^^^ KUNG MAY IRERETURN SA WE PAGE LIKE SA HOME! FUCK YEAH


//     });
// });

router.post('/api/v1/plist-songs', function(req, res) {

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

       client.query("INSERT INTO SONG_PLAYLIST(Playlist_id, Song_id) values( $1, $2)", 
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
});
router.post('/api/v1/songs', function(req, res) {
    var results = [];
    // Grab data from http request
    var data = {
        song_title: req.body.song_title,
        song_album: req.body.song_album,
        song_genre: req.body.song_genre,
        song_artist: req.body.song_artist
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

       client.query("INSERT INTO SONGS(song_title, song_album, song_genre, song_artist) values( $1, $2, $3, $4)", 
            [ data.song_title,
              data.song_album,
              data.song_genre,
              data.song_artist
            ]);        

       var query = client.query("SELECT * FROM SONGS ORDER BY song_id ASC");

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


            // /kulang ng directory
    });
});



router.put('/api/v1/songs/:song_id', function(req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.song_id;
    // Grab data from http request
    var data = {
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
        client.query("UPDATE SONGS SET song_title=($1), song_album=($2), song_genre=($3), song_artist=($4) WHERE song_id=($5)",
         [  data.song_title,
            data.song_album,
            data.song_genre,
            data.song_artist,
            id
        ]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM SONGS ORDER BY song_id ASC");

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


router.put('/api/v1/plist/:playlist_id', function(req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.playlist_id;
    // Grab data from http request
    var data = {
      playlist_name : req.body.playlist_name
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
        client.query("UPDATE PLAYLIST SET playlist_name=($1) WHERE playlist_id=($2)",
         [  data.playlist_name,id
        ]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM PLAYLIST ORDER BY playlist_id ASC");

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



router.delete('/api/v1/songs/:song_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.song_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM SONGS WHERE song_id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM SONGS ORDER BY song_id ASC");

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
router.delete('/api/v1/plist/:playlist_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.playlist_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM PLAYLIST WHERE playlist_id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM PLAYLIST ORDER BY playlist_id ASC");

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