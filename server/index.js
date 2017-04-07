let express = require('express');
let app = express();

//this route for server side validation with Google
//see https://developers.google.com/identity/sign-in/android/backend-auth
app.post('/api/validate', function(req, res) {
  res.send('hello world');
});

app.route('/friends')
  .get(function (req, res) {
    res.send('Get all friends');
  })
  .post(function (req, res) {
    res.send('Add a friend');
  });

app.route('/friends/:id')
  .get(function (req, res) {
    res.send('Get one friend');
  })
  .put(function (req, res) {
    res.send('Update a friends name or number');
  })

let port = process.env.PORT || 1337;

app.listen(port);

console.log('Listening on port ', port);