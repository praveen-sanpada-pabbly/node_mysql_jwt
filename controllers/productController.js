
const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    try {
        const { title, description, inventoryCount } = req.body;

        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden. Only admin can create products' });
        }

        const newProduct = await Product.create({ title, description, inventoryCount });
        return res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        // Check if user is admin or manager
        if (req.user.role !== 'admin' && req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Forbidden. Only admin or manager can get products' });
        }

        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getProduct = async (req, res) => {
    try {
        // Check if user is admin or manager
        if (req.user.role !== 'admin' && req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Forbidden. Only admin or manager can get products' });
        }

        const productId = req.params.id;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { title, description, inventoryCount } = req.body;

        // Check if user is admin or manager
        if (req.user.role !== 'admin' && req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Forbidden. Only admin or manager can update products' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.title = title;
        product.description = description;
        product.inventoryCount = inventoryCount;

        await product.save();

        return res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden. Only admin can delete products' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();

        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
