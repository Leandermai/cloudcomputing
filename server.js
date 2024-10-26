const exp = require('constants');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 2000;

// Serve the index.html file when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the comments.html file 
app.get('comments', (req, res) => {
    res.sendFile(path.join(__dirname, 'comments'));
});

// Serve the showdcomments.html file
app.get('showcomments', (req, res) => {
    res.sendFile(path.join(__dirname, 'showcomments'));
});



//Array to store the comments
let comments = [];

//Middleware to parse JSON data
app.use(express.json());

//Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

//Post endpoint to receive comments
app.post('/comments', (req, res) => {
    const { name, comment } = req.body;

    //Save the comment in the comments adday
    const newComment = { name, comment };
    comments.push(newComment);

    //Send the saved comment back to client
    res.join(newComment);
});

//Get endpoint for comments to show in showcomments.html
app.get('showcomments', (req, res) => {
    res.join(comments);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
