# 🎮 Video Game Bulletin (VGB) API Project

**Repository Name:** `itcc14-api-project-video-game-bulletin`

---

## 🧑‍💻 Team Members

| Name | GitHub Profile |
| :--- | :--- |
| **Alamo, Don Martin Raphael** | [Link to GitHub Profile] |
| **Cruz, Niall Nevin** | [Link to GitHub Profile] |
| **Uy, Earl Allen** | [Link to GitHub Profile] |
| **Uyguangco, Kent Andrei** | [Link to GitHub Profile] |

---

## 🧑‍💻 Team Members
* Cruz, Niall Nevin Cruz

---


## 🎯 Project Overview & Initial Deliverables

### 📝 Problem Statement
> Game enthusiasts often struggle to keep track of new and upcoming video game releases because information is scattered across numerous websites, social media, and news outlets. This fragmentation makes it difficult to find accurate, consolidated, and timely information. The **Video Game Bulletin (VGB)** addresses this by creating a centralized, streamlined, and reliable hub for all video game and console release information.

### 🌟 Project Goals
The primary goal is to develop a user-friendly, web-based platform that serves as a centralized hub for upcoming and newly released video game and console announcements.

The system aims to:
* Deliver concise and timely game release information to users.
* Provide a functional release calendar and real-time database updates for accuracy.
* Allow users to filter games by genre and search for releases.
* Support user interactive features like account creation, favoriting games, and commenting on releases.

### 💾 Basic Data Models (Initial Design)
The core data models are designed to support the centralized nature and interactive features of the VGB API.

* **Game Model (Core Data):** Stores all release information.
    * `game_id` (Primary Key)
    * `title`
    * `release_date`
    * `platforms` (e.g., PC, PS5, Xbox)
    * `specifications` (System Requirements)
    * `genre`
* **User Model (Interactive Features):** Stores user account data.
    * `user_id` (Primary Key)
    * `username`
    * `email`
    * `password_hash`
    * `is_admin` (For Content Management/Admin Endpoints)
* **Comment Model (Community):** Links users to games via comments.
    * `comment_id` (Primary Key)
    * `game_id` (Foreign Key to Game)
    * `user_id` (Foreign Key to User)
    * `content`
    * `timestamp`
* **Favorite Model (Association):** Links a User to multiple favorited Games.
    * `favorite_id` (Primary Key)
    * `user_id` (Foreign Key to User)
    * `game_id` (Foreign Key to Game)

---
## 🗺️ Project Milestones

### 📝 Milestone 1: Design, Setup, and Initial Commitment (Nov Wks 1-4) 🏗️

### What we'll do
> This four-week phase focuses on finalizing all design documentation and establishing the core technical foundation. We will define the full **RESTful API** specification and connect the environment to **Firebase**, setting the clear roadmap for the entire project.

### Deliverables
1.  **Project Documentation:** Finalized Problem Statement, Goals, and detailed Data Models added to this `README.md`.
2.  **API Specification:** A comprehensive **`api.yaml`** file committed, detailing all endpoints, request/response schemas, and error codes for the VGB API.
3.  **Environment Setup:** Local development environment configured (Node.js/Next.js/Gatsby) and verified **Firebase Database** connection.

### Checklists
* [X] Finalize and write **Problem Statement** and **Project Goals** in `README.md`.
* [X] Define fields for all Data Models (Game, User, Comment, Favorite).
* [X] Commit and push required initial information to `README.md`.
* [ ] Complete comprehensive **`api.yaml`** with all endpoints and parameters.
* [ ] Set up Node.js environment and install all framework dependencies.
* [ ] Initialize **Firebase** and test connectivity with a simple read operation.
* [ ] **Group Leader:** Commit and push all initial setup files and documentation.

---

### 💻 Milestone 2: Core API Functionality & Integration (Nov Wks 1-4) 🚀

### What we'll do
> We will implement the essential **Read** and **Admin Write** operations to manage game content. This involves building the public endpoints (`/releases`, `/games/{id}`) and the administrative **CRUD** for game data. We will also begin integrating the frontend to display this core data.

