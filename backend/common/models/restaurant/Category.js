import { mongoose } from "mongoose";
import bcryptjs from "bcryptjs";
// Define the user schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    }
});


const Category = mongoose.model('Category', categorySchema);

export default Category;