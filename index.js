const express = require('express');
const config = require('./config');
const routes = require('./server/routes')

const app = express();

app.get('/', (req, res) => {
  res.send(routes.start());
});

app.get('/info', (req, res) => {
  res.send(routes.start());
});

/*app.all('/*', (req, res) => {
  res.redirect("/");
});*/

app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + config.buildFolder));

const listener = app.listen(3000);
console.log(`Server is live at http://localhost:${listener.address().port}`);
