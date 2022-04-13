const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const sendEmail = require('./services/email');

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');

app.post('/send-mail', cors(), function (req, res) {
  sendEmail(req.body.email, req.body.name, req.body.message)
    .then(() => res.json({ ok: true }))
    .catch(() => res.json({ ok: false }));
});

app.listen(PORT, () => {
  console.log(`Hello: ${PORT}`)
});