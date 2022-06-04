const product = require("../models/product");
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        // filter which products with name that contain the search string, the options is case-insensitive
        queryObject.name = { $regex: name, $options: "i" };
    }

    let result = Product.find(queryObject); // filter by the request params
    if (sort) { // if there is sort param
        const sortList = sort.split(',').join(' '); // split it by comma and join them with spaces
        result = result.sort(sortList); // sort based on them, negative value will be descending, e.g. -name will sort by name descending
    } else {
        result = result.sort('createdAt'); // otherwise, sort by created time ascending
    }

    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
    getAllProductsStatic,
    getAllProducts,
};
