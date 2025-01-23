# Todo List Application

This project is a to-do list application that I built using Node.js. Users can register, log in, and add, edit, or delete tasks after logging in. All tasks are stored in a MongoDB database.

## Features

- User Registration and Login
- User Profile Management (Update Information and Password)
- Task Management (Add, Edit, Delete)

## Technologies Used

- **Front-end:** HTML, CSS, JavaScript, Bootstrap
- **Back-end:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Template Engine:** EJS

## Setup

After cloning the project, you can install the necessary dependencies and run it locally:

### Setup
1. Clone the project:
    ```bash
    git clone https://github.com/mekaraoglan/TodoList_nodejs_expressjs_mongodb.git
    cd TodoList_nodejs_expressjs_mongodb
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```bash
    MONGO_URI=[Your MongoDB URI]
    JWT_SECRET_KEY=[Your JWT Secret Key]
    PORT=3000
    ```

4. Set up your MongoDB database:

    a. Create a new database.
    b. Use the connection string to update the `MONGO_URI` in your `.env` file.

5. Start the server:
    ```bash
    npm run start
    ```

6. The app will be available at: http://localhost:3000

### Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file:

```bash
MONGO_URI=[Your MongoDB URI]
JWT_SECRET_KEY=[Your JWT Secret Key]
PORT=3000
