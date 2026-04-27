import Order from '../models/order.model.js';
import Product from '../models/product.model.js';

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
export async function getAllOrders(req, res) {
    try {
        const orders = await Order.find({})
            .populate('user', 'name email')
            .populate('items.product', 'name price');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export async function getOrderById(req, res) {
    try {
        const order = await Order.findById(req.params._id)
            .populate('user', 'name email')
            .populate('items.product', 'name price image');

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Create order
// @route   POST /api/orders
// @access  Private
export async function createOrder(req, res) {
    try {
        const { items, shippingAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        // Calculate total price
        let totalPrice = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product ${item.product} not found` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
            }
            totalPrice += product.price * item.quantity;
        }

        const order = await Order.create({
            user: req.user._id,
            items,
            totalPrice,
            shippingAddress
        });

        // Update product stock
        for (const item of items) {
            const product = await Product.findById(item.product);
            product.stock -= item.quantity;
            await product.save();
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private
export async function updateOrder(req, res) {
    try {
        const order = await Order.findById(req.params._id);

        if (order) {
            order.shippingAddress = req.body.shippingAddress || order.shippingAddress;
            
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete order (Admin only)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export async function deleteOrder(req, res) {
    try {
        const order = await Order.findById(req.params._id);

        if (order) {
            await order.deleteOne();
            res.status(200).json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
export async function getUserOrders(req, res) {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product', 'name price image');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export async function updateOrderStatus(req, res) {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params._id);

        if (order) {
            order.status = status;
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
