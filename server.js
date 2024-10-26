const express = require('express');
const path = require('path');

const app = express();
const PORT = 2000;

//Laods index.html when root URL is 2000
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.hmtl'))
});

//Starts the server when 2000 is loaded
app.listen(PORT, () => {
    console.log('Server is running on http://localhost: ${PORT}')
});