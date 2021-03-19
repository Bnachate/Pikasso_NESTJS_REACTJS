import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ArtworksModule } from './artwork/artworks.module';
import { MessageModule } from './message/message.module';
import { CommentaryModule } from './commentary/commentary.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SelectionsModule } from './selection/selections.module';



@Module({
  imports: [
    HttpModule,
    UsersModule,
    ArtworksModule,
    CommentaryModule,
    MessageModule,
    SelectionsModule,
    ScheduleModule.forRoot(),


    MongooseModule.forRoot('mongodb+srv://Leif:Sf5k967mkFkZAUz0@cluster0.7rb5b.mongodb.net/userDB?retryWrites=true&w=majority',
      {
        connectionName: 'user',
      }),
    MongooseModule.forRoot('mongodb+srv://Leif:Sf5k967mkFkZAUz0@cluster0.7rb5b.mongodb.net/selection?retryWrites=true&w=majority',
      {
        connectionName: 'selection',
      }),

    MongooseModule.forRoot('mongodb+srv://Leif:Sf5k967mkFkZAUz0@cluster0.7rb5b.mongodb.net/artwork?retryWrites=true&w=majority',
      {
        connectionName: 'artwork',
      }),
    MongooseModule.forRoot('mongodb+srv://Leif:Sf5k967mkFkZAUz0@cluster0.7rb5b.mongodb.net/comment?retryWrites=true&w=majority',
      {
        connectionName: 'commentary',
      }),
    MongooseModule.forRoot('mongodb+srv://Leif:Sf5k967mkFkZAUz0@cluster0.7rb5b.mongodb.net/message?retryWrites=true&w=majority',
      {
        connectionName: 'message',
      }),



  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }



