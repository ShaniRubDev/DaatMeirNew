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
const uploadDir = path.join(__dirname, 'uploads');

// הדפס את הנתיב על מנת לוודא שהוא נכון
console.log("Uploads folder path:", uploadDir);

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

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


// app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));
// app.use('/uploads', express.static(path.join('uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/basket', basketRoute)
app.listen(5000, () => {
    console.log(`app is listenning on port http://localhost:5001`)
})

