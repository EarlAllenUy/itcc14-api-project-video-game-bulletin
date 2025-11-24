const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../config/firebase');
const { generateToken, verifyToken } = require('../middleware/auth');

// POST /api/users - Register new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: username, email, password'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }
    
    // Check if email already exists
    const existingUser = await db.collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();
    
    if (!existingUser.empty) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    
    // Create user
    const userData = {
      username,
      email,
      password_hash,
      is_admin: false,
      created_at: new Date().toISOString()
    };
    
    const docRef = await db.collection('users').add(userData);
    
    // Generate token
    const token = generateToken(docRef.id, false);
    
    // Return user data (without password)
    const { password_hash: _, ...userResponse } = userData;
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user_id: docRef.id,
        ...userResponse
      },
      token
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

// POST /api/users/login - User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // Find user by email
    const usersSnapshot = await db.collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();
    
    if (usersSnapshot.empty) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    const userDoc = usersSnapshot.docs[0];
    const userData = userDoc.data();
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, userData.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Generate token
    const token = generateToken(userDoc.id, userData.is_admin);
    
    // Return user data (without password)
    const { password_hash: _, ...userResponse } = userData;
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user_id: userDoc.id,
        ...userResponse
      },
      token
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
});

// GET /api/users/me - Get current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const { password_hash: _, ...userResponse } = req.user;
    
    res.json({
      success: true,
      data: userResponse
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
});

module.exports = router;