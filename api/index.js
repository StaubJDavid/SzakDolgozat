const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use('*', cors());
app.use(express.json({ limit: '12MB' }));

app.get('/', (req, res) => {
    res.send('Home');
});

app.listen(process.env.PORT, () => {
    console.log(`Listening to ${process.env.PORT}`);
});