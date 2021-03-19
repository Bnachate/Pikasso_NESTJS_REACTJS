import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SelectionsController } from './selections.controller';
import { SelectionsService } from './selections.service';
import { SelectionSchema } from './selection.model';
import { ArtworksService } from '../artwork/artworks.service';
import { ArtworkSchema } from '../artwork/artwork.model';





@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Selection', schema: SelectionSchema}], 'selection'),
    MongooseModule.forFeature([{name: 'Artwork', schema: ArtworkSchema}], 'artwork'),

  ],
  controllers: [SelectionsController],
  providers: [SelectionsService, ArtworksService],
})
export class SelectionsModule {}