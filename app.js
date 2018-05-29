const express = require('express');
const app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '35.200.173.249',
  user     : 'root',
  password : 'ZR_words_api_10_butter',
  database : 'words_api_db'
});
connection.connect();


app.get('/getwords', function(request, response){
    connection.query('select * from words', function(error, results){
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