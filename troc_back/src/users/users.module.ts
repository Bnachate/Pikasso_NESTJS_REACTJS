import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ArtworksService } from '../artwork/artworks.service';
import { UserSchema } from './user.model';
import { ArtworkSchema } from '../artwork/artwork.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }], 'user'),
    MongooseModule.forFeature([{ name: 'Artwork', schema: ArtworkSchema }], 'artwork')],
  controllers: [UsersController],
  providers: [UsersService, ArtworksService],
})
export class UsersModule { }