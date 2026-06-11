const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLID } = graphql;

const { Order } = require("../../models/orders.mongoose");

async function getAllOrdersResolver(parent, args, req) {
    const ordersList = await Order.find();
    
    return ordersList;
}

async function getOrdersByUserIdResolver(parent, args, req) {
    if(!req.isAuth) {
        throw new Eror("Unauthenticated");
    }
    const order = await Order.findById(args.userId);
    
    return order;
}

module.exports = {
    getAllOrdersResolver,
    getOrdersByUserIdResolver
};