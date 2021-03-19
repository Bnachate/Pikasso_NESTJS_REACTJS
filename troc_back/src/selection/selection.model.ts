import * as mongoose from 'mongoose';




export const SelectionSchema = new mongoose.Schema({
    selection :{}
    
});


export interface Selection extends mongoose.Document{
    selection :Object,
}