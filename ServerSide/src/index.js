
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

// הגדרות CORS
const corsOptions = {
    origin: process.env.REACT_URL, 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

// הגדרות ביניים
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'build'))); // שיתוף קבצי ה-build של React
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
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// הפעלת השרת
app.listen(5000, () => {
    console.log(`App is listening on port http://localhost:5000`);
});