# 🎓 Student Affairs System

A robust, dynamic **Single Page Application (SPA)** for managing university records. Built with **Vanilla JavaScript (ES6+)** using a **Component-Based Architecture** and **Object-Oriented Programming (OOP)** principles.

The project demonstrates a decoupled architecture where the **Frontend** is hosted on GitHub Pages and the **Backend (Mock API)** is deployed on Railway.

## 🚀 Live Demo

- **Frontend (Dashboard):** (https://abdohalem.github.io/ITI_Student_Affairs_System/)
- **Backend (API):** (https://github.com/AbdoHalem/student-affairs-api)

---

## 🛠️ Architecture & Design

This project follows a **Decoupled Architecture**:
1.  **Frontend:** Static HTML/CSS/JS files hosted on GitHub Pages. It consumes the API using `fetch`.
2.  **Backend:** A `json-server` instance hosted on **Railway**, serving the `db.json` database as a RESTful API.

### Key Design Patterns:
- **OOP (Inheritance):** Base `Person` class extended by `Student`, `Instructor`, and `Employee` classes.
- **Factory Pattern:** Used in `TableManager.js` to instantiate entities dynamically based on the selected table.
- **Service Layer:** `API.js` encapsulates all HTTP requests (`GET`, `POST`, `PUT`, `DELETE`), keeping UI logic clean.
- **Singleton-like Services:** `LoginService` manages authentication state.

---

## ✨ Features

### 🔐 Authentication
- **Secure Login:** Role-based access (Admin/Staff) validated against the API.
- **Session Management:** Uses `sessionStorage` to secure user sessions (auto-logout on browser close).

### 📊 Dynamic Dashboard
- **Universal Table Component:** A single `TableManager` class handles all entity types (Students, Instructors, Courses).
- **Real-time Search:** Filter records instantly by any field.
- **Sorting:** Clickable column headers to sort data ascending/descending.
- **Pagination:** Server-side simulation or client-side handling for large datasets.

### 📝 Advanced CRUD
- **Dynamic Forms:** Modal forms auto-generate input fields based on the entity type (e.g., specific fields for Courses vs. Students).
- **Bulk Delete:** Select multiple rows via checkboxes and delete them in one request.
- **Edit Mode:** Pre-fills forms with existing data for seamless updates.

---

## 📂 Project Structure

```text
/
├── css/
│   ├── dashboard.css       # Styling for the main dashboard
│   └── login.css           # Styling for the login page
├── JS/
│   ├── components/
│   │   └── TableManager.js # Core logic for rendering & manipulating tables
│   ├── modules/
│   │   ├── person.js       # Abstract Parent Class
│   │   ├── student.js      # Child Class
│   │   ├── instructor.js   # Child Class
│   │   ├── employee.js     # Child Class
│   │   └── course.js       # Independent Class
│   ├── services/
│   │   ├── API.js          # Fetch wrapper for Railway API
│   │   └── LoginService.js # Auth logic
│   ├── dashboard.js        # Main Controller for the dashboard UI
│   └── main.js             # Controller for the Login UI
├── Data/                   # Images and assets
├── index.html              # Main Dashboard Page
├── login.html              # Login Page
└── README.md               # Project Documentation

⚙️ Setup & Installation
To run this project locally, you don't need a local backend if you connect to the Railway API.

Clone the repository:

Bash
git clone [https://github.com/AbdoHalem/ITI_Student_Affairs_System.git](https://github.com/AbdoHalem/ITI_Student_Affairs_System.git)
Open the project: Simply open login.html in your browser (or use VS Code Live Server).

API Configuration: The project is pre-configured to connect to the **Railway** API. If you want to run a local server:

Install json-server: npm install -g json-server

Run: json-server --watch db.json

Update JS/services/API.js base URL to http://localhost:3000.

📡 API Endpoints (Railway)
The backend exposes the following REST endpoints:

GET /students - Retrieve all students

GET /instructors - Retrieve all instructors

GET /courses - Retrieve all courses

GET /employees - Retrieve employees (used for login)

👨‍💻 Author
Abdelrahman AbdelHalem Helal

Software Engineer

ITI 9-Months Diploma (Professional Development & BI-infused CRM Track)