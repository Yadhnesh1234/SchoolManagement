const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')
const dotenv = require('dotenv')
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config()

app = express()
app.use(cors())
app.use(body_parser.json())

app.use('/api/schools', schoolRoutes);

// const port = process.env.PORT | 3000
// app.listen(process.env.PORT,()=>{console.log(`Server Started at ${port}`)})

module.exports = app;
