const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Initialize Express
const app = express();

// Allow CORS (to enable your frontend to talk to the backend)
app.use(cors());

// Create 'uploads' folder if it doesn't exist
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Ensure the file name is unique
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp
  },
});

// Create Multer instance for file handling
const upload = multer({ storage: storage });

// Middleware to serve static files (images) from the /uploads folder
app.use('/uploads', express.static(uploadDir)); // Add this line to serve files

// Sample API to handle file upload and save shop data
app.post('/api/shops', upload.single('logo'), (req, res) => {
  const { name, description } = req.body;
  const logo = req.file ? `/uploads/${req.file.filename}` : null; // Store the logo file path

  // Normally you'd save this to a database, here we just simulate a response
  res.json({
    name,
    description,
    logo,
  });
});

// Dummy endpoint to list shops (you would use a database)
app.get('/api/shops', (req, res) => {
  res.json([
    { id: 1, name: 'Shop 1', description: 'Description 1', logo: '/uploads/sample1.jpg' },
    { id: 2, name: 'Shop 2', description: 'Description 2', logo: '/uploads/sample2.jpg' },
  ]);
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
