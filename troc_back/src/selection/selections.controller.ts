import {
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule'


import { ArtworksService } from '../artwork/artworks.service'

import { SelectionsService } from './selections.service';


@Controller('selections')
export class SelectionsController {
  constructor(
    private readonly selectionsService: SelectionsService,
    private readonly artworksService: ArtworksService,
  ) { }

  @Get()
  async getSelection() {
    const result = await this.selectionsService.getSelections()
    return result
  }

//    @Cron('*/3 * * * *') 
  async handleSelection() {
    console.log('cron')
    const selection = await this.artworksService.pickARdmSelection()
    this.selectionsService.addSelectionToDB(selection)
  }
}