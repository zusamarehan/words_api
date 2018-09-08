const express = require('express');
const app = express();


app.get('/', (req, res) => res.send('Working'));

var port = process.env.port || process.env.PORT || 1337;

app.listen(port, function() {
  console.log('Listening on ' + port);
});
