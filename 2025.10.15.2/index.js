const express = require('express');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const app = express();
const PORT = 8080;

function saveParam(paramObj){
    const timestamp = Date.now();
    const fileName = `params_${timestamp}.json`;
    fs.writeFileSync(fileName, JSON.stringify(paramObj, null, 2));
}
app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('Strona główna');
});

app.get('/json', (req, res) => {
    const book ={
        title: "It",
        author: "Stephen King",
        genre: "Horror",
        pages: 450
    };
    res.json(book);
});

app.get('/html', (req, res) => {
    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8"> 
                <title>Html w kodzie</title> 
            </head>
            <body>
                <h1>To jest html w kodzie node.js (Express)</h1>
            </body>
        </html>`;
    res.send(html);
});

app.get('/html_file', (req, res) => {
    fs.readFile('page.html','utf8', (err, data) => {
        if (err) {
            res.status(500).send('Failed to read file');
        }else {
            res.send(data);
        }
    });
});
app.get('/get_params', (req, res) => {
    const params = req.query;
    saveParam(params);
    res.json({ok:'ok'});
});

app.use(express.static(path.join(__dirname, 'assets')));

app.use((reg,res) =>{
    res.status(404).json({
        error: 'File not found',
        path: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
