// COMPLETE script.js - VGB Application with Comments System

console.log("Video Game Bulletin loaded");

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("vgb_token");
  const user = localStorage.getItem("vgb_user") ? JSON.parse(localStorage.getItem("vgb_user")) : null;

  console.log("User from localStorage:", user);
  console.log("Token from localStorage:", token);

  // Load featured games on index page
  const gameGrid = document.querySelector('.game-grid');
  if (gameGrid) {
    await loadFeaturedGames(gameGrid);
  }

  // Setup navigation
  setupNavigation();
  
  // Update UI based on auth state
  updateAuthUI(user);
});

// Load featured games from API
async function loadFeaturedGames(container) {
  try {
    const response = await fetch('/api/releases?limit=6');
    const data = await response.json();

    if (data.success && data.data) {
      container.innerHTML = '';
      
      data.data.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game';
        const user = VGB_API.getCurrentUser();
        const favoriteBtn = user ? 
          `<button onclick="addGameToFavorites('${game.game_id}')" class="btn-favorite">⭐ Add to Favorites</button>` 
          : 
          `<p style="color: #999; font-size: 0.9em;">Log in to add favorites</p>`;

        gameCard.innerHTML = `
          <div class="game-card">
            <h3>${game.title}</h3>
            <p class="genre">${game.genre}</p>
            <p class="release">Release: ${new Date(game.release_date).toLocaleDateString()}</p>
            <p class="platforms">${game.platforms.join(', ')}</p>
            ${favoriteBtn}
          </div>
        `;
        container.appendChild(gameCard);
      });
    } else {
      container.innerHTML = '<p>No games found</p>';
    }
  } catch (error) {
    console.error('Error loading games:', error);
    container.innerHTML = '<p>Error loading games</p>';
  }
}

// Update UI based on authentication state
function updateAuthUI(user) {
  console.log("updateAuthUI called with user:", user);
  
  const loginBtn = document.querySelector(".login");
  const signupBtn = document.querySelector(".signup");
  const logoutBtn = document.querySelector(".logout");
  const welcomeSpan = document.querySelector(".welcome");

  if (user && user.user_id) {
    // User is logged in
    console.log("User is logged in - showing logout button");
    
    if (loginBtn) {
      loginBtn.style.display = 'none';
    }
    if (signupBtn) {
      signupBtn.style.display = 'none';
    }
    if (logoutBtn) {
      logoutBtn.style.display = 'inline-block';
    }
    if (welcomeSpan) {
      if (user.is_admin) {
        welcomeSpan.textContent = `👨‍💼 Admin: ${user.username}`;
        welcomeSpan.style.color = '#ff6b00';
        welcomeSpan.style.fontWeight = 'bold';
      } else {
        welcomeSpan.textContent = `👤 Welcome, ${user.username}!`;
        welcomeSpan.style.color = '#00ff00';
      }
    }
  } else {
    // User is logged out
    console.log("User is logged out - showing login buttons");
    
    if (loginBtn) {
      loginBtn.style.display = 'inline-block';
    }
    if (signupBtn) {
      signupBtn.style.display = 'inline-block';
    }
    if (logoutBtn) {
      logoutBtn.style.display = 'none';
    }
    if (welcomeSpan) {
      welcomeSpan.textContent = 'Log in to get started!';
      welcomeSpan.style.color = '#999';
    }
  }
}

// Setup navigation click handlers
function setupNavigation() {
  const loginBtn = document.querySelector(".login");
  const signupBtn = document.querySelector(".signup");
  const logoutBtn = document.querySelector(".logout");

  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openLoginModal();
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openSignupModal();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleLogout();
    });
  }
}

/* =========================
   Role-Based Redirect Logic
   ========================= */
const currentFile = window.location.pathname.split("/").pop() || "index.html";

function redirectPage(role) {
  if (currentFile.includes("index") || currentFile === "") {
    window.location.href = role === "admin"
      ? "admin_index.html"
      : role === "user"
      ? "user_index.html"
      : "index.html";
  } else if (currentFile.includes("calendar")) {
    window.location.href = role === "admin"
      ? "admin_calendar.html"
      : role === "user"
      ? "user_calendar.html"
      : "calendar.html";
  } else if (currentFile.includes("reviews")) {
    window.location.href = role === "admin"
      ? "admin_reviews.html"
      : role === "user"
      ? "user_reviews.html"
      : "reviews.html";
  } else {
    window.location.href = "index.html";
  }
}

// ============================================
// FAVORITES SYSTEM FUNCTIONS
// ============================================

