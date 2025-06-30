import Order from "../../models/order.js";
import Branch from "../../models/branch.js";
import {Customer, DeliveryPartner} from "../../models/user.js";
export const createOrder = async (req, reply) => {

    try{
        console.log(req.user)
        const {userId} = req.user;
        const {items, branch, totalPrice} = req.body;


        const customerData = await Customer.findById(userId)
        const branchData = await Branch.findById(branch);



        if(!customerData || !branchData){
            return reply.status(404).send({message : "User or Branch not found"});
        }

        if (!customerData.livelocation || !customerData.livelocation.latitude || !customerData.livelocation.longitude) {
    return reply.status(400).send({ message: "Customer live location is missing or incomplete" });
}


        const newOrder = new Order({
            customer:userId,
            items:items.map((item) => ({
                id:item.id,
                item:item.item,
                count:item.count,
            })),
            branch,
            totalPrice,
            deliveryLocation:{
                latitude: customerData.livelocation.latitude,
                longitude: customerData.livelocation.longitude,
                address: customerData.address || "No address available",
            },
            pickupLocation: {
                latitude: branchData.location.latitude,
                longitude: branchData.location.longitude,
                address: branchData.address,
            },
        });

       let savedOrder = await newOrder.save();

       savedOrder = await savedOrder.populate([
        {path:"items.item"},
        
       ])
       console.log("Saved Order:", savedOrder);
       return reply.status(201).send(savedOrder);
    }
    catch(error){
        console.log(error)
        return reply.status(500).send({message : "Something went wrong", error});
    }
}

export const comfirmOrder = async (req, reply) => {
    try{
        const {orderId} = req.params;
        const {userId} = req.user;
        const {deliveryPersonLocation} = req.body;

        const deliveryPerson = await DeliveryPartner.findById(userId);

        if(!deliveryPerson){
            return reply.status(404).send({message : "Delivery person not found"});
        }
        const order = await Order.findById(orderId);
        if(!order){
            return reply.status(404).send({message : "Order not found"});
        }
       
        if(order.status !== "available"){
            return reply.status(400).send({message : "Order is not available"});
        }
        order.status = "confirmed";

        order.deliveryPartner = userId;
        order.deliveryPersonLocation = {
            latitude: deliveryPersonLocation.latitude,
            longitude: deliveryPersonLocation.longitude,
            address: deliveryPersonLocation?.address || "No address available",
        };

        req.server.io.to(orderId).emit("orderConfirmed", order);
        await order.save();


        return reply.send(order);
    }

    catch(error){
       
        return reply.status(500).send({message : "Something went wrong", error});

    }
}

export const updateOrderStatus = async (req, reply) => {
    try{
        const {orderId} = req.params;
        const {status, deliveryPersonLocation} = req.body;
        const {userId} = req.user;
        const deliveryPerson = await DeliveryPartner.findById(userId);
        if(!deliveryPerson){
            return reply.status(404).send({message : "Delivery person not found"});
        }

        const order = await Order.findById(orderId);
        if(!order){
            return reply.status(404).send({message : "Order not found"});
        }

        if(["cancelled", "delivered"].includes(order.status)){
            return reply.status(400).send({message : "Order cannot be updated"});
        }
        if(order.deliveryPartner.toString() !== userId){
            return reply.status(403).send({message : "Unauthorized"});
        }
        order.status = status;
        order.deliveryPersonLocation = deliveryPersonLocation;
        await order.save();

        req.server.io.to(orderId).emit("liveTrackingUpdates", order);
        return reply.send(order);
}
catch(error){
    return reply.status(500).send({message : "Something went wrong", error});
}
}

export const getOrders = async (req, reply) => {
    try{
        const{status, customerId, deliveryPartnerId, branchId} = req.query;
        let query = {};

        if (branchId) {
  query.branch = branchId;
}
        if(status){
            query.status = status;
        }

        if(deliveryPartnerId){
            query.deliveryPartner = deliveryPartnerId;
        }
        if(customerId){
            query.customer = customerId;
        }
        
        console.log("Fetching orders with query:", query);

        const orders = await Order.find(query).populate("customer branch items.item deliveryPartner");

        return reply.send(orders);
    }
    catch(error){
        return reply.status(500).send({message : "Failed to retrieve orders", error});
    }
}

export const getOrderById = async (req, reply) => {
    try{
        const {orderId} = req.params;
        const order = await Order.findById(orderId).populate("customer branch items.item deliveryPartner");

        if(!order){
            return reply.status(404).send({message : "Order not found"});
        }
        
    return reply.send(order);
    }
    catch(error){

        return reply.status(500).send({message : "Failed to retrieve order", error});
    }
}