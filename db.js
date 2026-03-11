import mongoose from "mongoose";

const connectDB = async ()=> {
  try{
    const connect = await mongoose.connect(process.env.MONGODB_STRING)
    console.log('connected to mongodb ✅')
  }catch(err){
    console.error("Error", err.message)
    process.kill(1)
  }
}

export default connectDB