# 🎯 Snipe & Strike

**Snipe & Strike** is a fast-paced, browser-based shooting game developed using HTML5 Canvas and JavaScript, featuring a backend powered by **Spring Boot**, **REST APIs**, and **MySQL** for real-time user authentication and score tracking.

---

## 🚀 Features

- 🎮 Interactive shooting game with custom crosshair mechanics
- 🔐 User authentication system (Sign up, Log in)
- 📊 Score tracking and leaderboard system
- 🌐 REST API backend with Spring Boot
- 🗄️ MySQL integration for user and score persistence

---

## 🧑‍💻 Tech Stack

| Frontend                 | Backend                      | Database |
|--------------------------|------------------------------|----------|
| HTML5, CSS3, JavaScript  | Java, Spring Boot, REST API  | MySQL    |

---

## 🛠️ Installation & Setup

### 🔹 Frontend (Game)
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/snipe-and-strike.git
2. Open the index.html file in your browser to play the game locally.

🔹 Backend (Spring Boot)
1. Navigate to the backend folder in IntelliJ IDEA.
2. Configure the MySQL connection in application.properties:
   spring.datasource.url=jdbc:mysql://localhost:3306/snipe_game
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   spring.jpa.hibernate.ddl-auto=update
3. Run the Spring Boot application:
   ./mvnw spring-boot:run
4. The REST API will be available at:
   http://localhost:8080/api/

