import { SchemaType } from "mongoose";

export class CreateMessageDTO {
    readonly from: String;
    readonly to: String;
    readonly sender: Boolean;
    readonly new: Boolean;
    readonly title: String;
    readonly body: String;
    readonly offer: Boolean;
    readonly price: Number;
    readonly accept: Boolean;
    readonly product: String;
    readonly hasResponse: Boolean;
    readonly created_at: Date;
}