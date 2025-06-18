import mongoose from "mongoose";
import { DeliveryPartner } from "./user.js";

const branchSchema = new mongoose.Schema({
    name : {type : String, required : true},
    location : { 
        latitude : {type : Number, required : true},
        longitude : {type : Number, required : true}
    }, 
    address : {type : String, required : true},
    deliveryPartner: [
        {
            type : mongoose.Schema.Types.ObjectId, 
            ref : "DeliveryPartner"
        },
    ],
});
    
const Branch = mongoose.model("Branch", branchSchema);
export default Branch;