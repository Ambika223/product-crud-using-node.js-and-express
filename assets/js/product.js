const cl = console.log;
const product = [
    {
        "id": "1",
        "title": "iPhone 15",
        "description": "Apple iPhone 15 with 128GB storage",
        "category": "Electronics",
        "brand": "Apple",
        "price": 69999,
        "stock": 15,
        "isAvailable": true
    },
    {
        "id": "2",
        "title": "Samsung Galaxy S24",
        "description": "Samsung smartphone with 256GB storage",
        "category": "Electronics",
        "brand": "Samsung",
        "price": 74999,
        "stock": 20,
        "isAvailable": true
    },
    {
        "id": "3",
        "title": "HP Pavilion Laptop",
        "description": "HP laptop with Intel Core i5 and 16GB RAM",
        "category": "Computers",
        "brand": "HP",
        "price": 58999,
        "stock": 10,
        "isAvailable": true
    },
    {
        "id": "4",
        "title": "Sony WH-1000XM5",
        "description": "Wireless noise cancelling headphones",
        "category": "Accessories",
        "brand": "Sony",
        "price": 29999,
        "stock": 8,
        "isAvailable": true
    },
    {
        "id": "5",
        "title": "Nike Air Max",
        "description": "Comfortable running shoes for everyday use",
        "category": "Footwear",
        "brand": "Nike",
        "price": 8999,
        "stock": 25,
        "isAvailable": true
    },
    {
        "id": "6",
        "title": "Dell Inspiron 15",
        "description": "Dell laptop with Intel Core i7 and 512GB SSD",
        "category": "Computers",
        "brand": "Dell",
        "price": 67999,
        "stock": 12,
        "isAvailable": true
    },
    {
        "id": "7",
        "title": "Boat Rockerz 450",
        "description": "Wireless Bluetooth headphones",
        "category": "Accessories",
        "brand": "Boat",
        "price": 1499,
        "stock": 40,
        "isAvailable": true
    },
    {
        "id": "8",
        "title": "Adidas Sports T-Shirt",
        "description": "Comfortable sportswear T-shirt",
        "category": "Clothing",
        "brand": "Adidas",
        "price": 1999,
        "stock": 30,
        "isAvailable": true
    },
    {
        "id": "9",
        "title": "Apple Watch Series 9",
        "description": "Smartwatch with fitness and health tracking",
        "category": "Wearables",
        "brand": "Apple",
        "price": 41999,
        "stock": 0,
        "isAvailable": false
    },
    {
        "id": "10",
        "title": "Logitech MX Master 3S",
        "description": "Wireless ergonomic mouse",
        "category": "Accessories",
        "brand": "Logitech",
        "price": 9999,
        "stock": 18,
        "isAvailable": true
    }
]


const express = require('express');
const app = express();
app.use(express.json());
//GET ALL
app.get('/api/product', (req, res) => {
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
})


//single get
app.get('/api/product/:id', (req, res) => {
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
})



//CREATE
app.post('/api/product', (req, res) => {
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
})



//UPDATE
app.patch('/api/product/:id', (req, res) => {
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

})
//DELETE
app.delete('/api/product/:id', (req, res) => {
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
})
app.listen(3000, () => {
    cl(`Product is Available on the port`)
})