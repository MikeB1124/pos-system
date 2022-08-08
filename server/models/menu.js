import mongoose from "mongoose";

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    groupId: Number,
    menuId: String,
    meal: String,
    title: String,
    description: String,
    addOn: [{
        type: String
    }],
    price: Number,
}, {timestamps: true});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;