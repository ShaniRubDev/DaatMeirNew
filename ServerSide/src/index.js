
// app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(session({
// //     secret: 'your_secret_key',
// //     resave: false,
// //     saveUninitialized: true,
// //     // cookie: { secure: false }
// // }));

// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/announcements', announcementRoutes);
// app.use('/basket', basketRoute);
// app.use('/donor',donorRoute);
// app.use('/donation', donationRoutes);
// app.post('/register', async (req, res) => {
//     const { email, password } = req.body;
  
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }
  
//     // הצפנת הסיסמה
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       // השתמש ב-async/await כדי לבצע את השאילתא
//       const result = await create_query(
//         'INSERT INTO admin_permissions (email, password) VALUES (?, ?)',
//         [email, hashedPassword]
//       );
  
//       res.status(201).json({ message: "User registered successfully" });
//     } catch (err) {
//       console.log("Error registering user:", err);
//       res.status(500).json({ message: "Error registering user" });
//     }
//   });

//   app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: "Email and password are required" });
//     }

//     try {
//         const results = await get_query(
//             'SELECT * FROM admin_permissions WHERE email = ?', 
//             [email]
//         );

//         if (!results || results.length === 0) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         const user = results[0];
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         const token = generateToken(user.id);
//         res.status(200).json({ message: "Login successful", token });

//     } catch (error) {
//         console.log("Error logging in:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// app.listen(5000, () => {
//     console.log(`app is listenning on port http://localhost:5001`)
// })

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { generateToken } = require('./auth');
const { get_query, create_query } = require('./db');

// נתיבים
const basketRoute = require('./routers/basketRoute');
const announcementRoutes = require('./routers/announcementRoute');
const donorRoute = require('./routers/donorRouters');
const donationRoutes = require('./routers/donationRoutes');

dotenv.config();

const app = express();
const publicPath = path.join(__dirname, 'public');
const uploadDir = path.join(__dirname, 'uploads');

// הדפסת נתיב תיקיית העלאות לאימות
console.log("Uploads folder path:", uploadDir);

// app.use(express.static(path.join(__dirname, 'build'))); // שיתוף קבצי ה-build של React


// הגדרות ביניים
app.use(express.static(path.join(__dirname, 'build'))); // שיתוף קבצי ה-build של React
app.use(cors());
app.use(express.static(publicPath));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// בדיקה ויצירת תיקיית העלאות אם אינה קיימת
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// נתיבים סטטיים
app.use('/uploads', express.static(uploadDir));
app.use('/announcements', announcementRoutes);
app.use('/basket', basketRoute);
app.use('/donor', donorRoute);
app.use('/donation', donationRoutes);

// רישום משתמש
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // השאילתה השתנתה ל-PostgreSQL
        await create_query(
            'INSERT INTO admin_permissions (email, password) VALUES ($1, $2)', 
            [email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log("Error registering user:", err);
        res.status(500).json({ message: "Error registering user" });
    }
});

// התחברות משתמש
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // השאילתה השתנתה ל-PostgreSQL
        const results = await get_query(
            'SELECT * FROM admin_permissions WHERE email = $1', 
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
app.get('*', (req, res) => {
    const buildPath = path.join(__dirname, 'build', 'index.html');
    res.sendFile(buildPath);
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// הפעלת השרת
app.listen(5000, () => {
    console.log(`App is listening on port http://localhost:5000`);
});
