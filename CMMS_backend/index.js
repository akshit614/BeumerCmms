import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import asserRoutes from './routes/assetRoutes.js';
import workOrderRoutes from './routes/workOrderRoutes.js';
import User from './models/User.js';
// import { seedInitialData } from './seeders/initialData.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 9999;

// Middleware
app.use(cors('*'));
app.use(express.json());


// Base route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'CMMS API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Don't return passwords
    });
    res.json({
      status: 'success',
      data: users
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assets', asserRoutes);
app.use('/api/workorders', workOrderRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not Found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });});

let server;

const startServer = async () => {
  try {
    // Test database connection and sync models
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    // Sync all models with safe options
    const syncOptions = {
      // alter: true, // Auto-alter in non-production
      // force: true, // Set to true to drop and recreate tables (use with caution!)
      logging: console.log // Show SQL queries in development
    };
    
    await sequelize.sync(syncOptions);
    console.log('✅ Database synchronized');

    // Import models after sync to ensure they're registered
    import('./models/User.js');
    import('./models/Assets.js');
    import('./models/WorkOrders.js');
     // Seed initial data
    // await seedInitialData();
    // console.log('✅ Initial data seeded');
    
    
    

    // Start the server
    server = app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
      console.log(`🌐 API URL: http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

// Handle graceful shutdown
const shutdown = async () => {
  console.log('🛑 Shutting down server...');
  
  if (server) {
    server.close(async () => {
      console.log('👋 HTTP server closed');
      
      // Close database connection
      try {
        await sequelize.close();
        console.log('👋 Database connection closed');
      } catch (err) {
        console.error('Error closing database connection:', err);
      }
      
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

// Handle process termination
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Start the application
startServer();
