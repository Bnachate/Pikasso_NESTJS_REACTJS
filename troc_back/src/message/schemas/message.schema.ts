import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
    from: String,
    to: String,
    sender: Boolean,
    new: Boolean,
    title: String,
    body: String,
    offer: Boolean,
    price: Number,
    accept: Boolean,
    product: String,
    hasResponse: Boolean,
    created_at: { type: Date, default: Date.now() }
})