import express from 'express';
import connecteddatabase from './DbConnection/Db.js';
import userauthentiucation from './Routes/Authentication.js';
import cors from 'cors'
import 'dotenv/config'

const app = express();

const port = 6000 || process.env.PORT


app.use(cors())

connecteddatabase();

app.use(express.json());


app.use('/api',userauthentiucation);

app.get('/', (req, res) => {
    res.send('Hello World!'); 
})

app.listen(port,()=>{
    console.log(`Server running on port http://localhost:${port}`);
});