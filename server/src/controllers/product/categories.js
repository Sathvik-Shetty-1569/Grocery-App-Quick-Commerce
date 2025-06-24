import Category from "../../models/category.js";

export const getAllCategories = async (req, reply) => {
  try {
    const categories = await Category.find();
    return reply.send(categories);
    reply.status(200).json(categories);
  } catch (error) {
    return reply.status(500).send({ message: "Something went wrong", error });
}
}