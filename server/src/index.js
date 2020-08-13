const express = require('express');
const router = require('./routes/router');
const app = express();

const port = process.env.PORT || 5000

//middleware of files
app.use('',router);

app.listen(port, () => console.log(`Server running on port ${port}`));


