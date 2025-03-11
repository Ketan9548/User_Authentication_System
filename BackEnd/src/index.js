import express from 'express';
import connecteddatabase from './DbConnection/Db.js';
import userauthentiucation from './Routes/Authentication.js';
import cors from 'cors'

const app = express();

const port = 4000 || 


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