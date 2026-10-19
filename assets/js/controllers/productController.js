const product = require("../data/productArr");
//GET ALL
const getProducts = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: `Product fetched successfully`,
            data: product
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while fetching product`
        })
    }
}


//single get
const getSingleProduct = (req, res) => {
    try {
        let product_id = req.params.id;
        let singleproduct = product.find(p => p.id === product_id);
        if (!singleproduct) {
            return res.status(404).json({
                success: false,
                message: `Product with ID ${product_id} is not found`
            })
        }
        res.status(200).json({
            success: true,
            message: `Product is fetched successfully`,
            data: singleproduct
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while fetching on server`,
            error: err.message
        })
    }
}



//CREATE
const createProducts = (req, res) => {
    try {
        let body = req.body;
        if (!body.title || !body.description || !body.category) {
            return res.status(400).json({
                success: false,
                message: `Something went wrong while authorising product`
            })
        }
        let product_obj = {
            title: body.title,
            description: body.description,
            category: body.category,
            brand: body.brand,
            price: body.price,
            stock: body.stock,
            isAvailable: body.isAvailable ? true : false,
            id: Date.now().toString()
        }
        product.unshift(product_obj);
        res.status(201).json({
            success: true,
            message: `product is created successfully`,
            data: product_obj
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while creating product`
        })

    }
}



//UPDATE
const updateProducts = (req, res) => {
    try {
        let update_id = req.params.id;
        let index = product.findIndex(p => p.id === update_id);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `while updating product not found`,
            })
        }
        let updated_obj = {
            ...product[index],
            ...req.body,
            id: update_id
        }
        product[index] = updated_obj;
        res.status(200).json({
            success: true,
            data: updated_obj,
            message: `Product with ${update_id} updated successfully`
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while updating product`,
            error: err.message
        })

    }

}
//DELETE
const deleteProducts = (req, res) => {
    try {
        let remove_id = req.params.id;
        let index = product.findIndex(p => p.id === remove_id);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Product is not found`
            })
        }
        let obj = product.splice(index, 1);
        res.status(200).json({
            success: true,
            message: `Product with id ${remove_id} removed successfully`,
            data: obj[0]
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while removing product on server side`,
            error: err.message,
        })

    }
}

module.exports = {
    getProducts,
    getSingleProduct,
    createProducts,
    updateProducts,
    deleteProducts
}