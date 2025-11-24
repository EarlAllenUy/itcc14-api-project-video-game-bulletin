# 🎮 Video Game Bulletin (VGB) API Project

**Repository Name:** `itcc14-api-project-video-game-bulletin`

---

## 🧑‍💻 Team Members

| Name | GitHub Profile |
|------|----------------|
| Alamo, Don Martin Raphael | [Link to GitHub Profile](https://github.com/MartinAlamo20) |
| Cruz, Niall Nevin | [Link to GitHub Profile](https://github.com/NiallCruz) |
| Uy, Earl Allen | [Link to GitHub Profile](https://github.com/EarlAllenUy) |
| Uyguangco, Kent Andrei | [Link to GitHub Profile](https://github.com/20230026875-glitch) |

---

## 🎯 Project Overview & Initial Deliverables

### 📝 Problem Statement

Game enthusiasts often struggle to keep track of new and upcoming video game releases because information is scattered across numerous websites, social media, and news outlets. This fragmentation makes it difficult to find accurate, consolidated, and timely information. The Video Game Bulletin (VGB) addresses this by creating a centralized, streamlined, and reliable hub for all video game and console release information.

### 🌟 Project Goals

The primary goal is to develop a user-friendly, web-based platform that serves as a centralized hub for upcoming and newly released video game and console announcements.

The system aims to:
- Deliver concise and timely game release information to users.
- Provide a functional release calendar and real-time database updates for accuracy.
- Allow users to filter games by genre and search for releases.
- Support user interactive features like account creation, favoriting games, and commenting on releases.

---

## 🛠️ Technology Stack

- **Backend:** Node.js with Express.js
- **Database:** Firebase Firestore
- **Authentication:** JWT (JSON Web Tokens) with bcrypt
- **API Architecture:** RESTful API
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Version Control:** Git & GitHub

---

## 💾 Data Models

The core data models are designed to support the centralized nature and interactive features of the VGB API.

### Game Model
Stores all release information.

```json
{
  "game_id": "string (Primary Key)",
  "title": "string",
  "release_date": "date",
  "platforms": ["array<string>"],
  "specifications": "object",
  "genre": "string",
  "description": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### User Model
Stores user account data.

```json
{
  "user_id": "string (Primary Key)",
  "username": "string",
  "email": "string",
  "password_hash": "string",
  "is_admin": "boolean",
  "created_at": "timestamp"
}
```

### Comment Model
Links users to games via comments.

```json
{
  "comment_id": "string (Primary Key)",
  "game_id": "string (Foreign Key to Game)",
  "user_id": "string (Foreign Key to User)",
  "content": "string",
  "timestamp": "timestamp"
}
```

### Favorite Model
Links a User to multiple favorited Games.

```json
{
  "favorite_id": "string (Primary Key)",
  "user_id": "string (Foreign Key to User)",
  "game_id": "string (Foreign Key to Game)",
  "created_at": "timestamp"
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/[your-username]/itcc14-api-project-video-game-bulletin.git
cd itcc14-api-project-video-game-bulletin
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the root directory:

```
PORT=3000
JWT_SECRET=your-secret-key-here
FIREBASE_PROJECT_ID=video-game-bulletin
FIREBASE_API_KEY=AIzaSyBZYj7_mAMVkMawvOqX34d_y01ekvdBJMc
```

4. **Initialize Firebase**

- Ensure your Firebase project is properly configured
- Place your Firebase service account key in `server/config/serviceAccountKey.json`

5. **Seed the Database**

```bash
npm run seed
```

6. **Start the Development Server**

```bash
npm run dev
```

The server will run at `http://localhost:3000`

---

## 📚 API Documentation

Full API specification available in `api.yaml` (OpenAPI 3.0 format).

### Base URL

```
Development: http://localhost:3000/api
Production: https://video-game-bulletin.firebaseapp.com/api
```

### Key Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/releases` | Get all game releases | No |
| GET | `/api/games/:id` | Get specific game details | No |
| POST | `/api/games` | Add new game | Yes (Admin) |
| PUT | `/api/games/:id` | Update game | Yes (Admin) |
| DELETE | `/api/games/:id` | Delete game | Yes (Admin) |
| POST | `/api/users` | Register new user | No |
| POST | `/api/users/login` | User login | No |
| GET | `/api/users/me` | Get current user | Yes |
| GET | `/api/favorites/users/:userId` | Get user favorites | Yes |
| POST | `/api/favorites/users/:userId` | Add game to favorites | Yes |
| DELETE | `/api/favorites/:favoriteId` | Remove from favorites | Yes |
| GET | `/api/comments/games/:gameId` | Get game comments | No |
| POST | `/api/comments/games/:gameId` | Post comment | Yes |
| DELETE | `/api/comments/:commentId` | Delete comment | Yes |

---

## 🗺️ Project Milestones

### 📝 Milestone 1: Design, Setup, and Initial Commitment (Nov Wks 3-4) 🏗️

#### What we'll do

> This four-week phase focuses on finalizing all design documentation and establishing the core technical foundation. We will define the full **RESTful API** specification and connect the environment to **Firebase**, setting the clear roadmap for the entire project.

#### Deliverables

1. **Project Documentation:** Finalized Problem Statement, Goals, and detailed Data Models added to this `README.md`.
2. **API Specification:** A comprehensive **`api.yaml`** file committed, detailing all endpoints, request/response schemas, and error codes for the VGB API.
3. **Environment Setup:** Local development environment configured (Node.js/Express.js) and verified **Firebase Database** connection.

#### Checklists

- [x] Finalize and write **Problem Statement** and **Project Goals** in `README.md`.
- [x] Define fields for all Data Models (Game, User, Comment, Favorite).
- [x] Commit and push required initial information to `README.md`.
- [x] Complete comprehensive **`api.yaml`** with all endpoints and parameters.
- [x] Set up Node.js environment and install all framework dependencies.
- [x] Initialize **Firebase** and test connectivity with a simple read operation.
- [x] Create project structure with proper folders (server, public, routes, middleware).
- [x] **Group Leader:** Commit and push all initial setup files and documentation.

---

### 💻 Milestone 2: Core API Functionality & Integration (Nov Wks 3-4) 🚀

#### What we'll do

> We will implement the essential **Read** and **Admin Write** operations to manage game content. This involves building the public endpoints (`/releases`, `/games/{id}`) and the administrative **CRUD** for game data. We will also integrate the frontend to display this core data.

#### Deliverables

1. **Public Read Endpoints:** Working API endpoints for `GET /releases` and `GET /games/{id}`.
2. **Admin CRUD:** Full administrative **CRUD** functionality (`POST`, `PUT`, `DELETE` for `/games`) implemented and tested against the database.
3. **Frontend Calendar:** The main landing page is built and successfully fetches/displays the list of games from the `/releases` endpoint.
4. **Seed Data:** A runnable **Seed Script** created to populate the database with sample data for demonstration.

#### Checklists

- [x] Implement **GET /releases** and **GET /games/{id}** endpoints.
- [x] Implement all **Admin CRUD** endpoints (`POST`, `PUT`, `DELETE` for `/games`).
- [x] Update front-end to consume the public read endpoints via fetch/axios.
- [x] Build dynamic calendar that displays games from API.
- [x] Create and test the **Seed Script**.
- [x] Use **feature branches** for all new development work.

---

### 🔒 Milestone 3: User Interaction & Security (Nov Wk 4) 💬

#### What we'll do

> This phase completes all user-facing interactive features, including **User Authentication**, **Role-Based Routing**, and foundational work for **Favoriting** and **Commenting** systems. The focus is on security, ensuring all endpoints are protected based on the user's role (Guest, Registered User, Admin).

#### Deliverables

1. **Authentication System:** Fully functional User Registration (`POST /api/users`) and Login/Logout functionality with JWT token management.
2. **Role-Based Routing:** Frontend correctly redirects authenticated users to their appropriate dashboard (Admin/User/Guest pages).
3. **Interactive Endpoints:** Working API endpoints for **Favoriting Games** and **Commenting on Games**.
4. **Security Implementation:** All Admin and Registered User modification endpoints are secured with JWT authentication middleware.
5. **Updated UI & UX:** Frontend forms and logic for user login, registration, favoriting, and commenting are fully functional.

#### Checklists

- [x] Implement **User Registration** endpoint with validation.
- [x] Implement **User Login** endpoint with JWT token generation.
- [x] Implement **Logout** functionality with token cleanup.
- [x] Update **`auth-modal.js`** with redirect logic based on user roles.
- [x] Implement **Favoriting** feature endpoint and logic.
- [x] Implement **Commenting** feature endpoint and logic.
- [x] Integrate **Favoriting** UI on user dashboard.
- [x] Integrate **Commenting** UI on game detail pages.
- [x] Apply authentication middleware to secure relevant endpoints.
- [x] Update **`api.yaml`** with required security schemes documentation.
- [x] Build login/signup forms in frontend with error handling.
- [x] Store JWT token in localStorage and send with authenticated requests.
- [x] Implement role-based page redirection after authentication.
- [x] Test security rules to prevent unauthorized access.
- [x] Verify that admin users see admin dashboards.
- [x] Verify that regular users see user dashboards.

---

### 🧪 Milestone 4: Testing & Refinement (Nov Wk 4) 🧪

#### What we'll do

> The final development and QA push. We will implement essential features like **Search and Filtering** and conduct a comprehensive round of testing to polish the application, eliminate all critical bugs, and optimize performance before final deployment.

#### Deliverables

1. **Advanced Features:** **Search and Filtering** tools implemented on both the API and front-end.
2. **Quality Assurance (QA):** A documented list of bugs found during testing, along with solutions and verified fixes.
3. **Validated Documentation:** The final API documentation cross-validated against the live code base.

#### Checklists

- [ ] Implement **Search/Filtering** feature on the API level.
- [ ] Integrate **Search/Filtering** UI elements on the front-end.
- [ ] Execute comprehensive **QA Test Plan** (functional, security, and performance testing).
- [ ] Validate that all **error responses** (400/401/403/404/500) are accurate and consistent.
- [ ] Refine UI/UX for responsiveness and visual appeal.
- [ ] Test all endpoints with Postman/Insomnia.
- [ ] Create test user accounts and verify role-based access.

---

### 📦 Milestone 5: Final Deployment & Submission (Dec Wk 1) 📦

#### What we'll do

> The project concludes with **deployment to a live server** and the preparation of all materials necessary for the final project demonstration and presentation.

#### Deliverables

1. **Live Application:** The VGB application successfully **deployed** and accessible via a persistent live URL.
2. **Presentation Materials:** Final presentation slides and a demonstration script prepared.
3. **Final Submission:** The main repository URL is submitted by the Group Leader, alongside any final required documentation.

#### Checklists

- [ ] Finalize and upload all required Project Documentation (Final Report).
- [ ] Deploy the application to Firebase Hosting or similar platform.
- [ ] Test live application for final operational functionality.
- [ ] Prepare the final presentation slides and live demo script.
- [ ] Record demo video showing all features.
- [ ] **Group Leader:** Submit the final main repository URL.

---

## 📄 Project Structure

```
itcc14-api-project-video-game-bulletin/
├── README.md                    # Project documentation
├── api.yaml                     # OpenAPI specification
├── package.json                 # Node.js dependencies
├── package-lock.json            # Dependency lock file
├── .gitignore                   # Git ignore rules
├── .env.example                 # Environment variables template
├── .env                         # Environment variables (local)
├── server/
│   ├── index.js                 # Main server file
│   ├── config/
│   │   ├── firebase.js          # Firebase configuration
│   │   └── serviceAccountKey.json # Firebase service account (git ignored)
│   ├── routes/
│   │   ├── games.js             # Game endpoints
│   │   ├── users.js             # User/auth endpoints
│   │   ├── comments.js          # Comment endpoints
│   │   └── favorites.js         # Favorites endpoints
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   └── utils/
│       └── seedData.js          # Database seeding script
├── public/
│   ├── index.html               # Guest homepage
│   ├── calendar.html            # Guest calendar
│   ├── reviews.html             # Guest reviews
│   ├── user_index.html          # User dashboard
│   ├── user_calendar.html       # User calendar
│   ├── user_reviews.html        # User reviews
│   ├── admin_index.html         # Admin dashboard
│   ├── admin_calendar.html      # Admin calendar
│   ├── admin_reviews.html       # Admin reviews
│   ├── css/
│   │   ├── style.css            # Global styles
│   │   └── auth-modal.css       # Authentication modal styles
│   ├── js/
│   │   ├── script.js            # Main application logic
│   │   ├── auth.js              # Authentication logic
│   │   ├── auth-modal.js        # Modal handling & role-based redirect
│   │   └── api.js               # API helper functions
│   └── images/
│       └── VGB_Logo.png         # Project logo
└── docs/
    └── API_Documentation.md     # Detailed API docs
```

---

## ✅ Completed Features

- ✅ Backend API with Express.js
- ✅ Firebase Firestore database setup and configuration
- ✅ RESTful API endpoints for games (GET, POST, PUT, DELETE)
- ✅ Database seeding with sample data
- ✅ Frontend HTML/CSS/JS structure with responsive design
- ✅ Static pages for guests, users, and admins (role-based routing)
- ✅ Calendar functionality (dynamic month navigation)
- ✅ Service account authentication with Firebase Admin SDK
- ✅ Project documentation and API specification (api.yaml)
- ✅ User registration with email validation and password hashing
- ✅ User login with JWT token generation and management
- ✅ Role-based page redirection after authentication
- ✅ Dynamic UI updates based on authentication state
- ✅ Authentication modal with form validation
- ✅ Logout functionality with localStorage cleanup
- ✅ Admin and user-specific dashboards
- ✅ Favoriting system (backend endpoints & frontend UI)
- ✅ Commenting system (backend endpoints & frontend UI)
- ✅ Comments display with username and timestamp
- ✅ Delete comments functionality (user can delete own comments, admin can delete any)
- ✅ Add/remove favorites with real-time UI updates
- ✅ Favorites modal showing all favorited games with details

---

## 🔄 In Progress

- 🔄 Search and filtering functionality
- 🔄 Advanced calendar features with game details
- 🔄 Comprehensive testing and bug fixes

---

## 📋 Upcoming Features

- 📋 User profile management and editing
- 📋 Admin content management dashboard
- 📋 Advanced search with multiple filters
- 📋 Game detail pages with specifications and reviews
- 📋 Notification system for new releases
- 📋 Responsive mobile design improvements

---

## 🔐 Security Notes

- **JWT Tokens**: Used for authentication with configurable expiration (7 days)
- **Password Hashing**: bcrypt with salt rounds of 10
- **Admin Protection**: Admin-only endpoints protected by `isAdmin` middleware
- **Authentication Verification**: All protected endpoints require valid JWT token
- **CORS**: Configured for cross-origin requests
- **Environment Variables**: Sensitive data stored in `.env` file (git ignored)
- **Firestore Rules**: Test mode enabled for development; will be updated before production
- **Token Storage**: JWT tokens stored securely in browser localStorage
- **Authorization Checks**: Users can only modify their own comments and favorites

---

## 🧪 Testing

### Testing Credentials

**Admin User:**
```
Email: admin@vgb.com
Password: admin123
```

**Regular Users:**
```
Email: gamer@example.com
Password: gamer123

Email: pro@example.com
Password: progamer123
```

### Manual Testing Procedure

1. **Clear Browser Cache**

```javascript
// In browser console:
localStorage.clear()
```

2. **Restart Development Server**

```bash
npm run dev
```

3. **Test Admin Login**
   - Navigate to `http://localhost:3000`
   - Click "Log in"
   - Email: `admin@vgb.com`, Password: `admin123`
   - Verify redirect to `admin_index.html`
   - Verify "Admin: VGBAdmin1" displayed in header

4. **Test Regular User Login**
   - Log out and return to home
   - Click "Log in"
   - Email: `gamer@example.com`, Password: `gamer123`
   - Verify redirect to `user_index.html`
   - Verify "Welcome, GameEnthusiast!" displayed in header

5. **Test Favorites System**
   - Log in as regular user
   - Click "Add to Favorites" on a game
   - Navigate to "My Favorites" in sidebar
   - Verify game appears in favorites list
   - Test "Remove" button functionality

6. **Test Comments System**
   - Navigate to `user_reviews.html`
   - Click "View All Games" to see available games
   - Select a game to load its comments
   - Post a new comment
   - Verify comment appears with username and timestamp
   - Test delete functionality (own comments only)

7. **Test Navigation**
   - Click CALENDAR and REVIEWS links
   - Verify correct role-based pages load

8. **Test Logout**
   - Click "Log out" button
   - Verify redirect to guest homepage
   - Verify login/signup buttons reappear

---

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

---

## 📧 Contact

For questions or issues, please contact the team members listed above or open an issue in this repository.

---

## 📝 License

This project is developed as part of an academic course requirement.
