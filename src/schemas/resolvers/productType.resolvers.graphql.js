const { Product } = require("../../models/products.mongoose");

async function getAllProductsResolver(parent, args, req) {
    const productsList = await Product.find();
    return productsList;
}

async function getProductResolver(parent, args, req) {
    const product = await Product.findById(args.id);
    return product;
}

async function createProductResolver(parent, args, req) {
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
}

async function updateProductResolver(parent, args, req) {
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

async function deleteProductResolver(parent, args, req) {
    const deleteProduct = await Product.findByIdAndDelete(args.id);

    return deleteProduct;
}


module.exports = {
    getAllProductsResolver,
    getProductResolver,
    createProductResolver,
    updateProductResolver,
    deleteProductResolver
}