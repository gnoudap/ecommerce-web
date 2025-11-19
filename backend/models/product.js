import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
