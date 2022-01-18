import mongoose from 'mongoose';

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser: true
        });
        console.log(`mongoDB is connected successfully to ${conn.connection.host}`.yellow.underline);
    }catch(error){
     console.log(`${error.message}`.red.bold);
     process.exit(1);
    }
}

export default connectDB;