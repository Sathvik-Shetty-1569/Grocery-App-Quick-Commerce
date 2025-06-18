import ConnectMongoDBSession from "connect-mongodb-session";
import fastifySession from "@fastify/session";
import"dotenv/config";
import { Admin } from "../models/index.js";
import { Mongoose } from "mongoose";

export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;

const MongoDBStore = ConnectMongoDBSession(fastifySession);
export const sessionStore = new MongoDBStore({ 
    uri: process.env.MONGO_URI ,
    collection: "sessions",
});

sessionStore.on("error", (error) => {
    console.log(error);
})

export const authenticate = async (email, password) => {

       // uncomment this when creating admin first time

    if(email && password){
        if(email === "admin@gmail.com" && password === "admin"){
            return Promise.resolve({email: email, password: password});
                
            }else{
            return null;
        }
        
    }
   // uncomment this when admin is created manually
    // if(email && password){
    //     const user = await Admin.findOne({ email, password });
    //     if (!user) {
    //         return null;
    //     }
    //     if(user.password !== password){
    //         return Promise,resolve({email : email, password: password});
    //     }
    //     else{
    //         return null;
    //     }
    // }
    const user = await Admin.findOne({ email });
    if (!user) {
        return null;
    }

}


