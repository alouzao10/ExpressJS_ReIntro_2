const express = require('express'); // Bring in the Express module
const path = require('path');

// Bring in any external data to use in the file/server
//const logger = require('./middleware/logger.js'); // External Middleware function

const app = express(); // New instance of Express server

// Set a static folder to load in multiple html files
// References the folder to load in the html pages within
// Loads in the pages behind the scenes, don't need multiple get actions
app.use(express.static(path.join(__dirname, 'public')));

// Bring in the router from the member API for use
app.use('/api/members', require('./routes/api/members.js'));

// Use a body parser Middleware to get the data from the object body
app.use(express.json());

// Use to handle form submissions
app.use(express.urlencoded({ extended: false }));

// Initialize the Middleware functions for use globally
// Will get executed before all other functions on load
//app.use(logger);

// Get the home index of the site and display something
app.get('/', (req, res) => {
  //console.log('Home Page Loaded...');
  // 1) Send some Text
  //res.send('<h1>Welcome to ExpressJS</h1>\n<h3>Learning in progress...</h3>');
  // 2) Load a File to display in the path
  // Not ideal as you'd need multiple get actions for each file path
  //res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about.html', (req, res) => {
  //console.log('About Page Loaded...');
  //res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// To use the server, it needs some port for the server to listen on
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server Running on Port ' + PORT);
});
