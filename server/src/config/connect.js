import mongoose from "mongoose";

export const connectDB = async (uri) => {
    try{
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    }catch(err){
        console.log(err)
    }
}