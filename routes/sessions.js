// Author Markus Andresen
// Created 16.05.2016

var express = require('express');
var router = express.Router();

var pg = require('pg');
var DATABASE_URL = "postgres://bnzoxupkdsqepi:w7Ds13XvOYlQlhZW4KB8o7PRyb@ec2-54-83-25-238.compute-1.amazonaws.com:5432/da2rmgi8pj04e1"
pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');
});

function getConnection(){
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: 'mysql.stud.ntnu.no',
    user: 'markua_test',
    password: '123456',
    database: 'markua_trening'
  });

  connection.connect();
  return connection;
}

function filterWithParameters(array,params){
  for (var key in params){
    var value = params[key]
    var array = array.filter(function (row) {
      if(row[key]==value){
        return true
      }
      return false;
    });
  }
  return array;
}



router.get('/', function(req, res, next) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({response: "success"}));
    connection.end();
});




module.exports = router;
