const express = require('express');
const app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'wordgameapi.000webhostapp.com',
  user     : 'id5874260_root',
  password : 'usamarehab_!@#$',
  database : 'id5874260_words_api'
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
     
     connection.query('select * from words_api where id > '+request.params.id+' LIMIT 8', function(error, results){
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