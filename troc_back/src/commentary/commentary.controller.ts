import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CreateCommentaryDTO } from './dto/create-commentary.dto';

@Controller('comment')
export class CommentaryController {
    constructor(private commentaryService: CommentaryService) { }

    // add a user
    @Post('/create')
    async addComment(@Res() res, @Body() createCommentDTO: CreateCommentaryDTO) {
        const comment = await this.commentaryService.addComment(createCommentDTO);
        return res.status(HttpStatus.OK).json({
            message: "Comment has been created successfully",
            comment
        })
    }

    // Retrieve comments list
    @Get('/comments')
    async getAllComments(@Res() res) {
        const comments = await this.commentaryService.getAllComments();
        return res.status(HttpStatus.OK).json(comments);
    }

    // Fetch a particular comment using ID

     @Get('/:commentID')
     async getComment(@Res() res, @Param('commentID') commentID) {
        const comment = await this.commentaryService.getComment(commentID);
         if (!comment) throw new NotFoundException('Comment does not exist!');
         return res.status(HttpStatus.OK).json(comment);
     }

    // Update a comment 
    @Put('/update')
    async updateComment(@Res() res, @Query('commentID') commentID, @Body() createCommentDTO: CreateCommentaryDTO) {
        const comment = await this.commentaryService.updateComment(commentID, createCommentDTO);
        if (!comment) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Comment has been successfully updated',
            comment
        });
    }

    // Delete a comment
     @Delete('/delete')
     async deleteComment(@Res() res, @Query('commentID') commentID) {
        console.log(commentID);
         const comment = await this.commentaryService.deleteComment(commentID);
         if (!comment) throw new NotFoundException('Comment does not exist');
         return res.status(HttpStatus.OK).json({
             message: 'Comment has been deleted',
             comment
         })
     }
}