const express = require('express');
const config = require('./config');
const routes = require('./server/routes');
const fs = require('fs');

console.log('Will build');

fs.writeFile('public/index.html', routes.start(), function (err) {
  if (err) 
      return console.log(err);
  console.log('Wrote start.html');
});

fs.writeFile('public/reanactment.html', routes.reanactment(), function (err) {
  if (err) 
      return console.log(err);
  console.log('Wrote reanactment.html');
});

fs.writeFile('public/hire-us.html', routes.hireUs(), function (err) {
  if (err) 
      return console.log(err);
  console.log('Wrote hireUs.html');
});

fs.writeFile('public/about.html', routes.about(), function (err) {
  if (err) 
      return console.log(err);
  console.log('Wrote about.html');
});

fs.writeFile('public/vikings.html', routes.vikings(), function (err) {
  if (err) 
      return console.log(err);
  console.log('Wrote vikings.html');
});


fs.writeFile('public/404.html', routes.error(), function (err) {
  if (err) 
      return console.log(err);
  console.log('Wrote 404.html');
});
