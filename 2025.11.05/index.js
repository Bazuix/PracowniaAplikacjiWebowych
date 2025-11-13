const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
app.post('/kontakt',async (req, res) => {
   const {name, lastname, email, message} = req.body;
    console.log('got data', req.body);
    console.log('name', name, typeof name, name.length);
    console.log('lastname', lastname, typeof lastname, lastname.length);
    console.log('email', email, typeof email, email.length);
    console.log('message', message, typeof message, message.length);

    if (!name?.trim() || !lastname?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(400).send('bad data');
    }


    try{
       await db.execute(
           "INSERT INTO messages (imie, nazwisko, email, tresc) VALUES (?, ?, ?, ?)",
           [name, lastname, email, message]
       );
       console.log('Saved message:', {name, lastname, email, message});
       res.redirect('/');
   }catch(err){
       console.error('Error while saving message:', err);
       res.status(500).send('Server error');
   }
});
app.get('/api/contact-messages', async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM messages ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/contact-messages/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await db.execute("SELECT * FROM messages WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Message with that id not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


app.use((req,res)=>{
    res.status(404).send('<h1>Site Not Found</h1>');
});
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});