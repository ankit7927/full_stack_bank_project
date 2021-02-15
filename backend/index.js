var express = require("express");
var server = express()
var cors = require("cors");

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



///all usable
server.use(express.json())
server.use(bodyParser.urlencoded({
  extended: true
}));

const corsOptions = {
  //  origin: 'http://localhost:3000',
  credentials: true,
  //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  origin: 'http://localhost:3000'
}
server.use(cors(corsOptions));


server.use(cookieParser());


///all routes
server.use("/auth", require("./routes/auth-route"))



server.listen(4000, ()=> {
  console.log("server is running ")
})