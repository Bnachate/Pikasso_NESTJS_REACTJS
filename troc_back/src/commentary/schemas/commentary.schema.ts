import * as mongoose from 'mongoose';

export const CommentarySchema = new mongoose.Schema({
    commentary: String,
    user_id: [String],
    user_name: [String],
    product_id: [String],
    artist_id:[String],
    created_at: { type: Date, default: Date.now }
})

