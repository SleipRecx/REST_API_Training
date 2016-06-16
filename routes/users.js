// Author Markus Andresen
// Created 16.05.2016

var express = require('express');
var router = express.Router();


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


// Route api/users

// returns json of all users
router.get('/', function(req, res, next) {
  connection = getConnection();
  connection.query('select * from persons', function(err,result){
    if(err){
      console.error(err)
      res.send(500);
      return;
    }

    result = filterWithParameters(result,req.query)
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({response: "success", data: result }));
  });
  connection.end();
});


// returns the user with matching id
router.get('/:id', function(req, res, next) {
  connection = getConnection();
  var personid = req.params.id
  connection.query('select * from persons where personid=' + connection.escape(personid), function(err,result){
    if(err){
      console.error(err)
      res.send(500);
      return;
    }
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({response: "success", data: result }));
  });
  connection.end();
});

// deletes user with matching id
router.delete('/:id', function(req, res, next) {
  connection = getConnection();
  var personid = req.params.id
  connection.query('delete from persons where personid=' + connection.escape(personid), function(err,result){
    if(err){
      console.error(err)
      res.send(500);
      return;
    }

    res.writeHead(200, {"Content-Type": "application/json"});
    if(result.affectedRows > 0){
      res.end(JSON.stringify({response: "success", message: result.affectedRows + " rows deleted successfully" }));
    }
    else{
      res.end(JSON.stringify({response: "error", message: result.affectedRows + " rows where affected" }));
    }

  });
  connection.end();
});


module.exports = router;
