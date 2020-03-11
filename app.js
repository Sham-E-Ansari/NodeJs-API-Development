const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();



//db
mongoose
	.connect(
		process.env.MONGO_URI,
		{useNewUrlParser: true, useUnifiedTopology: true},

		)
.then( ()=> console.log("DB Connected!!!"))

mongoose.connection.on('error', err=>{
	console.log('DB connection error: ',err.message)
});


//bring in routes
//const postRoutes = require('./routes/post'); 
//const {getPosts} = require('./routes/post'); //using object destructor

const postRoutes = require("./routes/post"); //as a middleware controller


//middleware
// const myOwnMiddleware = (req, res, next) => {
// 	console.log("middleware applied");
// 	next();
// };
//app.use(myOwnMiddleware);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
//app.get("/", postRoutes.getPosts);

//app.get("/", getPosts);    //using object destructor
app.use("/", postRoutes); //using as a middleware


const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('A NodeJS API is listening on port: ',port);

});