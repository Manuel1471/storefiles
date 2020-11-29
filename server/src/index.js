const express = require('express');
const dirRouter = require('./routes/dir');
const uploadRouter = require('./routes/upload');
const cors = require('cors');
const enoent = require('./middlewares/enoent');
const eexist = require('./middlewares/eexist');
const err = require('./middlewares/err');

const port = process.env.PORT || 5000

const app = express();

app.use(express.json());
app.use(cors());

app.use('/dir', dirRouter);
app.use('/upload',uploadRouter);

app.use(enoent);
app.use(eexist);
app.use(err);

app.listen(port, () => console.log(`Server running on port ${port}`));


