# Task Manager

Welcome to Task Manager, a simple yet efficient web application designed to help you manage your tasks and achieve your goals with ease. The application provides essential features such as task creation, editing, and deletion, along with user authentication to keep your tasks secure.

Task Manager uses a robust relational database (PostgreSQL) to store user and task information, ensuring data consistency and reliability. Each user has their own set of tasks, which are securely managed through authentication and authorization mechanisms. The database design is optimized for scalability and performance, allowing you to handle multiple tasks and users efficiently.

## Requirement Compliance

This application meets all the specified requirements:

- **User Authentication:**
  - Users can register with their email and password.
  - Users can log in and log out.

- **Task Management:**
  - Users can create a new task with a title and description.
  - Users can view a list of all their tasks.
  - Users can update the title and description of their tasks.
  - Users can delete a task.

- **Relational Database:**
  - The application uses PostgreSQL as a relational database to store user and task information.
  - Each user has their own set of tasks.

- **Evaluation Criteria:**
  - Functionality: The application meets all specified requirements.
  - Code Quality: The code is clean, well-organized, and well-documented.
  - UI/UX: The user interface is intuitive and easy to use.
  - Database Design: The database schema is efficient and scalable.

## Technologies Used

- Next.js
- React
- Axios
- CSS Modules
- PostgreSQL
- Sequelize
- NextAuth.js

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker (for database setup)


### Installation

1. **Clone the repository:**

    git clone https://github.com/your-username/task-manager.git

    cd task-manager

3. **Install the dependencies:**

    npm install


4.  **Generate NEXTAUTH_SECRET:**
  
    You can do this in PowerShell (Suggested) , CMD, or any terminal by running:

    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    
    This command will generate a random secret key that you can copy and paste into the .env.local file.


6. **Set up environment variables:**

    Create a .env.local file in the root of the project and add the following environment variables:
   
    NEXTAUTH_URL=http://localhost:3000
   
    NEXTAUTH_SECRET=your-jwt-secret
   
    DB_USERNAME=your-db-username
      
    DB_PASSWORD=your-db-password
       
    DB_NAME=taskmanager
   
    DB_HOST=localhost
    
    DB_PORT=5432
   
    DATABASE_URL=postgres://user:password@localhost:5432/taskmanager
  
      (Replace user, password, and taskmanager with your PostgreSQL credentials.)


4. **Set up the database with Docker:**

    Run the following command to start the PostgreSQL database in a Docker container:

    docker-compose up -d

    This command will create and start a PostgreSQL database container using the configuration in docker-compose.yml.

5. **Run the migrations to set up the database schema:**

    npx sequelize-cli db:migrate

6. **Running the Application**
    
    Start the development server:

    npm run dev

    The application will start on http://localhost:3000.

7. **Access the application:**

    Open your browser and go to http://localhost:3000 to use the Task Manager app.

     **Usage**
   
    Sign Up: Create a new account using your email and password.
   
    Sign In: Log in to the application with your registered credentials.
   
    Task Management: Add new tasks, edit existing ones, and delete tasks you no longer need.

    Sign Out: Log out from your account securely.
    

    **License**
   
    This project is licensed under the MIT License. See the LICENSE file for more details.

