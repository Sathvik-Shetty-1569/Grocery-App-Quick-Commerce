import {
    comfirmOrder,
    createOrder,
    getOrderById,
    getOrders,
    updateOrderStatus,
} from "../controllers/order/order.js";
import { verifyToken } from "../middleware/auth.js";

export const orderRoutes = async (fastify, options) => {
    fastify.addHook("preHandler", async (request, reply) => {;
    const isAuthenticated = await verifyToken(request, reply);
    if(!isAuthenticated){
         return reply.code(401).send({ message: "Unauthorized" });
        }
    });
    fastify.post("/order", createOrder);
    fastify.get("/order", getOrders);
    fastify.get("/order/:orderId/status", updateOrderStatus);
    fastify.patch("/order/:orderId/comfirm", comfirmOrder);
    fastify.patch("/order/:orderId", getOrderById);
};