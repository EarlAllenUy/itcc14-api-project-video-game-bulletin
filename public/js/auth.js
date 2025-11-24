// Authentication and page routing logic

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = VGB_API.getCurrentUser();
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  
  // ===========================
  // PAGE ACCESS CONTROL
  // ===========================
  
  // Determine required role for current page
  let requiredRole = 'guest';
  if (currentFile.startsWith('admin_')) {
    requiredRole = 'admin';
  } else if (currentFile.startsWith('user_')) {
    requiredRole = 'user';
  }
  
  // Check access permissions
  if (requiredRole === 'admin') {
    if (!currentUser || !currentUser.is_admin) {
      alert('Admin access required. Please log in as admin.');
      window.location.href = '/index.html';
      return;
    }
  } else if (requiredRole === 'user') {
    if (!currentUser) {
      alert('Please log in to access this page.');
      window.location.href = '/index.html';
      return;
    }
  }
  
  // ===========================
  // UI UPDATES BASED ON AUTH STATE
  // ===========================
  
  const loginBtn = document.querySelector(".login");
  const signupBtn = document.querySelector(".signup");
  const logoutBtn = document.querySelector(".logout");
  const welcomeSpan = document.querySelector(".welcome");
  
  // Update UI for logged-in users
  if (currentUser && welcomeSpan) {
    welcomeSpan.textContent = currentUser.is_admin 
      ? `Admin: ${currentUser.username}`
      : `Welcome, ${currentUser.username}!`;
  }
  
  // ===========================
  // LOGIN HANDLER
  // ===========================
  
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      showLoginModal();
    });
  }
  
  // ===========================
  // SIGNUP HANDLER
  // ===========================
  
  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      showSignupModal();
    });
  }
  
  // ===========================
  // LOGOUT HANDLER
  // ===========================
  
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm('Are you sure you want to log out?')) {
        VGB_API.logoutUser();
      }
    });
  }
});

// ===========================
// MODAL FUNCTIONS
// ===========================

function showLoginModal() {
  const email = prompt("Enter your email:");
  if (!email) return;
  
  const password = prompt("Enter your password:");
  if (!password) return;
  
  VGB_API.loginUser({ email, password })
    .then(result => {
      alert(`Welcome back, ${result.data.username}!`);
      redirectToRolePage(result.data);
    })
    .catch(error => {
      alert(`Login failed: ${error.message}`);
    });
}

function showSignupModal() {
  const username = prompt("Choose a username:");
  if (!username) return;
  
  const email = prompt("Enter your email:");
  if (!email) return;
  
  const password = prompt("Choose a password (min 6 characters):");
  if (!password) return;
  
  VGB_API.registerUser({ username, email, password })
    .then(result => {
      alert(`Account created successfully! Welcome, ${result.data.username}!`);
      redirectToRolePage(result.data);
    })
    .catch(error => {
      alert(`Signup failed: ${error.message}`);
    });
}

// ===========================
// NAVIGATION HELPERS
// ===========================

function redirectToRolePage(user) {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const basePage = currentFile.replace(/^(admin_|user_)/, '').replace('.html', '');
  
  let targetPage;
  if (user.is_admin) {
    targetPage = `admin_${basePage}.html`;
  } else {
    targetPage = `user_${basePage}.html`;
  }
  
  // Fallback to index if page doesn't exist
  if (basePage === 'index' || basePage === '') {
    targetPage = user.is_admin ? 'admin_index.html' : 'user_index.html';
  }
  
  window.location.href = `/${targetPage}`;
}

function getPageForRole(role, pageType = 'index') {
  const pages = {
    guest: {
      index: 'index.html',
      calendar: 'calendar.html',
      reviews: 'reviews.html'
    },
    user: {
      index: 'user_index.html',
      calendar: 'user_calendar.html',
      reviews: 'user_reviews.html'
    },
    admin: {
      index: 'admin_index.html',
      calendar: 'admin_calendar.html',
      reviews: 'admin_reviews.html'
    }
  };
  
  return pages[role]?.[pageType] || pages.guest.index;
}