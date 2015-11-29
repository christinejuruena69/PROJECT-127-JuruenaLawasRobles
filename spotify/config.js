//CHRIS:
//var connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/spotify';
//LEENSEY:
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost/spotify';

module.exports = connectionString;