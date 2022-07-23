const express = require("express");
const path = require('path');
const uniqID = require('uniqid');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});



app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});



app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});


app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a review`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uniqID(),
    };
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr ? console.error(writeErr) : console.info('Successfully updated notes!')
        );
      }
    });
    const response = {
      status: 'success',
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status.apply(500).json('Error in posting note');
  }
});




app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

