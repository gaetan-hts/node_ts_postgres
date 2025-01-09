Chess Tournament Management App

This repository contains the code for a Chess Tournament Management App that allows users to register, participate in online chess tournaments, and track their Elo ratings. The app supports various types of chess games (Bullet, Blitz, Rapid) and updates Elo ratings based on tournament results.

Features
User Registration: Users can sign up and provide their Elo rating.
Tournament Enrollment: Once registered, users can sign up for different types of chess tournaments (Bullet, Blitz, Rapid).
Elo Rating Updates: Players' Elo ratings are automatically updated based on their performance in tournaments.
Profile Viewing: Users can view profiles of other players to check their Elo ratings and past results.

Tournament Types:
Bullet: A fast-paced format with limited time.
Blitz: A rapid format with slightly longer time controls.
Rapide: A more balanced format with longer time for each player.

Technologies Used

Frontend:
React: For building the user interface.
Vite: A fast build tool for frontend development.

Backend:
Express: The web framework used to build the backend API.
TypeScript (ts-node): Strongly typed language for the backend logic.
JWT: JSON Web Tokens for secure authentication and authorization.
Drizzle: A library to simplify interaction with the PostgreSQL database.
PostgreSQL: The database system used to store user and tournament data.
Winston: A logging library for capturing important events in the system.
Zod: A schema validation library for input data validation.


API Documentation
You can access the API documentation through Postman: https://documenter.getpostman.com/view/21660988/2sAYQUqZXP.

The documentation provides detailed information about the available endpoints for interacting with the system

---
Before you begin, ensure you have the following installed:

Node.js: To run the backend.
npm: For package management.
PostgreSQL: For the database.
Installation
Clone the repository to your local machine:

bash
Copier le code
git clone https://github.com/your-repo/chess-tournament-app.git
cd chess-tournament-app
Install backend dependencies
Set up the PostgreSQL database

Create a new database.
Set up the schema (refer to the backend directory for migration files).
Configure the environment variables:

Create a .env file in both the frontend and backend directories.
Set the necessary configurations like database connection strings, JWT secrets, etc.

Feel free to fork this repository, submit issues, and open pull requests. Contributions are welcome!
