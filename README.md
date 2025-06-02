# Department Student Admission Management System

## Project Description

The Department Student Admission Management System is a comprehensive web application designed to streamline and automate the student admission process for academic departments. It provides a user-friendly interface for prospective students to apply for admission, manage their applications, and make payments. Administrators can manage student applications, courses, exam schedules, and generate relevant reports.

## Key Technologies

### Frontend

*   **Angular:** A powerful JavaScript framework for building dynamic and responsive user interfaces.
*   **Angular Material:** A UI component library for Angular, providing pre-built and customizable UI elements.
*   **Firebase:** Used for certain frontend functionalities (e.g., potentially authentication or real-time updates, though primary backend is Node.js).
*   **Stripe:** Integrated for secure online payment processing for application fees.

### Backend

*   **Node.js:** A JavaScript runtime environment for building scalable server-side applications.
*   **Express:** A fast and minimalist web framework for Node.js, used for building APIs.
*   **MongoDB:** A NoSQL document database used to store application data.
*   **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js, simplifying interactions with the database.
*   **JSON Web Tokens (JWT):** Used for securing APIs and managing user authentication.
*   **Stripe:** Integrated for server-side payment processing and management.
*   **PDFKit:** A PDF generation library for Node.js, used for creating documents like admission letters or reports.

## Setup and Installation

Follow these steps to set up and run the project locally:

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install Dependencies:**

    *   **Frontend:**
        ```bash
        cd frontend # or your frontend directory name
        npm install
        ```
    *   **Backend:**
        ```bash
        cd backend # or your backend directory name
        npm install
        ```

3.  **Configure Environment Variables:**

    Navigate to the `backend` directory and create a `.env` file. This file will store sensitive configuration information. Add the following placeholders and replace them with your actual values:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    PORT=3000 # Or any port you prefer for the backend
    # Add any other environment variables your application might need
    ```

## Running the Application

1.  **Backend:**
    Navigate to the `backend` directory and run:
    ```bash
    npm start
    ```
    Alternatively, if you have `nodemon` installed for automatic server restarts during development:
    ```bash
    nodemon app.js
    ```
    The backend server will typically start on the port specified in your `.env` file (e.g., `http://localhost:3000`).

2.  **Frontend:**
    Navigate to the `frontend` directory (or your frontend application's root) and run:
    ```bash
    ng serve
    ```
    or
    ```bash
    npm start
    ```
    The frontend development server will usually start on `http://localhost:4200`. Open this URL in your web browser.

## Key Features

*   **User Registration & Login:** Secure authentication for students and administrators.
*   **Student Admission:** Online application submission, document uploads, and application tracking.
*   **Course Management:** Administrators can add, update, and manage available courses.
*   **Exam Scheduling:** Tools for scheduling and managing admission tests or interviews.
*   **Payment Integration:** Secure processing of application fees via Stripe.
*   **PDF Generation:** Automated creation of admission letters, fee receipts, or other relevant documents.
*   **Admin Dashboard:** Centralized interface for administrators to manage the admission process.

## Project Structure

### Frontend (Angular)

*   **`src/app/components`:** Contains reusable UI components (e.g., login form, application form, course list).
*   **`src/app/services`:** Houses services for API communication, authentication, and other business logic.
*   **`src/app/modules`:** Organizes the application into feature modules (e.g., `AuthModule`, `StudentModule`, `AdminModule`).
*   **`src/app/pages`:** Contains top-level components that represent application pages.
*   **`src/assets`:** Stores static assets like images, fonts, and global styles.

### Backend (Node.js/Express)

*   **`routes/`:** Defines the API endpoints and maps them to controller functions.
*   **`controllers/`:** Contains the business logic for handling requests and interacting with models.
*   **`models/`:** Defines Mongoose schemas and models for database collections (e.g., `User`, `Application`, `Course`).
*   **`middlewares/`:** Includes custom middleware functions for tasks like authentication (JWT verification), error handling, or request logging.
*   **`config/`:** Stores configuration files (e.g., database connection settings, Stripe keys if not solely in `.env`).
*   **`app.js` (or `server.js`):** The main entry point for the backend application, where Express is configured and routes are mounted.

## Licensing

This project is licensed under the **ISC License**. (Based on the backend `package.json` license information).
You can find the full license text in the `LICENSE` file if one is present in the repository.
```
