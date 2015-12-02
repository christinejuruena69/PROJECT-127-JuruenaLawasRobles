var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', '../', 'config'));
var http = require('http');

/*
@  Functions below respond to '/api/v1/search/'
*/

//===========================SONGS
exports.song = function(req, res){    
    var results = [];
    console.log('song params:',req.params.searchthis);

    var str = req.params.searchthis;
    str = str.toUpperCase();
    pg.connect(connectionString, function(err, client, done) {
        if(err){
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var query = client.query("SELECT * FROM SONG WHERE UPPER(Song_title) LIKE $1;", ["%"+str+"%"]);
        query.on('row', function(row) {
            results.push(row);
            console.log(row);
        });        
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
};

//===========================ARTISTS
exports.artist = function(req, res){    
    var results = [];
    console.log('artist params:',req.params.searchthis);

    var str = req.params.searchthis;
    str = str.toUpperCase();
    pg.connect(connectionString, function(err, client, done) {
        if(err){
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var query = client.query("SELECT * FROM ARTIST WHERE UPPER(Artist_name) LIKE $1;", ["%"+str+"%"]);
        query.on('row', function(row) {
            results.push(row);
        });    
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
};

//===========================ALBUMS
exports.album = function(req, res){    
    var results = [];
    console.log('album params:',req.params.searchthis);

    var str = req.params.searchthis;
    str = str.toUpperCase();
    pg.connect(connectionString, function(err, client, done) {
        if(err){
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var query = client.query("SELECT * FROM ALBUM WHERE UPPER(Album_title) LIKE $1;", ["%"+str+"%"]);
        query.on('row', function(row) {
            results.push(row);
        });    
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
};