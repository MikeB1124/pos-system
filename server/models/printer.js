import mongoose from "mongoose";

const Schema = mongoose.Schema;

const printerSchema = new Schema({
    groupID: Number,
    printerID: Number,
    printerName: String,
    ssID: String,
    ipAddress: String,
    storeLocation: String,
}, {timestamps: true});

const Printer = mongoose.model('Printer', printerSchema);
export default Printer;