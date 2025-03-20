const express = require('express');
const fs = require('fs')
const path = require('path')
const cors = require('cors');
const basketRoute = require('./routers/basketRoute')
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {generateToken} = require('./auth');
// const db = require('./db'); // או הנתיב שבו מחובר ה-DB שלך
const { get_query, create_query } = require('./db');

const bcrypt = require('bcryptjs');

const publicPath = path.join(__dirname, 'public');
const dotenv = require('dotenv');
dotenv.config();const uploadDir = path.join(__dirname, 'uploads');
const announcementRoutes = require('./routers/announcementRoute');


// הדפס את הנתיב על מנת לוודא שהוא נכון
console.log("Uploads folder path:", uploadDir);

app.use(cors()); // Add this line
app.use(express.static(publicPath));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // כדי לקרוא JSON בבקשות API
// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     // cookie: { secure: false }
// }));

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    // הצפנת הסיסמה
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // השתמש ב-async/await כדי לבצע את השאילתא
      const result = await create_query(
        'INSERT INTO admin_permissions (email, password) VALUES (?, ?)',
        [email, hashedPassword]
      );
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.log("Error registering user:", err);
      res.status(500).json({ message: "Error registering user" });
    }
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const results = await get_query(
            'SELECT * FROM admin_permissions WHERE email = ?', 
            [email]
        );

        if (!results || results.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user.id);
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.log("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/announcements', announcementRoutes);
app.use('/basket', basketRoute)
app.listen(5000, () => {
    console.log(`app is listenning on port http://localhost:5001`)
})

