# Social API

This project is a functional Social API designed to handle user interactions and social networking features. It provides working routes for creating, reading, updating, and deleting users, thoughts, and reactions. The API also supports friend management and dynamic data relationships.

## Features
- User management (CRUD operations)
- Thought creation and reaction handling
- Friend list management
- RESTful API routes

## Technologies
- Node.js
- Express.js
- MongoDB with Mongoose

## Usage
1. Clone the repository.
2. Install dependencies using `npm install`.
3. If necessary, seed data with `npm seed`.
4. Start the server with `npm start`.
5. Use tools like Postman or Insomnia to test the API routes.

## Routes
- **Users**: `/api/user`
- **Thoughts**: `/api/thoughts`
- **Reactions**: Embedded in thoughts
- **Friends**: Managed through user routes

## Walkthrough Video

For a detailed walkthrough of the project, watch the video [here](https://drive.google.com/file/d/1FgtfwQc7QrSFm5_aUHUzwgSy3lozkny2/view?usp=sharing).