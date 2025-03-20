const express = require('express');
const fs = require('fs')
const path = require('path')
const cors = require('cors');
const basketRoute = require('./routers/basketRoute')
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const publicPath = path.join(__dirname, 'public');
const uploadDir = path.join(__dirname, 'uploads');
const announcementRoutes = require('./routers/announcementRoute');


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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/announcements', announcementRoutes);
app.use('/basket', basketRoute)
app.listen(5000, () => {
    console.log(`app is listenning on port http://localhost:5001`)
})

