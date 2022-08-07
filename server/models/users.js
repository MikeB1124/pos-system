import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    role: String,
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    companyName: String,
    groupID: Number,
    printerIP: String,
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;