// Open favorites modal
function openFavoritesModal() {
  const modal = document.getElementById('favoritesModal');
  if (modal) {
    modal.classList.add('active');
    loadUserFavorites();
  }
}

// Close favorites modal
function closeFavoritesModal() {
  const modal = document.getElementById('favoritesModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  const modal = document.getElementById('favoritesModal');
  if (event.target === modal) {
    closeFavoritesModal();
  }
});

// Load user's favorite games
async function loadUserFavorites() {
  try {
    const user = VGB_API.getCurrentUser();
    if (!user) {
      console.log('User not logged in');
      return;
    }

    console.log('Loading favorites for user:', user.user_id);

    const response = await fetch(`/api/favorites/users/${user.user_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${VGB_API.getAuthToken()}`
      }
    });

    const data = await response.json();
    console.log('Favorites response:', data);
    
    if (data.success && data.data) {
      displayFavorites(data.data);
    } else {
      document.getElementById('favoritesList').innerHTML = 
        '<p>No favorite games yet!</p>';
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
    document.getElementById('favoritesList').innerHTML = 
      '<p>Error loading favorites. Check console for details.</p>';
  }
}

// Display favorites in the modal
function displayFavorites(favorites) {
  const container = document.getElementById('favoritesList');
  
  if (!favorites || favorites.length === 0) {
    container.innerHTML = '<p>No favorite games yet! Add some from the Recommended Games section.</p>';
    return;
  }

  container.innerHTML = '';
  
  favorites.forEach(favorite => {
    const gameCard = document.createElement('div');
    gameCard.className = 'favorite-card';
    gameCard.innerHTML = `
      <div class="favorite-info">
        <h3>${favorite.game.title}</h3>
        <p class="genre">🎮 ${favorite.game.genre}</p>
        <p class="platforms">💻 ${favorite.game.platforms.join(', ')}</p>
        <p class="release">📅 Release: ${new Date(favorite.game.release_date).toLocaleDateString()}</p>
        ${favorite.game.description ? `<p class="description">"${favorite.game.description}"</p>` : ''}
        <button onclick="removeFavorite('${favorite.favorite_id}')" class="btn-remove">
          ❌ Remove
        </button>
      </div>
    `;
    container.appendChild(gameCard);
  });
}

// Add game to favorites
async function addGameToFavorites(gameId) {
  try {
    const user = VGB_API.getCurrentUser();
    if (!user) {
      alert('Please log in first to add favorites');
      return;
    }

    console.log('Adding game to favorites:', gameId);

    const response = await fetch(`/api/favorites/users/${user.user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VGB_API.getAuthToken()}`
      },
      body: JSON.stringify({ game_id: gameId })
    });

    const data = await response.json();
    console.log('Add favorite response:', data);

    if (data.success) {
      alert('✅ Added to favorites!');
      if (document.getElementById('favoritesModal') && document.getElementById('favoritesModal').classList.contains('active')) {
        loadUserFavorites();
      }
    } else {
      alert('❌ ' + (data.message || 'Failed to add to favorites'));
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
    alert('Error adding to favorites. Check console.');
  }
}

// Remove game from favorites
async function removeFavorite(favoriteId) {
  try {
    console.log('Removing favorite:', favoriteId);

    const response = await fetch(`/api/favorites/${favoriteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${VGB_API.getAuthToken()}`
      }
    });

    const data = await response.json();
    console.log('Remove favorite response:', data);

    if (data.success) {
      alert('✅ Removed from favorites');
      loadUserFavorites();
    }
  } catch (error) {
    console.error('Error removing favorite:', error);
    alert('Error removing favorite');
  }
}

// ============================================
// COMMENTS SYSTEM FUNCTIONS - COMPLETE
// ============================================

// Load comments for a specific game
async function loadCommentsForGame() {
  try {
    const gameId = document.getElementById('gameIdInput').value.trim();
    
    if (!gameId) {
      alert('❌ Please enter a Game ID first');
      return;
    }

    console.log('📥 Loading comments for game:', gameId);
    
    // Show loading state
    const commentsList = document.getElementById('commentsList');
    if (commentsList) {
      commentsList.innerHTML = '<p class="loading-comments">Loading comments...</p>';
    }
    
    await loadGameComments(gameId);
    
  } catch (error) {
    console.error('❌ Error loading comments:', error);
    alert('Error loading comments. Check console.');
  }
}

