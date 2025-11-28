import express from 'express';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../models/User.js';
import { testConnection } from '../config/db.js';
import { requireAuth } from '../middleWares/auth.js';

const router = express.Router();

// Test database connection for all routes
router.use(async (req, res, next) => {
  try {
    await testConnection();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection error' });
  }
});

/**
 * @route   GET /me
 * @desc    Test authentication route
 * @access  Public
 */
router.get('/me', requireAuth, (req, res) => {
  res.status(200).json({
    message: 'hey this is you',
    user: req.user,
  });
});

/**
 * @route   POST /signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this username or email' });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password // In production, hash the password before saving
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
});

/**
 * @route   POST /signin
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'username', 'email', 'password']
    });
    
    if (!user) {
      return res.status(401).json({ message: 'User dose not exist with this email' });
    }
    
    // In production, use: const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = (password === user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Wrong email or password' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Return user data (excluding password) and token
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });
    
    res.status(200).json({ 
      ...userWithoutPassword,
      token
    });
    
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ 
      message: 'Error during authentication',
      error: error.message 
    });
  }
});


export default router;