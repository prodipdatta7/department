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

## Business Logic

This section outlines the core workflows, user roles, and system processes that govern the Department Student Admission Management System.

### 1. Student Admission Workflow

*   **Application:** Prospective students begin by registering on the portal. This involves providing essential personal details such as name, email, and phone number, along with academic history including SSC and HSC GPA, completion year, and the names of their school/college. During this process, they also create a password for their account. Upon successful registration, a unique student ID is generated, and an email confirmation is dispatched to the provided email address.
*   **Profile Completion:** After the initial registration, students can log in to their accounts to further complete their profiles. This includes adding more detailed information like their father's and mother's names, current address, nationality, religion, and date of birth. Students can also upload a profile image.
*   **Exam Discovery & Registration:** The system allows students to view a comprehensive list of available admission exams. Each exam listing provides crucial details such as the exam name, the semester and year it pertains to, registration deadlines (open and close dates), the actual exam date, designated exam center, and any associated fees. Students can choose to register for an exam, which formally links their student profile to that specific exam and updates their personal list of participated exams.
*   **Payment:** Exam fee payments are processed through an integration with Stripe. This typically occurs during the exam registration step or as a distinct step immediately following registration, ensuring that registration is confirmed upon successful payment.
*   **Admit Card/Document Generation:** Once a student has successfully registered for an exam (and payment is confirmed, if applicable), the system enables them to download relevant documents. These documents, generated as PDF files, may include admit cards for entry into the exam hall or registration confirmation slips. The `userExamMappingModel` stores a `filePath` that links a user and an exam to the generated document.
*   **Application Review (Implied):** Although specific controller functions for application review are not explicitly detailed, the system design implies an administrative role for this purpose. The `student.js` model includes an `isAdmin` flag, and the `examModel` contains a `registeredStudents` array, suggesting that administrators have the capability to oversee and review submitted applications.

### 2. User Roles

The system defines two primary user roles: Student and Administrator.

*   **Student:**
    *   Register on the platform and create a personal profile.
    *   Log in to update their personal, academic, and contact information.
    *   Browse and view details of available courses and upcoming exam schedules.
    *   Register for admission exams and complete the necessary fee payments using Stripe.
    *   Download exam-related documents, such as admit cards or registration slips (as indicated by `userExamMappingModel`).
    *   View a history of their registered courses and participated exams.

*   **Administrator (`isAdmin: true` in Student model):**
    *   Manage student accounts, including viewing student details. Generic functions in `userController.js` may allow for updates or deletions.
    *   Manage courses: This includes adding new courses, updating details of existing courses (name, code, credit hours, contact hours, target department/semester), deleting courses, and viewing all available courses (`courseController.js`).
    *   Manage examinations: Create new admission exams, update existing exam information (name, date, fees, status, associated courses), delete exams, and view the list of students registered for each exam (`examController.js`).
    *   View a comprehensive list of all registered users/students in the system.
    *   (Potentially) Oversee the broader admission process, including reviewing applications and making admission decisions, although specific workflows for these actions are not explicitly detailed in the current controllers.

### 3. System Rules and Processes

*   **Authentication & Authorization:** API endpoints are secured using JSON Web Tokens (JWT). User passwords are encrypted using bcrypt before being stored in the database to ensure security.
*   **Data Validation:** Basic data validation is enforced at the database level through Mongoose schemas, which define required fields, data types, and other constraints.
*   **Exam Management:**
    *   Exams are configured with specific registration windows defined by an opening and closing date.
    *   The status of exams (e.g., upcoming, ongoing, completed, postponed) can be managed by administrators.
    *   Exams are typically associated with one or more specific courses for which admission is sought.
*   **Course Management:** Courses are detailed with attributes such as a unique course code, name, credit hours, contact hours per week, and are mapped to specific departments and semesters.
*   **Departmental Information Tracking:** The `department.js` model appears designed to store comprehensive academic records and course mappings for students *after* they have been admitted into a department. This can include details like SSC/HSC performance, admission session, assigned class, current semester, and lists of major and non-major courses taken by the student, facilitating tracking of academic progress.
*   **PDF Generation:** The system incorporates functionality to generate PDF documents. This is likely used for creating admit cards, exam registration confirmations, or other official documents (`examController.js` references `getPdfFiles`, and `userExamMappingModel` includes a `filePath`).
*   **Email Notifications:** Automated email notifications are implemented for key events. For instance, a welcome email with confirmation details is sent when a new user successfully registers (`userController.js` -> `createUser`).
*   **File Uploads:** The system supports file uploads, primarily for student profile images (`student.js` model contains an `imagePath` field). The presence of `multer` as a dependency confirms this capability for handling multipart/form-data.

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
