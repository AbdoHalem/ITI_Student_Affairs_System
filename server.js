const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const server = jsonServer.create();

// Setting up the router to use db.json file
const router = jsonServer.router(path.join(__dirname, 'db.json'));

// Define default middlewares (logger, static, cors and no-cache)
const middlewares = jsonServer.defaults({
    static: path.join(__dirname, 'public')
});

// Enable CORS for all routes
server.use(cors());
server.use(middlewares);
server.use(router);

// Use the PORT environment variable or default to 3000
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, '0.0.0.0', () => {
    console.log(`JSON Server is running on port ${port}`);
});