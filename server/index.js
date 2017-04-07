let express = require('express');
let app = express();

app.get('/', function(req, res) {
  res.send('hello world');
});

let port = process.env.PORT || 1337;

app.listen(port);

console.log('Listening on port ', port);