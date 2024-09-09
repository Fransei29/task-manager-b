# Task Manager

Welcome to Task Manager, a simple yet efficient web application designed to help you manage your tasks and achieve your goals with ease. The application provides essential features such as task creation, editing, and deletion, along with user authentication to keep your tasks secure.

## Features

- User Authentication : Register, sign in, and sign out using your email and password.
- Task Management : Create, view, update, and delete tasks.
- Responsive Design : The app is responsive and works well on both desktop and mobile devices.

## Technologies Used

- Next.js
- React.
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

2. **Install the dependencies:**

    npm install


3.  **Generate NEXTAUTH_SECRET:**
    You can do this in PowerShell, CMD, or any terminal by running:

    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    This command will generate a random secret key that you can copy and paste into the .env.local file.


4. **Set up environment variables:**

    Create a .env.local file in the root of the project and add the following environment variables:

    DATABASE_URL=postgres://user:password@localhost:5432/taskmanager
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-jwt-secret

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

Project Structure
components/: Contains React components like AuthForm, TaskList, and TaskForm.
pages/: Contains the Next.js pages, including the main entry point (index.js).
styles/: Contains global styles (globals.css) and CSS modules for component-specific styling.
lib/: Contains utility functions and helper code.
models/: Contains Sequelize models for interacting with the PostgreSQL database.
api/: Contains the API routes for handling authentication and task management.
Usage
Sign Up: Create a new account using your email and password.
Sign In: Log in to the application with your registered credentials.
Task Management: Add new tasks, edit existing ones, and delete tasks you no longer need.
Sign Out: Log out from your account securely.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the existing code style and includes relevant tests.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

