import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtworksController } from './artworks.controller';
import { ArtworksService } from './artworks.service';
import { ArtworkSchema } from './artwork.model';
import { UsersService } from '../users/users.service';
import { UserSchema } from '../users/user.model';




@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Artwork', schema: ArtworkSchema}], 'artwork'),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}], 'user')],
  controllers: [ArtworksController],
  providers: [ArtworksService, UsersService],
})
export class ArtworksModule {}