import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './interfaces/message.interface';
import { CreateMessageDTO } from './dto/create-message.dto';

@Injectable()
export class MessageService {
    constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) { }
    // fetch all users
    async getAllMessages(): Promise<Message[]> {
        const messages = await this.messageModel.find().exec();
        return messages;
    }
    // Get a single customer
    async getMessage(messageID): Promise<Message> {
        const message = await this.messageModel.findById(messageID).exec();
        return message;
    }
    // post a single customer
    async addMessage(createMessageDTO: CreateMessageDTO): Promise<Message> {
        const newMessage = await new this.messageModel(createMessageDTO);
        return newMessage.save();
    }
    // Edit customer details
    async updateMessage(messageID, createMessageDTO: CreateMessageDTO): Promise<Message> {
        const updatedMessage = await this.messageModel.findByIdAndUpdate(messageID, createMessageDTO);
        return updatedMessage
    }
    // Delete a user
    async deleteMessage(messageID): Promise<any> {
        const deletedMessage = await this.messageModel.findByIdAndRemove(messageID);
        return deletedMessage;
    }
}