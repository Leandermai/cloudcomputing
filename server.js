const express = require('express');
const path = require('path');
const app = express();
const PORT = 2000;

// Serve the index.html file when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the comments.html file 
app.get('/comments', (req, res) => {
    res.sendFile(path.join(__dirname, 'comments.html'));
});

// Serve the showcomments.html file
app.get('/showcomments', (req, res) => {
    res.sendFile(path.join(__dirname, 'showcomments.html'));
});

// Redirect URLs with .html extension to the same path without .html
app.get('/*.html', (req, res) => {
  const pathWithoutExtension = req.path.slice(0, -5); // removes ".html"
  res.redirect(301, pathWithoutExtension);
});

// Array to store the comments
let comments = [];

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the 'comments' directory
app.use(express.static(path.join(__dirname, 'comments')));

// POST endpoint to receive comments
app.post('/comments', (req, res) => {
    const { name, comment } = req.body;

    // Save the comment in the comments array
    const newComment = { name, comment }; //Extract data from reqeust body
    comments.push(newComment);            //Store new comment in the comments array
    res.json(newComment);                 //Send the received comment back
});

//Route to serve the showcomments file
app.get('/showcomments', (res, req) => {
  res.sendFile(path.join(__dirname, 'comments', 'showcomments'))
})

// GET endpoint for comments to show in showcomments.html
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
