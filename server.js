// // I.N.D.U.C.E.S
// // ==============

// // --------------------- INDEX --------------------

// app.get("/veggies", async (req, res) => {
//   // console.log("Index Controller Func. running...");
//   try {
//     const foundVeggie = await Veggie.find();
//     res.render("veggies/Index", { veggies: foundVeggie });
//   } catch (err) {
//     res.status(200).send(err);
//   }
// });





// // --------------------- NEW (GET) --------------------
// // New // renders a form to create a new fruit

// app.get("/veggies/new", (req, res) => {
//   res.render("veggies/New");
// });




// // --------------------- DELETE (DELETE) --------------------
// // Delete // receives the id of teh fruit doc & deletes it
// app.delete('/fruits/:id', async(req,res) => {
//   // res.send('delete ...')

//   try {
//     //grabbing _id from params, it's givien value on the Index.jsx look at the template literal! 
//     await Fruit.findByIdAndDelete(req.params.id)
//     res.redirect('/fruits')
//   } catch(err) {
//     res.status(400).send(err);
//   }
// })




// // --------------------- UPDATE (PUT) --------------------
// app.put('/fruits/:id', async (req,res) =>{
//   try {
//     //boolean value, if .readyToEat !== 'on' it will value to false
//     req.body.readyToEat = req.body.readyToEat === "on";
//     // new:true <- if not in, the old doc will show even in the back it has been updated. 
//     const updateFruit = await Fruit.findByIdAndUpdate(
//       // id grabbed from the url, check Edit.jsx
//       req.params.id, 
//       //Data from Edit form
//       req.body, 
//       //
//       {new: true})
//     console.log(updateFruit)
//     res.redirect(`/fruits/${req.params.id}`)
//   } catch (err) {
//     res.status(400).send(err);
//   }
// })





// // --------------------- CREATE (POST) --------------------
// // Create // recieves info from new route to then create a new fruit w/ it

// app.post("/veggies", async (req, res) => {
//   try {
//     req.body.readyToEat = req.body.readyToEat === "on";
//     const newVeggie = await Veggie.create(req.body);
//     console.log(newVeggie);
//     //console.log(veggies);
//     // redirect is making a GET request to whatever path you specify
//     res.redirect("/veggies");
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });






// // --------------------- EDIT --------------------  
// app.get('/fruits/:id/edit', async (req,res) =>{
//   try {
//     // this is to find the fruit by specify id
//     const foundFruit = Fruit.findById(req.params.id) 
//     // after the fruit was found, sever go look at Edit.jsx to make update accordingly
//     res.render('fruits/Edit',{
//       fruit: foundFruit
//     })
//   } catch (err) {
//     res.status(400).send(err);
//   }
// })




// // --------------------- SHOW --------------------

// app.get("/veggies/:id", async(req, res) => {
//   try{
//     const foundVeggie = await Veggie.findById(req.params.id) // .id = _id, because line 65 we're taking the route /veggies/:id from index.jsx
//     res.render("veggies/Show", {
//       //second param must be an object
//       veggie: foundVeggie,
//       //there will be a variable available inside the jsx file called fruit, its value is veggies
//     });
//   } catch(err) {
//     res.status(400).send(err)
//   }
// });



require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { connect, connection } = require('mongoose');
const methodOverride = require('method-override');
const fruitsController = require('./controllers/fruitsController')



// --------------------- DATABASE CONNECTION --------------------
connect(process.env.MONGO_URI, {
  // Having these two properties set to true is best practice when connecting to MongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// This line of code will run the function below once the connection to MongoDB has been established.
connection.once('open', () => {
  console.log('connected to mongo');
});





// --------------------- VIEW ENGINE --------------------
// This line tells the render method the default file extension to look for.
const reactViewsEngine = require('jsx-view-engine').createEngine();
app.engine('jsx', reactViewsEngine);
app.set('view engine', 'jsx');
// This line sets the render method's default location to look for a jsx file to render. Without this line of code we would have to specific the views directory everytime we use the render method
app.set('views', './views');






// --------------------- MIDDLEWARE -------------------
// This enables the req.body, after app has been defined
app.use(express.urlencoded({ extended: false })); 
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));
app.use(express.static('public'))





// --------------------- CUSTOM MIDDLEWARE --------------------
app.use((req, res, next) => {
  // console.log('Middleware running...');
  next();
});





// --------------------- ROUTES --------------------
//when a user goes to /fruits, sever redirect them to fruitsController when I specified all routes & request
app.use('/fruits',fruitsController)






// --------------------- CATCH ALL ROUTES --------------------
// catch all route, if the users try to reach a route that doesn't match the noes above it will catch them and redirect to the Index page
app.get('/*',(req,res) =>{
  // res.redirect('/fruits')
  res.send(`
    <div>404 this page doesn't exist!<br />
    <a href="/fruits">Fruits</a><br />
    <a href="/veggies">Vegetables</a>
    </div>
  `)
})




// --------------------- LISTEN --------------------

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});