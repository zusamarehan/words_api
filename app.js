const express = require('express');
const app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'sql2.freemysqlhosting.net',
  user     : 'sql2239642',
  password : 'jW7*wD9*',
  database : 'sql2239642'
});
connection.connect();


app.get('/test', function(request, response){
    connection.query('select * from words_api', function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});

app.get('/usama', (req, res) => res.send('Hello usama!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'))