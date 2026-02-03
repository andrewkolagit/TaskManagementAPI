<div align="center">

# 📋 Task Management API

### Full-Stack Task Management Application with JWT Authentication

[![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.9-brightgreen?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![SQL Server](https://img.shields.io/badge/SQL%20Server-Database-red?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)](https://www.microsoft.com/en-us/sql-server)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [API Documentation](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## 🎯 About The Project

A modern, full-stack task management system built with industry-standard technologies. This application demonstrates RESTful API design, JWT authentication, Spring Security implementation, and a responsive React frontend[web:11].

### ✨ Features

- 🔐 **Secure Authentication** - JWT-based authentication with Spring Security
- 📝 **Task Management** - Full CRUD operations for tasks
- 🎨 **Modern UI** - Responsive React interface built with Vite
- 🔒 **Protected Routes** - OAuth2 resource server implementation
- 🗄️ **Database Integration** - Microsoft SQL Server with Spring Data JPA
- ⚡ **Performance** - Optimized backend with Spring Boot 3.5.9
- 🛡️ **Input Validation** - Server-side validation for data integrity
- 📊 **Health Monitoring** - Spring Boot Actuator for application insights

---

## 🛠️ Built With

### Backend Technologies
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.9-6DB33F?style=flat-square&logo=spring-boot)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=flat-square&logo=spring-security&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=flat-square&logo=spring&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=flat-square&logo=microsoft-sql-server&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=flat-square&logo=apache-maven&logoColor=white)
![Lombok](https://img.shields.io/badge/Lombok-BC4521?style=flat-square&logo=lombok&logoColor=white)

### Frontend Technologies
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

---
```bash
## 📁 Project Structure
TaskManagementAPI/
├── 📂 TaskManagement/ # Spring Boot Backend
│ ├── 📂 src/
│ │ ├── 📂 main/
│ │ │ ├── 📂 java/
│ │ │ │ └── 📂 com/taskmanagement/
│ │ │ │ ├── 📂 controller/
│ │ │ │ ├── 📂 service/
│ │ │ │ ├── 📂 repository/
│ │ │ │ ├── 📂 model/
│ │ │ │ ├── 📂 config/
│ │ │ │ └── 📄 TaskManagementApplication.java
│ │ │ └── 📂 resources/
│ │ │ ├── 📄 application.properties
│ │ │ └── 📄 application.yml
│ │ └── 📂 test/
│ ├── 📄 pom.xml
│ └── 📂 target/
│
├── 📂 task-management-frontend/ # React Frontend
│ ├── 📂 src/
│ │ ├── 📂 components/
│ │ ├── 📂 services/
│ │ ├── 📂 pages/
│ │ ├── 📄 App.jsx
│ │ └── 📄 main.jsx
│ ├── 📄 package.json
│ ├── 📄 vite.config.js
│ └── 📂 node_modules/
│
└── 📄 README.md
```
---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- ![Java](https://img.shields.io/badge/Java-17+-orange) Java Development Kit (JDK) 17 or higher
- ![Node.js](https://img.shields.io/badge/Node.js-18+-green) Node.js and npm
- ![SQL Server](https://img.shields.io/badge/SQL_Server-2019+-red) Microsoft SQL Server
- ![Maven](https://img.shields.io/badge/Maven-3.6+-blue) Maven 3.6+

### 📥 Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/andrewkolagit/TaskManagementAPI.git
cd TaskManagementAPI
```

#### 2️⃣ Backend Setup
```bash
# Navigate to backend directory
cd TaskManagement

# Configure database connection
# Edit src/main/resources/application.properties
```
```bash
application.properties:
# Database Configuration
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=taskmanagement;encrypt=true;trustServerCertificate=true
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServerDialect
```

```bash
# Build the project
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```
✅ Backend server will start at http://localhost:8080

#### 3️⃣ Frontend Setup
```bash
# Navigate to frontend directory
cd ../task-management-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
✅ Frontend will be available at http://localhost:5173

#### 📡 API Endpoints
| Method | Endpoint           | Description                 | Auth Required |
| ------ | ------------------ | --------------------------- | ------------- |
| POST   | /api/auth/register | Register a new user         | ❌            |
| POST   | /api/auth/login    | Login and receive JWT token | ❌            |

```bash
Register Request:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```
```bash
Login Request:
{
  "username": "john_doe",
  "password": "securePassword123"
}
```
```bash
Login Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "username": "john_doe"
}
```

#### Task Management
| Method | Endpoint        | Description                          | Auth Required |
| ------ | --------------- | ------------------------------------ | ------------- |
| GET    | /api/tasks      | Get all tasks for authenticated user | ✅             |
| GET    | /api/tasks/{id} | Get specific task by ID              | ✅             |
| POST   | /api/tasks      | Create a new task                    | ✅             |
| PUT    | /api/tasks/{id} | Update an existing task              | ✅             |
| DELETE | /api/tasks/{id} | Delete a task                        | ✅             |

Create Task Request:
```bash
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README for GitHub repo",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "dueDate": "2026-01-30"
}
```

Task Response:
```bash
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive README for GitHub repo",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "dueDate": "2026-01-30",
  "createdAt": "2026-01-25T21:00:00",
  "updatedAt": "2026-01-25T21:00:00"
}
```

### Authentication Header
All protected endpoints require JWT token:
```bash
Authorization: Bearer <your-jwt-token>
```
Example with cURL:
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     http://localhost:8080/api/tasks
```

### 🔒 Security Features
- 🔐 JWT Authentication - Stateless token-based authentication
- 🛡️ Spring Security - Industry-standard security framework
- 🔑 Password Encryption - BCrypt password hashing
- 🚫 CORS Configuration - Controlled cross-origin resource sharing
- ✅ Input Validation - Bean validation for all endpoints
- 🎯 Role-Based Access - Authorization with user roles

### 💻 Development
#### Running Tests
Backend:
```bash
cd TaskManagement
./mvnw test
```
Frontend:
```bash
cd task-management-frontend
npm run test
```
#### Building for Production
Backend:
```bash
cd TaskManagement
./mvnw clean package
java -jar target/TaskManagement-0.0.1-SNAPSHOT.jar
```
Frontend:
```bash
cd task-management-frontend
npm run build
# Output will be in the 'dist' folder
```

### Code Style:
- Backend follows Java Code Conventions
- Frontend uses ESLint and Prettier
- Lombok used to reduce boilerplate code

### 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.
1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

### 🙏 Acknowledgments
- Spring Boot Documentation
- React Documentation
- JWT.io
