const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

mongoose.connect('mongodb://127.0.0.1:27017/Multer&CrudOperations');

const loginModel = require('./models/login');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Public'));

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await loginModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await loginModel.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect email or password' });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'You have logged in successfully', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Example of a protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
