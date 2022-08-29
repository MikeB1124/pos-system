import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    role: String,
    name: String,
    email: String,
    username: String,
    password: String,
    groupID: Number,
    printers: [{
        type: String
    }],
    subscriptionType: String,
    subscriptionStatus: String,
    company: String,
    street: String,
    city: String,
    postalCode: String,
    state: String,
    phoneNumber: String,
    session_id: String,
    cancel_at_period_end: Boolean
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;


