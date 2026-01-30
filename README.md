# 🎓 Student Affairs System

A comprehensive, dynamic web application for managing university records (Students, Instructors, Courses, and Employees). Built with **Vanilla JavaScript (ES6+)**, following **OOP principles** and a **Modular Architecture**.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Technology](https://img.shields.io/badge/Tech-Vanilla%20JS%20%7C%20ES6%20Modules-yellow)
![Style](https://img.shields.io/badge/Style-CSS3%20%7C%20Responsive-blue)

## 📸 Screenshots

## ✨ Key Features

### 🔐 Authentication & Security
- **Secure Login System:** Differentiates between Admin and Staff roles.
- **Session Management:** Uses `sessionStorage` to ensure users are logged out upon closing the browser, enhancing security compared to `localStorage`.
- **Route Protection:** Prevents unauthorized access to the dashboard without valid credentials.

### 📊 Dynamic Dashboard
- **Universal Table Manager:** A single, smart component handles displaying data for Students, Instructors, Courses, or Employees dynamically.
- **Real-time Search:** Filter records instantly by any column value.
- **Sorting:** Sort data ascending/descending by clicking table headers.
- **Pagination:** Handles large datasets efficiently with Next/Previous navigation.

### 🛠️ Advanced CRUD Operations
- **Create:** Dynamic modal forms that auto-generate inputs based on the entity type (e.g., Department dropdown for Students, Duration for Courses).
- **Read:** Fetches data from a mock REST API (`json-server`).
- **Update:** Pre-fills forms with existing data for editing.
- **Delete:** Supports single row deletion and **Bulk Delete** via checkboxes.

---

## 🏗️ Technical Architecture

This project is built using a **Component-Based Architecture** without any external frameworks.

### 1. Object-Oriented Design (OOP)
The system leverages **Inheritance** and **Encapsulation** to manage entities:
- **`Person` (Abstract Class):** Base class containing shared properties (ID, Name, Age, Phone) and private fields validation.
- **`Student`, `Instructor`, `Employee`:** Child classes inheriting from `Person` with specific fields (e.g., `Department`, `Role`).
- **`Course`:** A standalone class for course management.

### 2. Design Patterns & Best Practices
- **Factory Pattern:** Used in `TableManager` to instantiate the correct class object dynamically (replacing traditional switch-cases for better scalability).
- **Service Layer:** `API.js` handles all HTTP requests (`fetch` wrapper), keeping the logic separate from the UI.
- **Event Delegation:** High-performance event handling attached to parent containers (e.g., `tbody`) to manage dynamic rows.
- **Separation of Concerns:**
  - `dashboard.js`: Controller (Handling UI events).
  - `TableManager.js`: Logic (Data processing & Rendering).
  - `API.js`: Data Access Layer.

---

## 🚀 How to Run the Project

You need **Node.js** installed to run the mock backend.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/student-affairs-system.git](https://github.com/your-username/student-affairs-system.git)

2. **Install dependencies:**
Install JSON Server (Global):
Bash
npm install -g json-server

Start the Backend Server: Open a terminal in the project folder and run:
Bash
json-server --watch db.json

Launch the Application: Open login.html in your browser (or use Live Server extension in VS Code).

📂 Project Structure
Plaintext
Student-Affairs-System/
├── JS/
│   ├── components/
│   │   └── TableManager.js    # Core logic for table rendering & CRUD
│   ├── modules/
│   │   ├── person.js          # Parent Class
│   │   ├── student.js         # Child Class
│   │   ├── instructor.js      # Child Class
│   │   └── ...
│   ├── services/
│   │   ├── API.js             # Fetch API Wrapper
│   │   └── LoginService.js    # Auth Logic
│   ├── dashboard.js           # Main Controller for Dashboard
│   └── main.js                # Main Controller for Login
├── css/
│   ├── dashboard.css
│   └── login.css
├── db.json                    # Mock Database
├── index.html                 # Dashboard Page
├── login.html                 # Entry Page
└── README.md
👨‍💻 Author
[Abdelrahman Abdelhalem]
Software Engineer.

ITI 9-Months Diploma (Professional Development & BI-infused CRM Track).

This project was developed for educational purposes to master Vanilla JS, ES6, OOP, and DOM Manipulation.