const express = require('express');
const app = express();


var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'sql12.freemysqlhosting.net',
//   user     : 'sql12245330',
//   password : '6JiNkRgsDM',
//   database : 'sql12245330'
// });

var mysql_pool  = mysql.createPool({
  connectionLimit : 10,
  host     : 'sql12.freemysqlhosting.net',
  user     : 'sql12245330',
  password : '6JiNkRgsDM',
  database : 'sql12245330'
});


// connection.connect();


app.get('/getwords/:id', function(request, response){
     
  mysql_pool.getConnection(function(err, connection) {

    if (err) {
      connection.release();
      console.log(' Error getting mysql_pool connection: ' + err);
      throw err;
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
        connection.release();
        console.log(' Error getting mysql_pool connection: ' + err);
        throw err;
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

app.get('/', (req, res) => res.send('Working'));

var port = process.env.port || process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on ' + port);
});


