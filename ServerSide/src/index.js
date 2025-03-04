const express = require('express');
const fs = require('fs')
const path = require('path')
// const conf = require('./config/config')
const cors = require('cors');
// const logEvents = require('./loger');
// const events = require('events');
// const eventEmitter = new events.EventEmitter();
const basketRoute = require('./routers/basketRoute')
// const verifyJWT = require('./middelware/verifyJWT')
const app = express();
const session = require('express-session');
// const { loger } = require('./middelware/logs')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const publicPath = path.join(__dirname, 'public');

app.use(cors()); // Add this line
app.use(express.static(publicPath));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     // cookie: { secure: false }
// }));



app.use('/basekt', basketRoute)
app.listen(5000, () => {
    console.log(`app is listenning on port http://localhost:5000`)
})