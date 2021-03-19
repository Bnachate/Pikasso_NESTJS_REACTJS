import * as mongoose from 'mongoose';




export const ArtworkSchema = new mongoose.Schema({
    image: { type: String, required:true},
    price: { type: Number, required:true},
    type: { type: String, required:true},
    title: { type: String, required:true},
    description: { type: String, required:true},
    seller:{type:Array},
    created_at:{type:Date, default:Date.now}
    
});


export interface Artwork extends mongoose.Document{
    image: string;
    price: number;
    type: string; 
    title: string;
    description: string;
    seller: [];
    created_at: Date;
}