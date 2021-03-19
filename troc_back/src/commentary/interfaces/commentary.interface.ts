import { Document } from 'mongoose';

export interface Commentary extends Document {
    readonly commentary: string;
    readonly user_id: string[];
    readonly user_name: String[];
    readonly product_id: string[];
    readonly artist_id:String[];
    readonly created_at: Date;
}