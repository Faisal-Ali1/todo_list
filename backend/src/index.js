const express = require('express');
const main = require('./config/db');
const data = require('./Modals/dataSchema')
const dataRouter = require('./Routes/dataRoutes')
const cors = require('cors');


const app = express();
const PORT = 3000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json())
app.use('/', dataRouter);


    
        app.listen(PORT, () => {
            console.log(`listning at port no ${PORT}`);
            main();
        })
