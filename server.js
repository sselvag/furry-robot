const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const APIroutes = require("./routes/APIroutes");
const routes = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', APIroutes);
app.use('/', routes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

