const express = require('express');
const app = express();
const path = require('path');
const exphbs =require('express-handlebars')
const members = require('./members.js')
const PORT = process.env.PORT || 5000; //checks if default PORT is available

//const logger = require('./middleware/logger');

//needs to be at beginning of code
//creating middleware

//app.use takes in a middleware, 
//init middleware
//app.use(logger)

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false }))

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));//need to name a file main.handlebars
app.set('view engine', 'handlebars');

/*
app.get('/', (req, res)=> {
    //res.send('Hello Worsdfldsdf');
    res.sendFile(path.join(__dirname, 'public', 'index.html')); //not ideal, because we would have to do this manually for every page
    //see you need to use express.static look below
    //res.json //sends json
    //res.render to render templates like handlebars
});
*/
/*
const members =[
    {
        "id": 2,
        "name": "Hilt",
        "email": "hilt@gmail.com",
        "status": "active"
    },
    {
        "id": 1,
        "name": "Hole",
        "email": "hole@gmail.com",
        "status": "active"
    }
]
*/
//
app.get('/', (req,res) => {
    res.render('index', {
        double_brackets_for_variables: "double brackets for variables",
        members
    })
}) //renders this instead of the public static page, ORDER matters
//but it doesn't normally matter because we normally only need one or the other 

//Set static folder
app.use(express.static(path.join(__dirname, "public")))

//hwo to split code up
app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
});
//the above code will have localhost:5000, but it will say "Cannot GET /".
// this means that this app can not find the route handler for the / endpoint



