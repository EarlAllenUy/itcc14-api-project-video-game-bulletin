# 🎮 Video Game Bulletin (VGB) API Project

**Project Name:** `Video Game Bulletin (VGB) API`

---

## 🧑‍💻 Team Members

| Name | GitHub Profile |
| :--- | :--- |
| **Alamo, Don Martin Raphael** | [Link to GitHub Profile] |
| **Cruz, Niall Nevin** | [Link to GitHub Profile] |
| **Uy, Earl Allen** | [Link to GitHub Profile] |
| **Uyguangco, Kent Andrei** | [Link to GitHub Profile] |

---

## 📝 Milestone 1: Design, Setup, and Initial Commitment (Nov Wks 1-4) 🏗️

### What we'll do
> This intensive four-week phase focuses on finalizing all design documentation and establishing the core technical foundation. We will define the full **RESTful API** specification and configure the database connection. This stream runs **concurrently** with M2 and M3, setting the clear roadmap for the entire project.

### Deliverables
1.  **Project Documentation:** Finalized Problem Statement, Goals, and detailed Data Models added to this `README.md`.
2.  **API Specification:** A comprehensive **`api.yaml`** file committed, detailing all endpoints, request/response schemas, and error codes for the VGB API.
3.  **Environment Setup:** Local development environment configured (e.g., Node.js/Framework) and verified database connection.

### Checklists
* [ ] Finalize and write **Problem Statement** and **Project Goals** in `README.md`.
* [ ] Define fields for all Data Models (Game, User, Comment, Favorite).
* [ ] Complete comprehensive **`api.yaml`** with all endpoints and parameters.
* [ ] Set up environment and install all framework dependencies.
* [ ] Initialize database and test connectivity with a simple read operation.
* [ ] **Group Leader:** Commit and push all initial setup files and documentation.

---

## 💻 Milestone 2: Core API Functionality & Integration (Nov Wks 1-4) 🚀

### What we'll do
> We will implement the essential **Read** and **Admin Write** operations to manage game content. This involves building the public endpoints (`GET /releases`, `GET /games/{id}`) and the administrative **CRUD** for game data. This stream runs **concurrently** with M1 and M3.

### Deliverables
1.  **Public Read Endpoints:** Working API endpoints for `GET /releases` and `GET /games/{id}`.
2.  **Admin CRUD:** Full administrative **CRUD** functionality (`POST`, `PUT`, `DELETE` for `/games`) implemented and tested against the database.
3.  **Seed Data:** A runnable **Seed Script** created to populate the database with sample game and user data.

### Checklists
* [ ] Implement **`GET /releases`** and **`GET /games/{id}`** endpoints.
* [ ] Implement all **Admin CRUD** endpoints (`POST`, `PUT`, `DELETE` for `/games`).
* [ ] Create and test the **Seed Script**.
* [ ] Integrate the front-end to consume the public read endpoints.
* [ ] Build core front-end components for viewing the release calendar.
* [ ] Use **feature branches** for all new development work.

---

## 🔒 Milestone 3: User Interaction & Security (Nov Wks 1-4) 💬

### What we'll do
> This phase completes all user-facing interactive features, including **User Authentication**, **Favoriting**, and the **Commenting** system. The focus is on security, ensuring all endpoints are protected based on the user's role (Guest, Registered, Admin). This stream runs **concurrently** with M1 and M2.

### Deliverables
1.  **Authentication System:** Fully functional User Registration (`POST /users`) and Login/Logout functionality.
2.  **Interactive Endpoints:** Working API endpoints for **Favoriting Games** and **Commenting on Games**.
3.  **Security Implementation:** All Admin and Registered User modification endpoints are secured with authentication middleware.
4.  **Updated UI:** Frontend forms and logic for user login, registration, and commenting are implemented.

