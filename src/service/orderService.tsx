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
        return response.data;
    }
    catch(error){
        console.log("Get order by id error", error);
        return null;
    }
    
}

export const fetchCustomerOrders = async(userId : string)=>{
    try {
        const response = await appAxios.get(`/order?customerId=${userId}`);
        return response.data;
    } catch (error) {
        console.log("Fetch customer orders error", error);
        return null;
        
    }
}

export const fetchOrders = async(status: string, userId: string, branchId: string)=>{
    
    let uri= 
    status == 'available'
    ? `/order?status=${status}&branchId=${branchId}`
    : `/order?branchId=${branchId}&deliveryPartnerId=${userId}&status=delivered`;

    try {
        const response = await appAxios.get(uri);
        return response.data;
    } catch (error) {
        console.log("Fetch orders error", error);
        return null;
    }


}

export const sendLiveOrderUpdates = async(id: string, location: any, status: string)=>{
    try{
        console.log("Send live order updates", id, location, status);
    const response = await appAxios.patch(`/order/${id}/status`,{
        deliveryPersonLocation: location,
        status
    })
    return response.data;
}
catch(error){
    console.log("Send live order updates error", error);
    return null;
}
}

export const confirmOrder = async(id: string, location: any)=>{
    try {
        console.log("Confirming order:", id, "Location:", location);
        const response = await appAxios.post(`/order/${id}/confirm`, {
            deliveryPersonLocation: location,
        })
        console.log("Confirm order success:", response.data);
        return response.data;
    } catch (error: any) {
        console.log("Confirm order error details:", {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            config: {
                url: error.config?.url,
                method: error.config?.method,
                headers: error.config?.headers
            }
        });
        return null;
    }
}
