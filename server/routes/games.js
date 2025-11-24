const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/releases - Get all game releases
router.get('/', async (req, res) => {
  try {
    const { limit = 50, offset = 0, genre, platform, search } = req.query;
    
    let query = db.collection('games');
    
    // Apply filters
    if (genre) {
      query = query.where('genre', '==', genre);
    }
    
    // Get documents
    const snapshot = await query
      .orderBy('release_date', 'desc')
      .limit(parseInt(limit))
      .offset(parseInt(offset))
      .get();
    
    if (snapshot.empty) {
      return res.json({
        success: true,
        data: [],
        message: 'No games found'
      });
    }
    
    const games = [];
    snapshot.forEach(doc => {
      games.push({
        game_id: doc.id,
        ...doc.data()
      });
    });
    
    // Apply client-side filters (search, platform)
    let filteredGames = games;
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredGames = filteredGames.filter(game => 
        game.title.toLowerCase().includes(searchLower) ||
        (game.description && game.description.toLowerCase().includes(searchLower))
      );
    }
    
    if (platform) {
      filteredGames = filteredGames.filter(game => 
        game.platforms && game.platforms.includes(platform)
      );
    }
    
    res.json({
      success: true,
      data: filteredGames,
      count: filteredGames.length
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching games',
      error: error.message
    });
  }
});

// GET /api/games/:id - Get specific game
router.get('/:id', async (req, res) => {
  try {
    const gameDoc = await db.collection('games').doc(req.params.id).get();
    
    if (!gameDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        game_id: gameDoc.id,
        ...gameDoc.data()
      }
    });
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching game',
      error: error.message
    });
  }
});

// POST /api/games - Add new game (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, release_date, platforms, specifications, genre, description } = req.body;
    
    // Validation
    if (!title || !release_date || !platforms || !genre) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, release_date, platforms, genre'
      });
    }
    
    const gameData = {
      title,
      release_date,
      platforms: Array.isArray(platforms) ? platforms : [platforms],
      specifications: specifications || {},
      genre,
      description: description || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const docRef = await db.collection('games').add(gameData);
    
    res.status(201).json({
      success: true,
      message: 'Game created successfully',
      data: {
        game_id: docRef.id,
        ...gameData
      }
    });
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating game',
      error: error.message
    });
  }
});

// PUT /api/games/:id - Update game (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const gameRef = db.collection('games').doc(req.params.id);
    const gameDoc = await gameRef.get();
    
    if (!gameDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
    
    const updateData = {
      ...req.body,
      updated_at: new Date().toISOString()
    };
    
    // Remove undefined fields
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );
    
    await gameRef.update(updateData);
    
    const updatedDoc = await gameRef.get();
    
    res.json({
      success: true,
      message: 'Game updated successfully',
      data: {
        game_id: updatedDoc.id,
        ...updatedDoc.data()
      }
    });
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating game',
      error: error.message
    });
  }
});

// DELETE /api/games/:id - Delete game (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const gameRef = db.collection('games').doc(req.params.id);
    const gameDoc = await gameRef.get();
    
    if (!gameDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
    
    await gameRef.delete();
    
    res.json({
      success: true,
      message: 'Game deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting game',
      error: error.message
    });
  }
});

module.exports = router;