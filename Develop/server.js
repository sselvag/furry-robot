const express = require("express");
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));



fs.readFile("./db/db.json", 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    console.log(notes);
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
    console.log(`${req.method} request received`);
});




app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

