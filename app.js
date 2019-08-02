const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require ('express-validator');
// init app
const app= express();
const port =3000;
const index= require('./routes/index');
const categories= require('./routes/categories');
const articles= require('./routes/articles');
const manage= require('./routes/manage');
const mongoose = require('mongoose');
//connect mongoose
mongoose.connect('mongodb://localhost/sportsblog',{useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
//moment
app.locals.moment= require('moment');

//view setup
app.set('views', (__dirname,'views'));
app.set('view engine','pug');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up static folder
app.use(express.static(path.join(__dirname,'public')));

//set up for the flash
app.use(require('connect-flash')());
app.use((req, res, next)=> {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//middleware for express validator
app.use(expressValidator({
    errorFormatter: (param, msg, value)=> {
        const namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  app.use('/', index);
  app.use('/index', index);
  app.use('/articles', articles);
  app.use('/categories', categories);
  app.use('/manage', manage);

  
  app.listen(port, () => console.log(`app listening on port ${port}!`));