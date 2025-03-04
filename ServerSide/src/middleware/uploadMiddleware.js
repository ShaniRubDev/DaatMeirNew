const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // תיקייה בה התמונות יישמרו
    },
    filename: (req, file, cb) => {
        const title = req.body.title;  // משתמשים ב-title מה-body של הבקשה
        if (!title) {
            return cb(new Error('Title is required for the image file.'));
        }
        
        // אם יש title, משתמשים בו כדי ליצור שם קובץ
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = title.replace(/\s+/g, '-').toLowerCase() + '-' + uniqueSuffix + path.extname(file.originalname);
        
        cb(null, fileName);  // שומר את הקובץ עם שם המבוסס על ה-title
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// יצירת middleware של multer
const upload = multer({ storage, fileFilter });

module.exports = upload;