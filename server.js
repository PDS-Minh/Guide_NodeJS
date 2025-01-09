const http = require('http');

http.createServer(function(req, res) {
  res.write('<h1>Hello world</h1>');
  res.end('<p>Hello Node.js Server!</p>');
}).listen(8080, function () {
  console.log('listening on 8080');
});