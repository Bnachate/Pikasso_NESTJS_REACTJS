import { Module } from '@nestjs/common';
import { CommentaryController } from './commentary.controller';
import { CommentaryService } from './commentary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentarySchema } from './schemas/commentary.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Commentary', schema: CommentarySchema }],'commentary' )
  ],
  controllers: [CommentaryController],
  providers: [CommentaryService]
})
export class CommentaryModule {}