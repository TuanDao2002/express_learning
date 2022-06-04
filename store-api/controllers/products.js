const product = require("../models/product");
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
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

    if (numericFilters) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        };

        const regEx = /\b(>|>=|=|<|<=)\b/g; // a regex to find the operator symbols
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-` // replace the operator symbols with query syntax in MongoDB (add hyphens to split it in the next iteration)
        );
        const options = ["price", "rating"];
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-"); // split by hyphen and use array destructuring to get the field, operator and value
            if (options.includes(field)) {
                // create a query object to filter the values e.g. rating>30 ---> { rating: { '$gt': 30 } }
                queryObject[field] = { [operator]: Number(value) }; // in ES6, can set a variable as a key in an object by putting it in square bracket
            }
        });
    }

    let result = Product.find(queryObject); // filter by the request params
    if (sort) {
        // if there is sort param
        const sortList = sort.split(",").join(" "); // split it by comma and join them with spaces
        result = result.sort(sortList); // sort based on them, negative value will be descending, e.g. "-name" will sort by name descending
    } else {
        result = result.sort("createdAt"); // otherwise, sort by created time ascending
    }

    if (fields) {
        // select only some fields to be displayed
        const fieldsList = fields.split(",").join(" "); // split and join the same as sort param
        result = result.select(fieldsList);
    }

    // if no page index or limit that is greater than 0 is passed, the default values will be used
    const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 10;
    const skip = (page - 1) * limit; // calculate to find the results that belong to a page index (in this case, page index starts from 1)
    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
    getAllProductsStatic,
    getAllProducts,
};
