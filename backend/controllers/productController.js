import Product from '../models/product.model.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export async function getAllProducts(req, res) {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Create product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
export async function createProduct(req, res) {
    try {
        const { name, price, description, category, stock, image } = req.body;

        const product = await Product.create({
            name,
            price,
            description,
            category,
            stock,
            image
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Update product (Admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
export async function updateProduct(req, res) {
    try {
        const { name, price, description, category, stock, image } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.category = category || product.category;
            product.stock = stock !== undefined ? stock : product.stock;
            product.image = image || product.image;

            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete product (Admin only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export async function deleteProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
export async function getProductsByCategory(req, res) {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Search products
// @route   GET /api/products/search?query=keyword
// @access  Public
export async function searchProducts(req, res) {
    try {
        const keyword = req.query.query
            ? {
                name: {
                    $regex: req.query.query,
                    $options: 'i'
                }
            }
            : {};

        const products = await Product.find({ ...keyword });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