// Load comments from API
async function loadGameComments(gameId) {
  try {
    console.log('📥 Loading comments for game:', gameId);

    const response = await fetch(`/api/comments/games/${gameId}`);
    const data = await response.json();

    console.log('📊 API Response:', data);

    const commentsList = document.getElementById('commentsList');
    
    if (!commentsList) {
      console.error('❌ commentsList container NOT FOUND!');
      return;
    }

    if (data.success && data.data && data.data.length > 0) {
      console.log('✅ Found', data.data.length, 'comments');
      displayComments(data.data);
    } else {
      console.log('ℹ️ No comments to display');
      commentsList.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
    }
  } catch (error) {
    console.error('❌ Error loading comments:', error);
    const commentsList = document.getElementById('commentsList');
    if (commentsList) {
      commentsList.innerHTML = '<p class="error-comments">Error loading comments. Please try again.</p>';
    }
  }
}

// Display comments in the UI
function displayComments(comments) {
  console.log('📝 displayComments called with', comments.length, 'comments');
  
  const container = document.getElementById('commentsList');
  
  if (!container) {
    console.error('❌ commentsList container NOT FOUND!');
    return;
  }
  
  if (!comments || comments.length === 0) {
    console.log('ℹ️ No comments to display');
    container.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
    return;
  }

  // CLEAR the container
  container.innerHTML = '';
  
  comments.forEach((comment, index) => {
    console.log(`📌 Processing comment ${index + 1}:`, comment);
    
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment-item';
    
    const timestamp = new Date(comment.timestamp).toLocaleString();
    const currentUser = VGB_API.getCurrentUser();
    
    // Check if current user can delete
    const canDelete = currentUser && (currentUser.user_id === comment.user_id || currentUser.is_admin);
    
    const deleteBtn = canDelete
      ? `<button onclick="deleteComment('${comment.comment_id}')" class="btn-delete-comment">🗑️ Delete</button>`
      : '';
    
    const htmlContent = `
      <div class="comment-header">
        <strong class="username">👤 ${comment.username}</strong>
        <span class="comment-time">🕐 ${timestamp}</span>
      </div>
      <p class="comment-content">${escapeHtml(comment.content)}</p>
      ${deleteBtn}
    `;
    
    commentDiv.innerHTML = htmlContent;
    container.appendChild(commentDiv);
    
    console.log(`✅ Comment ${index + 1} added to DOM`);
  });
  
  console.log('✅ All comments displayed successfully');
}

// Submit a new comment
async function submitComment() {
  try {
    const user = VGB_API.getCurrentUser();
    if (!user) {
      alert('❌ Please log in to comment');
      return;
    }

    const gameIdInput = document.getElementById('gameIdInput');
    const commentInput = document.getElementById('commentInput');

    if (!gameIdInput || !commentInput) {
      console.error('❌ Input elements not found!');
      alert('Error: Comment form elements not found');
      return;
    }

    const gameId = gameIdInput.value.trim();
    const content = commentInput.value.trim();

    if (!gameId) {
      alert('❌ Please enter a Game ID');
      return;
    }

    if (!content) {
      alert('❌ Please write a comment');
      return;
    }

    console.log('📤 Submitting comment for game:', gameId);
    console.log('💬 Comment content:', content);

    const response = await fetch(`/api/comments/games/${gameId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VGB_API.getAuthToken()}`
      },
      body: JSON.stringify({ content })
    });

    const data = await response.json();
    console.log('✅ API Response:', data);

    if (data.success) {
      alert('✅ Comment posted!');
      commentInput.value = ''; // Clear textarea
      
      // RELOAD comments immediately
      console.log('📥 Reloading comments now...');
      await loadGameComments(gameId);
      
    } else {
      alert('❌ ' + (data.message || 'Failed to post comment'));
    }
  } catch (error) {
    console.error('❌ Error submitting comment:', error);
    alert('❌ Error posting comment. Check console.');
  }
}

// Delete a comment
async function deleteComment(commentId) {
  if (!confirm('Are you sure you want to delete this comment?')) {
    return;
  }

  try {
    console.log('🗑️ Deleting comment:', commentId);

    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${VGB_API.getAuthToken()}`
      }
    });

    const data = await response.json();
    console.log('✅ Delete response:', data);

    if (data.success) {
      alert('✅ Comment deleted');
      
      // Reload comments for the current game
      const gameId = document.getElementById('gameIdInput').value.trim();
      if (gameId) {
        await loadGameComments(gameId);
      }
    } else {
      alert('❌ ' + (data.message || 'Failed to delete comment'));
    }
  } catch (error) {
    console.error('❌ Error deleting comment:', error);
    alert('❌ Error deleting comment');
  }
}

// Helper function to escape HTML (prevent XSS)
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}