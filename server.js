const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fruits = require('./models/fruits');

// View Engine Middleware Configure
const reactViewsEngine = require('jsx-view-engine').createEngine();
app.engine('jsx', reactViewsEngine);
// This line tells the render method the default file extension to look for.
app.set('view engine', 'jsx');
// This line sets the render method's default location to look for a jsx file to render. Without this line of code we would have to specific the views directory everytime we use the render method
app.set('views', './views');

// Custom Middleware
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log('Middleware running...');
  next();
});

// I.N.D.U.C.E.S
// ==============
// Index
app.get('/fruits', (req, res) => {
  console.log('Index Controller Func. running...');
  res.render('fruits/Index', { fruits });
});

// New // renders a form to create a new fruit
app.get('/fruits/new', (req, res) => {
  res.render('fruits/New');
});

// Create // recieves info from new route to then create a new fruit w/ it
app.post('/fruits', (req, res) => {
  req.body.readyToEat = req.body.readyToEat === 'on';
  fruits.push(req.body);
  //console.log(fruits);
  // redirect is making a GET request to whatever path you specify
  res.redirect('/fruits');
});

// Show
app.get('/fruits/:id', (req, res) => {
  res.render('fruits/Show', {
    //second param must be an object
    fruit: fruits[req.params.id],
    //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