### Deliverables
1.  **Public Read Endpoints:** Working API endpoints for `GET /releases` and `GET /games/{id}`.
2.  **Admin CRUD:** Full administrative **CRUD** functionality (`POST`, `PUT`, `DELETE` for `/games`) implemented and tested against the database.
3.  **Frontend Calendar:** The main landing page is built and successfully fetches/displays the list of games from the `/releases` endpoint.
4.  **Seed Data:** A runnable **Seed Script** created to populate the database with sample data for demonstration.

### Checklists
* [ ] Implement **GET /releases** and **GET /games/{id}** endpoints.
* [ ] Implement all **Admin CRUD** endpoints (`POST`, `PUT`, `DELETE` for `/games`).
* [ ] Build core front-end components for viewing the release calendar.
* [ ] Integrate the front-end to consume the public read endpoints.
* [ ] Create and test the **Seed Script**.
* [ ] Use **feature branches** for all new development work.

---

### 🔒 Milestone 3: User Interaction & Security (Nov Wks 1-4) 💬

### What we'll do
> This phase completes all user-facing interactive features, including **User Authentication**, **Favoriting**, and the **Commenting** system. The focus is on security, ensuring all endpoints are protected based on the user's role (Guest, Registered, Admin).

### Deliverables
1.  **Authentication System:** Fully functional User Registration (`POST /users`) and Login/Logout functionality.
2.  **Interactive Endpoints:** Working API endpoints for **Favoriting Games** and **Commenting on Games**.
3.  **Security Implementation:** All Admin and Registered User modification endpoints are secured with authentication middleware.
4.  **Updated UI:** Frontend forms and logic for user login, registration, and commenting are implemented.

### Checklists
* [ ] Implement **User Registration** and **Login/Logout** endpoints.
* [ ] Implement **Favoriting** feature logic and endpoint.
* [ ] Implement **Commenting** feature logic and endpoint.
* [ ] Apply authentication middleware to secure all relevant endpoints.
* [ ] Test security rules to prevent unauthorized data access/modification.
* [ ] Update **`api.yaml`** with required security schemes documentation.

---

### 4️⃣ Milestone 4: Testing & Refinement (Nov Wk 4 - Dec Wk 2) 🧪

### What we'll do
> The final development and QA push. We will implement essential features like **Search and Filtering** and conduct a comprehensive round of testing to polish the application, eliminate all critical bugs, and optimize performance before final deployment. This period allows ample time for quality assurance.

### Deliverables
1.  **Advanced Features:** Fully functional **Search and Filtering** tools implemented on both the API and front-end.
2.  **Quality Assurance (QA):** A documented list of major bugs found during testing, along with solutions and verified fixes.
3.  **Validated Documentation:** The final API documentation is cross-validated against the live code base.

### Checklists
* [ ] Implement **Search/Filtering** feature on the API level.
* [ ] Integrate **Search/Filtering** UI elements on the front-end.
* [ ] Execute comprehensive **QA Test Plan** (functional, security, and performance testing).
* [ ] Validate that all **error responses** (400/404) are accurate and consistent.
* [ ] Refine UI/UX for responsiveness and visual appeal.

---

### 5️⃣ Milestone 5: Final Deployment & Submission (Nov Wk 4 - Dec Wk 2) 📦

### What we'll do
> The project concludes with **deployment to a live server** and the preparation of all materials necessary for the final project demonstration and presentation, covering the end of November and the first two weeks of December.

### Deliverables
1.  **Live Application:** The VGB application successfully **deployed** and accessible via a persistent live URL.
2.  **Presentation Materials:** Final presentation slides and a demonstration script prepared.
3.  **Final Submission:** The main repository URL is submitted by the Group Leader, alongside any final required documentation.

### Checklists
* [ ] Finalize and upload all required Project Documentation (Final Report).
* [ ] Deploy the application to a live server.
* [ ] Test live application for final operational functionality.
* [ ] Prepare the final presentation slides and live demo script.
* [ ] **Group Leader:** Submit the final main repository URL.
