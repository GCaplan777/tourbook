const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const cors = require('cors')
// init server
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const api = require('./routes/file');
const logger = require('morgan');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/api', api)
// database connection
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/passportpal',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
}
/** Seting up server to accept cross-origin browser requests */
app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// routes
app.use(routes);

// init socket
io.on('connect', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});

http.listen(PORT, () => {
  console.log(`server start listening on ${PORT} `);
});
