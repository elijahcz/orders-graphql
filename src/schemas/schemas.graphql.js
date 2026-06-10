const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt, GraphQLID, GraphQLBoolean, GraphQLSchema } = require('graphql');

const { Product } = require("../models/products.mongoose");
const { Order } = require("../models/orders.mongoose");
const { User } = require("../models/user.mongoose");

const { ProductType } = require("../schemas/type_defs/productType.graphql");
const { OrderType } = require("../schemas/type_defs/orderType.graphql");
const { UserType } = require("../schemas/type_defs/userType.graphql");

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getAllProducts: {
            type: new GraphQLList(ProductType),
            args: {id: { type: GraphQLString }},
            async resolve(parent, args) {
                const productsList = await Product.find();
                return productsList;
            }
        },
        getProduct: {
            type: ProductType,
            args: {id: { type: GraphQLString }},
            async resolve(parent, args) {
                const product = await Product.findById(args.id);
                return product;
            }
        },
        getAllOrders: {
            type: new GraphQLList(OrderType),
            args: {id: { type: GraphQLString }},
            async resolve(parent, args) {
                const ordersList = await Order.findById();
                return ordersList;
            }
        },
        getOrderByUserId: {
            type: OrderType,
            args: {id: { type: GraphQLString }},
            async resolve(parent, args, req) {
                if(!req.isAuth) {
                    throw new Eror("Unauthenticated");
                }
                const order = await Order.findById(args.userId);
                return order;
            }
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
            async resolve(parent, args, req) {
                const newProduct = new Product({
                    title: args.title,
                    brand: args.brand,
                    category: args.category,
                    description: args.description,
                    discountPercentage: args.discountPercentage,
                    images: args.images,
                    price: args.price,
                    rating: args.rating,
                    stock: args.stock,
                    thumbnail: args.thumbnail
                });
                
                await newProduct.save();

                return newProduct;
            },
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
            async resolve(parent, args, req) {
                const newProduct = await Product.findByIdAndUpdate(args.id, {
                    brand: args.brand,
                    category: args.category,
                    description: args.description,
                    discountPercentage: args.discountPercentage,
                    images: args.images,
                    price: args.price,
                    rating: args.rating,
                    stock: args.stock,
                    thumbnail: args.thumbnail,
                    title: args.title,
                });

                return newProduct;
            }
        },
        deleteProduct: {
            type: ProductType,
            args: { id: { type: GraphQLID }},
            async resolve(parent, args, req) {
                const deleteProduct = await Product.findByIdAndDelete(args.id);

                return deleteProduct;
            }
        },
    },
});

const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = graphQLSchema;