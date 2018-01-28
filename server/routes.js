

var Handlebars = require("handlebars");
var fs = require('fs');

var partialsDir = './views/templates/components';
var viewsDir = './views/templates/views';
var filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
  const name = filename.split('.')[0];
  const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  Handlebars.registerPartial(name, template);
});

Handlebars.registerHelper('json', function(data, options) {
  return options.fn(JSON.parse(data));
});

Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

const getView = (viewName) => {
  return Handlebars.compile(fs.readFileSync(viewsDir + '/' + viewName + '.hbs', 'utf8'));
}

const start = () => {
  return getView('start')();
};

const reanactment = () => {
  return getView('reanactment')();
};

const hireUs = () => {
  return getView('hire-us')();
}

const about = () => {
  return getView('about')();
}

module.exports = {
  start,
  reanactment,
  hireUs,
  about
};
