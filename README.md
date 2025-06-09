# BE Budget Tracker

This is the backend for a budget tracking application, built with Express.js and using modular structure folder.

---

## How to Run

Follow these steps to get the backend up and running on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/NazalPrastya/be_budget_tracker.git](https://github.com/NazalPrastya/be_budget_tracker.git)
    ```

2.  **Navigate into the project directory:**

    ```bash
    cd be_budget_tracker
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Create a `.env` file:**
    Copy the `.env.example` file and rename it to `.env`. Then, update the environment variables (e.g., database connection string, port) as needed for your setup.

5.  **Start the server:**
    ```bash
    npm start
    ```
    The server should now be running, typically on `http://localhost:3000` (or the port you configured in your `.env` file).

---

## Short Explanation

This project serves as the **backend API** for a budget tracker. It's developed using **Express.js**, a fast, unopinionated, and minimalist web framework for Node.js. It handles all the server-side logic, including:

- **Managing user authentication and authorization.**
- **Storing and retrieving budget data** (e.g., income, expenses, categories).
- **Providing API endpoints** that the frontend application can consume to perform CRUD (Create, Read, Update, Delete) operations on budget-related data.

This backend provides the necessary data and functionalities to power a complete budget tracking application.
