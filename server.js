const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Directory where images are stored
const imagesDirectory = path.join(__dirname, 'images');

// Serve static files (e.g., images) from the 'images' directory
app.use('/images', express.static(imagesDirectory));

// Endpoint to get an image by name
app.get('/get-image', (req, res) => {
    const imageName = req.query.name;
    const imagePath = path.join(imagesDirectory, imageName);

    // Check if the image exists
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Image not found');
        }
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
