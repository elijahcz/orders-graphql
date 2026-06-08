const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt } = require('graphql');
const { ProductType } = require('./productType.graphql');

const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: {
        id: { type: GraphQLString },
        userId: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        zipCode: { type: GraphQLString },
        totalAmount: { type: GraphQLFloat },
        items: { type: new GraphQLList(ProductType) },
        createdDate: { type: GraphQLString }
    }
});

module.exports = { OrderType }