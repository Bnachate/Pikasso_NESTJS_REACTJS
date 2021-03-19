import * as mongoose from 'mongoose';




export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    admin: { type: String, default: 'false' },
    favorites: { type: Array, default: [] },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String },
    seller: { type: Boolean },
    age: { type: Number },
    follow: { type: Array, default: [] },
    followers: { type: Array, default: [] },
    cart: { type: Array, default: [] },
    adress: { type: String },
    zip_code: { type: Number },
    city: { type: String },
    description: { type: String },
    products: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    created_at: { type: Date, default: Date.now }
});


export interface User extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    avatar: string
    admin: string;
    favorites: [];
    firstname: string;
    lastname: string;
    gender: string;
    seller: boolean;
    age: number;
    follow: [];
    followers: [];
    adress: string;
    zip_code: number;
    city: string;
    description: string;
    products: [];
    comments: [];
    cart: [];
    created_at: Date;

}