const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config()

app = express()
app.use(cors())
app.use(express.json())

app.use('/api/schools', schoolRoutes);

const port = process.env.PORT | 3000
app.listen(process.env.PORT,()=>{console.log(`Server Started at ${port}`)})
