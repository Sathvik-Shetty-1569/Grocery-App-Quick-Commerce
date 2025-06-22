import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "@state/storage";
import { useAuthStore } from "@state/authStore";
export const customerLogin = async (phone: String) => {
    try{
const response = axios.post(`${BASE_URL}/customer/login`,{phone}) 
const {accessToken,refreshToken,customer} = (await response).data
tokenStorage.set("accessToken",accessToken);
tokenStorage.set("refreshToken",refreshToken);
const {setuser} = useAuthStore.getState()
setuser(customer);

    }catch(error){
        console.log("Login error",error);
    }
}

export const deliveryLogin = async (email:string , password: string) => {
    try{
const response = axios.post(`${BASE_URL}/delivery/login`,{email,password}) 
const {accessToken,refreshToken,deliveryPartner} = (await response).data
tokenStorage.set("accessToken",accessToken);
tokenStorage.set("refreshToken",refreshToken);
const {setuser} = useAuthStore.getState()
setuser(deliveryPartner);

    }catch(error){
        console.log("Login error",error);
    }
}