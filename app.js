const express = require('express');
const app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_USER
});
connection.connect();


app.get('/getwords/:id', function(request, response){
     
     connection.query('select * from words_api where id >= '+request.params.id+' LIMIT 8', function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});

app.get('/attack/:id', function(request, response){
     
     connection.query('select * from words_api order by rand() LIMIT '+(request.params.id), function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});

app.get('/', (req, res) => res.send('Working'));

var port = process.env.PORT; // 2. Using process.env.PORT
app.set('port', port);

app.listen(port);