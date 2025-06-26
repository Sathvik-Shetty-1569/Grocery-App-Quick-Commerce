import { appAxios } from "./apiInterceptors";
import { BRANCH_ID } from "./config";

export const createOrder = async(items:any, totalPrice : number)=>{
    try {
        const response = await appAxios.post('/order',{
            items: items,
            branch: BRANCH_ID,
            totalPrice: totalPrice
        })
        return response.data;
    } catch (error) {
        console.log("Create order error", error);
        return null;
    }
}

export const getOrderById = async(id : string)=>{

    try{
        const response = await appAxios.get(`/order/${id}`);
        return response.data
    }
    catch(error){
        console.log("Get order by id error", error);
        return null;
    }
    
}