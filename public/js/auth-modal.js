// Modal Functions
function openLoginModal() {
  document.getElementById('loginModal').classList.add('active');
  document.getElementById('loginForm').reset();
  clearAllErrors();
}

function closeLoginModal() {
  document.getElementById('loginModal').classList.remove('active');
  clearAllErrors();
}

function openSignupModal() {
  document.getElementById('signupModal').classList.add('active');
  document.getElementById('signupForm').reset();
  clearAllErrors();
}

function closeSignupModal() {
  document.getElementById('signupModal').classList.remove('active');
  clearAllErrors();
}

function switchToLogin() {
  closeSignupModal();
  openLoginModal();
}

function switchToSignup() {
  closeLoginModal();
  openSignupModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');
  
  if (event.target === loginModal) {
    closeLoginModal();
  }
  if (event.target === signupModal) {
    closeSignupModal();
  }
};

// Clear all error messages
function clearAllErrors() {
  document.querySelectorAll('.error-message').forEach(el => {
    el.classList.remove('show');
    el.textContent = '';
  });
  document.querySelectorAll('.success-message').forEach(el => {
    el.classList.remove('show');
    el.textContent = '';
  });
}

// Show error message
function showError(elementId, message) {
  const errorEl = document.getElementById(elementId);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
  }
}

// Show success message
function showSuccess(elementId, message) {
  const successEl = document.getElementById(elementId);
  if (successEl) {
    successEl.textContent = message;
    successEl.classList.add('show');
  }
}

// Redirect to role-appropriate page
function redirectToRolePage(user) {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  
  // Extract base page name (index, calendar, reviews)
  let basePage = 'index';
  if (currentFile.includes('calendar')) {
    basePage = 'calendar';
  } else if (currentFile.includes('reviews')) {
    basePage = 'reviews';
  }
  
  // Determine target page based on role
  let targetPage;
  if (user.is_admin) {
    targetPage = `admin_${basePage}.html`;
  } else {
    targetPage = `user_${basePage}.html`;
  }
  
  // Redirect after a short delay to ensure UI updates
  setTimeout(() => {
    window.location.href = targetPage;
  }, 500);
}

// Handle Login
async function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  
  // Validation
  if (!email) {
    showError('loginEmailError', 'Email is required');
    return;
  }
  if (!password) {
    showError('loginPasswordError', 'Password is required');
    return;
  }
  
  try {
    // Disable submit button
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';
    
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      showError('loginError', data.message || 'Login failed');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Log In';
      return;
    }
    
    // Success - Save token and user data
    localStorage.setItem('vgb_token', data.token);
    localStorage.setItem('vgb_user', JSON.stringify(data.data));
    
    showSuccess('loginSuccess', 'Login successful!');
    
    // Update UI immediately
    updateAuthUI(data.data);
    
    // Close modal and redirect
    setTimeout(() => {
      closeLoginModal();
      redirectToRolePage(data.data);
    }, 1000);
    
  } catch (error) {
    console.error('Login error:', error);
    showError('loginError', 'An error occurred. Please try again.');
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Log In';
  }
}

// Handle Signup
async function handleSignup(event) {
  event.preventDefault();
  
  const username = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirm').value;
  
  // Clear previous errors
  clearAllErrors();
  
  // Validation
  if (!username) {
    showError('signupUsernameError', 'Username is required');
    return;
  }
  if (username.length < 3) {
    showError('signupUsernameError', 'Username must be at least 3 characters');
    return;
  }
  if (!email) {
    showError('signupEmailError', 'Email is required');
    return;
  }
  if (!password) {
    showError('signupPasswordError', 'Password is required');
    return;
  }
  if (password.length < 6) {
    showError('signupPasswordError', 'Password must be at least 6 characters');
    return;
  }
  if (password !== confirmPassword) {
    showError('signupConfirmError', 'Passwords do not match');
    return;
  }
  
  try {
    // Disable submit button
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';
    
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      showError('signupError', data.message || 'Signup failed');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign Up';
      return;
    }
    
    // Success - Save token and user data
    localStorage.setItem('vgb_token', data.token);
    localStorage.setItem('vgb_user', JSON.stringify(data.data));
    
    showSuccess('signupSuccess', 'Account created! Welcome, ' + username + '!');
    
    // Update UI immediately
    updateAuthUI(data.data);
    
    // Close modal and redirect
    setTimeout(() => {
      closeSignupModal();
      redirectToRolePage(data.data);
    }, 1000);
    
  } catch (error) {
    console.error('Signup error:', error);
    showError('signupError', 'An error occurred. Please try again.');
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign Up';
  }
}

// Handle Logout
function handleLogout() {
  if (confirm('Are you sure you want to log out?')) {
    localStorage.removeItem('vgb_token');
    localStorage.removeItem('vgb_user');
    window.location.href = '/index.html';
  }
}