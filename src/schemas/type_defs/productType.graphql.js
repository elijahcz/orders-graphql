const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt, GraphQLID } = require('graphql');

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: {
        id: { type: GraphQLID },
        brand: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        discountPercetage: { type: GraphQLFloat },
        images: { type: new GraphQLList(ImageType) },
        price: { type: graphQLFloat },
        rating: { type: graphQLFloat },
        stock: { type: GraphQLInt },
        thumbnail: { type: graphQLFloat },
        title: { type: graphQLFloat },
    }
});

module.exports = {
    ProductType
};