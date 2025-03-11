import mongoose from 'mongoose';
import 'dotenv/config'

const connecteddatabase = () =>{
    try {
        mongoose.connect(process.env.DB_Key)
        console.log('mongodb database connected successfully...');
    } catch (error) {
        console.error("error in connected to database", error);
    }
}

export default connecteddatabase;