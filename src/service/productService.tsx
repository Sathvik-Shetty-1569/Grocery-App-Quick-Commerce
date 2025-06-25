import axios from 'axios'
import { BASE_URL } from './config'

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`)
        console.log("Categories",response.data)
        return response.data
    } catch (error) {
        console.log("Error Categories",error)
        return []
    }
}

export const getProductByCategoryId = async (id: string) => {
    try{
const response = await axios.get(`${BASE_URL}/products/${id}`)
console.log("Products",response.data)
return response.data
    }catch(error){
        console.log("Error Product",error)
        return []
    }
}