import express from 'express';
var app = express();
import path from 'path';
import properties from './config/properties';
import cors from 'cors';
import indexRoute from './Controller/index.routes'

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors())

// Serve static files from the 'public' folder (Angular build files)
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", indexRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(properties.PORT, () => {
    console.log(`Server is running on port ${properties.PORT}`);
});
