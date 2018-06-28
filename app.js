const express = require('express');
const app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'sql12.freemysqlhosting.net',
  user     : 'sql12244912',
  password : '2Drmp4WWwX',
  database : 'sql12244912'
});
connection.connect();


app.get('/getwords', function(request, response){
    connection.query('select * from words_api', function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});

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

app.get('/', (req, res) => res.send('Cool'));

app.get('/usama', (req, res) => res.send('Hello usama!'));

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))