// FILE: server/routes/comments.js - FINAL FIXED VERSION

const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken } = require('../middleware/auth');

// GET /api/comments/games/:gameId - Get all comments for a game
router.get('/games/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    
    console.log('📥 Fetching comments for game:', gameId);
    
    // IMPORTANT: Removed .orderBy() to avoid Firestore index requirement
    // Will sort in JavaScript instead
    const commentsSnapshot = await db.collection('comments')
      .where('game_id', '==', gameId)
      .get();
    
    if (commentsSnapshot.empty) {
      console.log('ℹ️ No comments found for game:', gameId);
      return res.json({
        success: true,
        data: [],
        message: 'No comments yet'
      });
    }
    
    const comments = [];
    for (const doc of commentsSnapshot.docs) {
      const commentData = doc.data();
      
      // Fetch username
      const userDoc = await db.collection('users').doc(commentData.user_id).get();
      const username = userDoc.exists ? userDoc.data().username : 'Unknown User';
      
      comments.push({
        comment_id: doc.id,
        ...commentData,
        username
      });
    }
    
    // Sort by timestamp in JavaScript (newest first)
    comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    console.log('✅ Found', comments.length, 'comments');
    
    res.json({
      success: true,
      data: comments
    });
  } catch (error) {
    console.error('❌ Error fetching comments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    });
  }
});

// POST /api/comments/games/:gameId - Post a comment
router.post('/games/:gameId', verifyToken, async (req, res) => {
  try {
    const { gameId } = req.params;
    const { content } = req.body;
    
    console.log('📤 Posting comment for game:', gameId, 'from user:', req.user.user_id);
    console.log('💬 Comment content:', content);
    
    if (!content || content.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required'
      });
    }
    
    // Verify game exists
    const gameDoc = await db.collection('games').doc(gameId).get();
    if (!gameDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
    
    const commentData = {
      game_id: gameId,
      user_id: req.user.user_id,
      content: content.trim(),
      timestamp: new Date().toISOString()
    };
    
    const docRef = await db.collection('comments').add(commentData);
    
    console.log('✅ Comment posted successfully:', docRef.id);
    
    res.status(201).json({
      success: true,
      message: 'Comment posted successfully',
      data: {
        comment_id: docRef.id,
        ...commentData,
        username: req.user.username
      }
    });
  } catch (error) {
    console.error('❌ Error posting comment:', error);
    res.status(500).json({
      success: false,
      message: 'Error posting comment',
      error: error.message
    });
  }
});

// DELETE /api/comments/:commentId - Delete a comment
router.delete('/:commentId', verifyToken, async (req, res) => {
  try {
    const { commentId } = req.params;
    
    console.log('🗑️ Deleting comment:', commentId);
    
    const commentDoc = await db.collection('comments').doc(commentId).get();
    
    if (!commentDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    const commentData = commentDoc.data();
    
    // Check if user owns the comment or is admin
    if (commentData.user_id !== req.user.user_id && !req.user.is_admin) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own comments'
      });
    }
    
    await db.collection('comments').doc(commentId).delete();
    
    console.log('✅ Comment deleted successfully');
    
    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting comment:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting comment',
      error: error.message
    });
  }
});

module.exports = router;