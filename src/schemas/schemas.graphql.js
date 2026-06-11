const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt, GraphQLID, GraphQLBoolean, GraphQLSchema, parseSchemaCoordinate } = require('graphql');

// const { Product } = require("../models/products.mongoose");
// const { Order } = require("../models/orders.mongoose");
const { User } = require("../models/user.mongoose");

const { ProductType } = require("../schemas/type_defs/productType.graphql");
const { OrderType } = require("../schemas/type_defs/orderType.graphql");
const { UserType } = require("../schemas/type_defs/userType.graphql");

const { getAllProductsResolver, getProductResolver,
        createProductResolver, updateProductResolver, deleteProductResolver } = require("./resolvers/productType.resolvers.graphql");

const { getAllOrdersResolver, getOrdersByUserIdResolver } = require("../schemas/resolvers/orderType.resolvers");

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getAllProducts: {
            type: new GraphQLList(ProductType),
            args: {id: { type: GraphQLString }},
            resolve: getAllProductsResolver
        },
        getProduct: {
            type: ProductType,
            args: {id: { type: GraphQLString }},
            resolve: getProductResolver
        },
        getAllOrders: {
            type: new GraphQLList(OrderType),
            args: {id: { type: GraphQLString }},
            resolve: getAllOrdersResolver
        },
        getOrderByUserId: {
            type: OrderType,
            args: {id: { type: GraphQLString }},
            resolve: getOrdersByUserIdResolver
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createProduct: {
            type: ProductType,
            args: {
                brand: { type: GraphQLString },
                category: { type: GraphQLString },
                description: { type: GraphQLString },
                discountPercentage: { type: GraphQLFloat },
                images: { type: GraphQLString },
                price: { type: GraphQLFloat },
                rating: { type: GraphQLFloat },
                stock: { type: GraphQLInt },
                thumbnail: { type: GraphQLString },
                title: { type: GraphQLString },
            },
            resolve: createProductResolver,
        },
        updateProduct: {
            type: ProductType,
            args: {
                id: { type: GraphQLID },
                brand: { type: GraphQLString },
                category: { type: GraphQLString },
                description: { type: GraphQLString },
                discountPercetage: { type: GraphQLFloat },
                images: { type: GraphQLString },
                price: { type: GraphQLFloat },
                rating: { type: GraphQLFloat },
                stock: { type: GraphQLInt },
                thumbnail: { type: GraphQLString },
                title: { type: GraphQLString },
            },
            resolve: updateProductResolver,
        },
        deleteProduct: {
            type: ProductType,
            args: { id: { type: GraphQLID }},
            resolve: deleteProductResolver,
        },
    },
});

const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = graphQLSchema;