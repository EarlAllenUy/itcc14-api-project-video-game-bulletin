const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const gamesRoutes = require('./routes/games');
const usersRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments');
const favoritesRoutes = require('./routes/favorites');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// ============================================
// API ROUTES - THIS IS CRITICAL!
// ============================================
app.use('/api/games', gamesRoutes);
app.use('/api/releases', gamesRoutes); // Alias for games
app.use('/api/users', usersRoutes);
app.use('/api/comments', commentsRoutes);  // ✅ MUST BE HERE!
app.use('/api/favorites', favoritesRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'VGB API'
  });
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 404 handler
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.url);
  res.status(404).json({ 
    success: false, 
    message: 'Route not found',
    path: req.url
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎮 VGB API Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
  console.log(`\n✅ Routes registered:`);
  console.log(`   - /api/games`);
  console.log(`   - /api/releases`);
  console.log(`   - /api/users`);
  console.log(`   - /api/comments`);
  console.log(`   - /api/favorites`);
});

module.exports = app;