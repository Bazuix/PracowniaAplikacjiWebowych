const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.use('/static',express.static(path.join(__dirname,'public/static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public/ind.html'));
});
app.get('/o-nas', (req, res) => {
    res.sendFile(path.join(__dirname,'public/o-nas.html'));
});

app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname,'public/oferta.html'));

});
app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname,'public/kontakt.html'));

});
app.post('/kontakt', (req, res) => {
    console.log('We have information from form');
    console.log(req.body);
    res.redirect('/');
});
app.use((req,res)=>{
    res.status(404).send('<h1>Site Not Found</h1>');
});
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

