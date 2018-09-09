const express = require('express');
const app = express();


var mysql      = require('mysql');

var mysql_pool  = mysql.createPool({
  connectionLimit : 1000,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  connectTimeout  : 60 * 60 * 1000,
  aquireTimeout   : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});


// connection.connect();


app.get('/getwords/:id', function(request, response){
     
  mysql_pool.getConnection(function(err, connection) {

    if (err) {
//       connection.release();
      console.log(' Error getting mysql_pool connection: ' + err);
//       throw err;
    }

    connection.query('select * from words_api where id >= '+request.params.id+' LIMIT 8', function(error, rows,fields){
      if ( error ){
            response.status(400).send(error);
        } else {
            connection.release();
            response.send(rows);
        }
    });

 });

});

app.get('/attack/:id', function(request, response){
     
      mysql_pool.getConnection(function(err, connection) {

        if (err) {
//           connection.release();
          console.log(' Error getting mysql_pool connection: ' + err);
//           throw err;
        }

        connection.query('select * from words_api order by rand() LIMIT '+(request.params.id), function(error, rows,fields){
          if ( error ){
                response.status(400).send(error);
            } else {
                connection.release();
                response.send(rows);
            }
        });

     });

});

app.get('/allWords', function(request, response){
     
      mysql_pool.getConnection(function(err, connection) {

        if (err) {
//           connection.release();
          console.log(' Error getting mysql_pool connection: ' + err);
//           throw err;
        }

        connection.query('select * from words_api', function(error, rows,fields){
          if ( error ){
                response.status(400).send(error);
            } else {
                connection.release();
                response.send(rows);
            }
        });

     });

});

app.get('/', (req, res) => res.send('Working'));

app.get('/checkUpdate', (req, res) => res.send(process.env.UPDATE_CHECK));

var port = process.env.port || process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on ' + port);
});


