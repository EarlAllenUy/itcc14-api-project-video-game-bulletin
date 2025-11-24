// API Base URL
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api'
  : 'https://video-game-bulletin.firebaseapp.com/api';

// Helper function to get auth token
function getAuthToken() {
  return localStorage.getItem('vgb_token');
}

// Helper function to set auth token
function setAuthToken(token) {
  localStorage.setItem('vgb_token', token);
}

// Helper function to remove auth token
function removeAuthToken() {
  localStorage.removeItem('vgb_token');
  localStorage.removeItem('vgb_user');
}

// Helper function to get current user
function getCurrentUser() {
  const userStr = localStorage.getItem('vgb_user');
  return userStr ? JSON.parse(userStr) : null;
}

// Helper function to set current user
function setCurrentUser(user) {
  localStorage.setItem('vgb_user', JSON.stringify(user));
}

// Generic API call function
async function apiCall(endpoint, method = 'GET', data = null, requiresAuth = false) {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (requiresAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  const config = {
    method,
    headers
  };
  
  if (data && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'API request failed');
    }
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ==========================
// GAMES API
// ==========================

async function getAllGames(filters = {}) {
  const params = new URLSearchParams(filters);
  const queryString = params.toString() ? `?${params.toString()}` : '';
  return apiCall(`/releases${queryString}`);
}

async function getGameById(gameId) {
  return apiCall(`/games/${gameId}`);
}

async function createGame(gameData) {
  return apiCall('/games', 'POST', gameData, true);
}

async function updateGame(gameId, gameData) {
  return apiCall(`/games/${gameId}`, 'PUT', gameData, true);
}

async function deleteGame(gameId) {
  return apiCall(`/games/${gameId}`, 'DELETE', null, true);
}

// ==========================
// USERS API
// ==========================

async function registerUser(userData) {
  const result = await apiCall('/users', 'POST', userData);
  if (result.token) {
    setAuthToken(result.token);
    setCurrentUser(result.data);
  }
  return result;
}

async function loginUser(credentials) {
  const result = await apiCall('/users/login', 'POST', credentials);
  if (result.token) {
    setAuthToken(result.token);
    setCurrentUser(result.data);
  }
  return result;
}

async function getCurrentUserProfile() {
  return apiCall('/users/me', 'GET', null, true);
}

function logoutUser() {
  removeAuthToken();
  window.location.href = '/index.html';
}

// ==========================
// COMMENTS API
// ==========================

async function getGameComments(gameId) {
  return apiCall(`/comments/games/${gameId}`);
}

async function postComment(gameId, content) {
  return apiCall(`/comments/games/${gameId}`, 'POST', { content }, true);
}

async function deleteComment(commentId) {
  return apiCall(`/comments/${commentId}`, 'DELETE', null, true);
}

// ==========================
// FAVORITES API
// ==========================

async function getUserFavorites(userId) {
  return apiCall(`/favorites/users/${userId}`, 'GET', null, true);
}

async function addToFavorites(userId, gameId) {
  return apiCall(`/favorites/users/${userId}`, 'POST', { game_id: gameId }, true);
}

async function removeFromFavorites(favoriteId) {
  return apiCall(`/favorites/${favoriteId}`, 'DELETE', null, true);
}

// Export all functions
window.VGB_API = {
  // Auth
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getCurrentUser,
  setCurrentUser,
  
  // Games
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  
  // Users
  registerUser,
  loginUser,
  getCurrentUserProfile,
  logoutUser,
  
  // Comments
  getGameComments,
  postComment,
  deleteComment,
  
  // Favorites
  getUserFavorites,
  addToFavorites,
  removeFromFavorites
};