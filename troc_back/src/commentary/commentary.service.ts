import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Commentary } from './interfaces/commentary.interface';
import { CreateCommentaryDTO } from './dto/create-commentary.dto';

@Injectable()
export class CommentaryService {
    
    constructor(@InjectModel('Commentary') private readonly commentaryModel: Model<Commentary>) { }
    // fetch all comments
    async getAllComments(): Promise<Commentary[]> {
        const comments = await this.commentaryModel.find().exec();
        return comments;
    }
    // Get a single comment

     async getComment(commentID): Promise<Commentary> {
         const comment = await this.commentaryModel.findById(commentID).exec();
         console.log(comment);
         return comment;
     }

    // post a single comment
    async addComment(createCommentDTO: CreateCommentaryDTO): Promise<Commentary> {
        const newComment = await new this.commentaryModel(createCommentDTO);
        return newComment.save();
    }

    // Edit comment details
    async updateComment(commentID, createCommentDTO: CreateCommentaryDTO): Promise<Commentary> {
        const updatedComment = await this.commentaryModel.findByIdAndUpdate(commentID, createCommentDTO, { new: true });
        return updatedComment;
    }
    
    //Delete a comment
    async deleteComment(commentID): Promise<any> {
        const deletedComment = await this.commentaryModel.findByIdAndRemove(commentID);
        return deletedComment;
    }
}