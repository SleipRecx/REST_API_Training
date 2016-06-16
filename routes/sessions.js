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



router.get('/', function(req, res, next) {
  connection = getConnection();
  connection.query('select sessionid,sessions.personid_fk,date,exercise_name, kg, reps from sessions '+
  'join results on sessionid_fk=sessionid join exercise on exerciseid = exerciseid_fk '+
  'join execution on resultid=resultid_fk order by date desc', function(err,result){
    if(err){
      console.error(err);
      res.send(500);
      return;
    }
    var identifier = ""
    var identifier2 = ""
    var objects =[]
    var object = { }
    var first = false;
    for(i=0;i<result.length;i++){
      if(result[i].place+result[i].date != identifier){
        objects.push(object);
        object = {};
        object.id = result[i].sessionid;
        object.user = result[i].personid_fk;
        object.place = result[i].place;
        object.date = result[i].date;
        object.exercises = [{ name: result[i].exercise_name, sets: [{kg: result[i].kg, reps: result[i].reps}]}];
        first = true
      }
      else{
        if(identifier2 != result[i].date+result[i].exercise_name){
          if(!first){
          object.exercises.push({ name: result[i].exercise_name, sets: [{kg: result[i].kg, reps: result[i].reps}]})
        }
        else{
          object.exercises[object.exercises.length-1].sets.push({kg: result[i].kg, reps: result[i].reps})
        }
        }
        else{
            object.exercises[object.exercises.length-1].sets.push({kg: result[i].kg, reps: result[i].reps})
        }
        identifier2 = result[i].date+result[i].exercise_name
        first = false;
      }
      identifier = result[i].place+result[i].date
    }

    objects.shift()
    objects = filterWithParameters(objects,req.query)
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({response: "success", rows: objects.length, data: objects }));
    connection.end();
  });
});


router.get('/:id', function(req, res, next) {
  connection = getConnection();
  connection.query('select sessionid,sessions.personid_fk,date,exercise_name, kg, reps from sessions '+
  'join results on sessionid_fk=sessionid join exercise on exerciseid = exerciseid_fk '+
  'join execution on resultid=resultid_fk order by date desc', function(err,result){
    if(err){
      console.error(err);
      res.send(500);
      return;
    }
    var identifier = ""
    var identifier2 = ""
    var objects =[]
    var object = { }
    var first = false;
    for(i=0;i<result.length;i++){
      if(result[i].place+result[i].date != identifier){
        objects.push(object);
        object = {};
        object.id = result[i].sessionid;
        object.user = result[i].personid_fk;
        object.place = result[i].place;
        object.date = result[i].date;
        object.exercises = [{ name: result[i].exercise_name, sets: [{kg: result[i].kg, reps: result[i].reps}]}];
        first = true
      }
      else{
        if(identifier2 != result[i].date+result[i].exercise_name){
          if(!first){
          object.exercises.push({ name: result[i].exercise_name, sets: [{kg: result[i].kg, reps: result[i].reps}]})
        }
        else{
          object.exercises[object.exercises.length-1].sets.push({kg: result[i].kg, reps: result[i].reps})
        }
        }
        else{
            object.exercises[object.exercises.length-1].sets.push({kg: result[i].kg, reps: result[i].reps})
        }
        identifier2 = result[i].date+result[i].exercise_name
        first = false;
      }
      identifier = result[i].place+result[i].date
    }

    objects.shift()
    console.log(req.params.id)
    objects = filterWithParameters(objects,{id: req.params.id})
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({response: "success", rows: objects.length, data: objects }));
    connection.end();
  });
});

router.get('/user/:id', function(req, res, next) {
  connection = getConnection();
  connection.query('select sessionid,sessions.personid_fk,date,exercise_name, kg, reps from sessions '+
  'join results on sessionid_fk=sessionid join exercise on exerciseid = exerciseid_fk '+
  'join execution on resultid=resultid_fk order by date desc', function(err,result){
    if(err){
      console.error(err);
      res.send(500);
      return;
    }
    var identifier = ""
    var identifier2 = ""
    var objects =[]
    var object = { }
    var first = false;
    for(i=0;i<result.length;i++){
      if(result[i].place+result[i].date != identifier){
        objects.push(object);
        object = {};
        object.id = result[i].sessionid;
        object.user = result[i].personid_fk;
        object.place = result[i].place;
        object.date = result[i].date;
        object.exercises = [{ name: result[i].exercise_name, sets: [{kg: result[i].kg, reps: result[i].reps}]}];
        first = true
      }
      else{
        if(identifier2 != result[i].date+result[i].exercise_name){
          if(!first){
          object.exercises.push({ name: result[i].exercise_name, sets: [{kg: result[i].kg, reps: result[i].reps}]})
        }
        else{
          object.exercises[object.exercises.length-1].sets.push({kg: result[i].kg, reps: result[i].reps})
        }
        }
        else{
            object.exercises[object.exercises.length-1].sets.push({kg: result[i].kg, reps: result[i].reps})
        }
        identifier2 = result[i].date+result[i].exercise_name
        first = false;
      }
      identifier = result[i].place+result[i].date
    }

    objects.shift()
    console.log(req.params.id)
    objects = filterWithParameters(objects,{user: req.params.id})
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({response: "success", rows: objects.length, data: objects }));
    connection.end();
  });
});






module.exports = router;