### Checklists
* [ ] Implement **User Registration** and **Login/Logout** endpoints.
* [ ] Implement **Favoriting** endpoint logic and corresponding UI.
* [ ] Implement **Commenting** endpoint logic and corresponding UI.
* [ ] Apply authentication middleware to secure all modification endpoints.
* [ ] Test security rules to prevent unauthorized data access/modification.
* [ ] Update **`api.yaml`** with required security schemes documentation.

---

## 4️⃣ Milestone 4: Interactive Features & Frontend Integration (Nov Wk 4 - Dec Wk 2) 🧪

### What we'll do
> This is the first part of the **Integration and Finalization Phase**. We focus on completing all API features, including **Advanced Search/Filtering**, and integrating the frontend components to display all user interaction features (Comments and Favorites).

### Deliverables
1.  **Advanced Features:** Fully functional **Search and Filtering** tools implemented on the API.
2.  **Frontend Integration:** The UI for user login, commenting, and favoriting is fully implemented and integrated with the API.
3.  **Quality Assurance (QA):** Begin comprehensive testing to identify and document bugs.

### Checklists
* [ ] Implement **Search/Filtering** feature on the API level.
* [ ] Integrate **Search/Filtering** UI elements on the front-end.
* [ ] Frontend fully integrates user login/logout flow.
* [ ] Frontend fully integrates Favorites/Commenting UI and API calls.
* [ ] Execute initial rounds of the **QA Test Plan**.
* [ ] Document all major bugs and prioritize fixes.

---

## 5️⃣ Milestone 5: Advanced Features & Full Integration (Nov Wk 4 - Dec Wk 2) 📦

### What we'll do
> This phase concludes development and focuses on QA validation and final documentation. We will resolve all critical bugs, conduct final performance checks, and ensure the entire system adheres to the defined API specification.

### Deliverables
1.  **Advanced Features:** Frontend UI for **Search/Filtering** is complete and fully functional.
2.  **Validated Documentation:** The final **`api.yaml`** is cross-validated against the live code base.
3.  **Final Codebase:** All critical and major bugs found during QA are resolved and verified.

### Checklists
* [ ] Resolve all priority bugs identified in M4.
* [ ] Complete performance and load testing (if applicable).
* [ ] Validate that all **error responses** (400/404) are accurate and consistent.
* [ ] Refine UI/UX for responsiveness and visual appeal.
* [ ] Finalize and upload all required Project Documentation (Final Report draft).

---

## Final (Nov Wk 4 - Dec Wk 2): Deployment & Presentation 🏆

### What we'll do
> The project concludes with deployment to a live server and the preparation of all materials necessary for the final project presentation and grading submission.

### Deliverables
1.  **Live Application:** The VGB application successfully **deployed** and accessible via a persistent live URL.
2.  **Presentation Materials:** Final presentation slides and a demonstration script prepared.
3.  **Final Submission:** The main repository URL is submitted by the Group Leader.

### Checklists
* [ ] Deploy the application to a live server.
* [ ] Test live application for final operational functionality.
* [ ] Prepare the final presentation slides and live demo script.
* [ ] **Group Leader:** Submit the final main repository URL.

---

## 📌 Project Overview (Milestone 1 Deliverables)

### 1. Problem Statement

> Game enthusiasts often struggle to keep track of new and upcoming video game releases because information is scattered across numerous websites and news outlets. This **fragmentation** makes it difficult to find a single source for accurate, consolidated, and timely information. The need is for a **centralized, integrated platform** (the Video Game Bulletin) that simplifies the discovery and tracking process for gamers.

### 2. Data Models

The core data structures used by the VGB API are defined below.

| Model | Purpose | Key Fields (Minimum) |
| :--- | :--- | :--- |
| **Game** | Stores information about each game release. | `id`, `title`, `release_date`, `platforms`, `genre`, `description` |
| **User** | Stores user profiles and credentials for interactive features. | `id`, `username`, `email`, `password_hash` |
| **Comment** | Stores user-submitted comments on specific games. | `id`, `game_id` (FK), `user_id` (FK), `content`, `timestamp` |
| **Favorite** | Links a user to their favorited games. | `user_id` (FK), `game_id` (FK) |
```eof
