# Full-Stack News Application

A secure, highly modular full-stack news application. It utilizes a dynamic React.js frontend interface coupled with a structured Express.js backend engine to deliver real-time news tracking, comprehensive filtering, user account state management, and personal bookmarking dashboards.

## 🚀 Core Features

### 💻 Frontend (React.js)
*   **Centralized State Management**: Uses React Context API to propagate global authentication states smoothly across the entire layout tree.
*   **Modular Component Layout**: Features a reusable navigation header (`Navbar.js`) and content grid modules (`NewsCard.js`).
*   **Dedicated Page Routing**: Multi-view layout featuring a home dashboard feed (`home.js`), an account registration portal (`Login.js`), and a user account dashboard (`Profile.js`).
*   **Asynchronous Network Client**: Employs a dedicated service layer (`api.js`) to handle server handshakes, queries, and background requests smoothly.

### ⚙️ Backend (Express.js)
*   **Granular Layered Routing**: Separates app actions into specialized routes for Authentication, Bookmarks, and News.
*   **File-Based Persistence Engine**: Implements a lightweight storage layer using structural JSON serialization, avoiding heavy external database configurations.
*   **Protected Access Interceptors**: Custom server-side validation middleware intercepts secured paths to block unverified requests.

---

## 📁 Project Architecture Directory

The repository follows a clean full-stack architectural design pattern, keeping presentation and processing logic distinctly decoupled:

```text
├── backend/                       # Server-side environment (Express.js)
│   ├── controllers/               # Express request and application logic layer
│   │   ├── authController.js      # Handles user account registration and logins
│   │   ├── bookmarkController.js  # Appends, tracks, and deletes saved news items
│   │   └── newsController.js      # Orchestrates live API news feeds and filters
│   ├── data/                      # Persistence storage folder
│   │   └── users.json             # Flat-file JSON data system containing user credentials
│   ├── middleware/                # Route security interceptors
│   │   └── authMiddleware.js      # Validates access tokens before letting requests pass through
│   ├── routes/                    # Clean REST API endpoints mapping
│   │   ├── authRoutes.js          # Routes handling authentication (/api/auth)
│   │   ├── bookmarkRoutes.js      # Routes handling bookmark mutations (/api/bookmarks)
│   │   └── newsRoutes.js          # Routes executing news search filters (/api/news)
│   ├── utils/                     # Native helper scripts
│   │   └── dataStore.js           # Read/write pipeline manager interacting with users.json
│   ├── .env                       # Secret variable vault containing environment credentials
│   ├── package.json               # Backend runtime configurations and dependencies manifest
│   └── server.js                  # Main server runtime script and Express bootstrapper
│
└── frontend/                      # Client-side interface framework (React.js)
    ├── src/                       # Application source folder
    │   ├── api/                   # Networking wrappers
    │   │   └── api.js             # Central client logic sending fetch calls to the Express server
    │   ├── components/            # Reusable UI elements
    │   │   ├── Navbar.js          # Main menu bar containing Search/Source boxes and Auth links
    │   │   └── NewsCard.js        # Individual news feed blocks with Read More & Bookmark hooks
    │   ├── context/               # Application-wide state hubs
    │   │   └── AuthContext.js     # Manages user authentication variables and login states globally
    │   ├── pages/                 # Full canvas view elements
    │   │   ├── home.js            # Main page layout rendering news arrays and search tools
    │   │   ├── Login.js           # Form container parsing usernames and password submissions
    │   │   └── Profile.js         # User dashboard displaying personal details and bookmarks
    │   ├── App.css                # Custom global view stylesheet overrides
    │   ├── App.js                 # Layout engine routing views and nesting providers
    │   ├── index.css              # Core typography, reset, and base-level document elements
    │   └── index.js               # Global application script rendering the React DOM node
    ├── .gitignore                 # Commands Git to safely ignore node_modules/ and build assets
    └── package.json               # Frontend dependencies manifest and start scripts
```

---

## 🛠️ Getting Started & Installation

Follow these steps to run both the frontend interface and backend database simulation together on your local workspace:

### 1. Set Up the Express Backend
1. Open a new terminal console inside the project's server directory:
   ```bash
   cd backend
   ```
2. Download all declared project runtime libraries:
   ```bash
   npm install
   ```
3. Initialize your hidden environmental configuration attributes inside your local `.env` file:
   ```env
   PORT=5000
   NEWS_API_KEY=your_live_news_api_developer_key
   JWT_SECRET=your_secure_authentication_passphrase
   ```
4. Boot up your server environment:
   ```bash
   npm start
   ```
   *The backend engine will start running on `http://localhost:5000`.*

### 2. Set Up the React Frontend
1. Open a separate terminal window and switch over to your client directory:
   ```bash
   cd frontend
   ```
2. Download your UI rendering tools and framework dependencies:
   ```bash
   npm install
   ```
3. Initialize the development client browser tool:
   ```bash
   npm start
   ```
   *The development engine will open up the dynamic application dashboard layout automatically at `http://localhost:3000`.*
