const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken } = require('../middleware/auth');

// GET /api/users/:userId/favorites - Get user's favorites
router.get('/users/:userId', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Users can only see their own favorites unless admin
    if (userId !== req.user.user_id && !req.user.is_admin) {
      return res.status(403).json({
        success: false,
        message: 'You can only view your own favorites'
      });
    }
    
    const favoritesSnapshot = await db.collection('favorites')
      .where('user_id', '==', userId)
      .get();
    
    if (favoritesSnapshot.empty) {
      return res.json({
        success: true,
        data: [],
        message: 'No favorites yet'
      });
    }
    
    // Fetch game details for each favorite
    const favorites = [];
    for (const doc of favoritesSnapshot.docs) {
      const favoriteData = doc.data();
      const gameDoc = await db.collection('games').doc(favoriteData.game_id).get();
      
      if (gameDoc.exists) {
        favorites.push({
          favorite_id: doc.id,
          game: {
            game_id: gameDoc.id,
            ...gameDoc.data()
          },
          created_at: favoriteData.created_at
        });
      }
    }
    
    res.json({
      success: true,
      data: favorites
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching favorites',
      error: error.message
    });
  }
});

// POST /api/users/:userId/favorites - Add game to favorites
router.post('/users/:userId', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { game_id } = req.body;
    
    // Users can only add to their own favorites
    if (userId !== req.user.user_id) {
      return res.status(403).json({
        success: false,
        message: 'You can only add to your own favorites'
      });
    }
    
    if (!game_id) {
      return res.status(400).json({
        success: false,
        message: 'game_id is required'
      });
    }
    
    // Verify game exists
    const gameDoc = await db.collection('games').doc(game_id).get();
    if (!gameDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
    
    // Check if already favorited
    const existingFavorite = await db.collection('favorites')
      .where('user_id', '==', userId)
      .where('game_id', '==', game_id)
      .limit(1)
      .get();
    
    if (!existingFavorite.empty) {
      return res.status(400).json({
        success: false,
        message: 'Game already in favorites'
      });
    }
    
    const favoriteData = {
      user_id: userId,
      game_id,
      created_at: new Date().toISOString()
    };
    
    const docRef = await db.collection('favorites').add(favoriteData);
    
    res.status(201).json({
      success: true,
      message: 'Game added to favorites',
      data: {
        favorite_id: docRef.id,
        ...favoriteData
      }
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding favorite',
      error: error.message
    });
  }
});

// DELETE /api/favorites/:favoriteId - Remove from favorites
router.delete('/:favoriteId', verifyToken, async (req, res) => {
  try {
    const { favoriteId } = req.params;
    
    const favoriteDoc = await db.collection('favorites').doc(favoriteId).get();
    
    if (!favoriteDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }
    
    const favoriteData = favoriteDoc.data();
    
    // Users can only remove their own favorites
    if (favoriteData.user_id !== req.user.user_id) {
      return res.status(403).json({
        success: false,
        message: 'You can only remove your own favorites'
      });
    }
    
    await db.collection('favorites').doc(favoriteId).delete();
    
    res.json({
      success: true,
      message: 'Removed from favorites'
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing favorite',
      error: error.message
    });
  }
});

module.exports = router;