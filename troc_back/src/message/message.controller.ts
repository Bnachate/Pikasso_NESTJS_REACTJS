import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDTO } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) { }

    // add a user
    @Post('/create')
    async addMessage(@Res() res, @Body() createMessageDTO: CreateMessageDTO) {
        const message = await this.messageService.addMessage(createMessageDTO);
        return res.status(HttpStatus.OK).json({
            message
        })
    }

    // Retrieve users list
    @Get('messages')
    async getAllMessages(@Res() res) {
        const messages = await this.messageService.getAllMessages();
        return res.status(HttpStatus.OK).json(messages);
    }

    // Fetch a particular user using ID
    @Get(':messageID')
    async getMessage(@Res() res, @Param('messageID') messageID) {
        const message = await this.messageService.getMessage(messageID);
        if (!message) throw new NotFoundException('Message does not exist!');
        return res.status(HttpStatus.OK).json(message);
    }
    // Update a user's details
    @Put('/update')
    async updateMessage(@Res() res, @Query('messageID') messageID, @Body() createMessageDTO: CreateMessageDTO) {
        const message = await this.messageService.updateMessage(messageID, createMessageDTO);
        if (!message) throw new NotFoundException('Message does not exist!');
        return res.status(HttpStatus.OK).json({
            message
        });
    }

    // Delete a user
    @Delete('/delete')
    async deleteMessage(@Res() res, @Query('messageID') messageID) {
        const message = await this.messageService.deleteMessage(messageID);
        if (!message) throw new NotFoundException('Message does not exist');
        return res.status(HttpStatus.OK).json({
            message
        })
    }

}