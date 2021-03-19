import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  
} from '@nestjs/common';

import { ArtworksService } from './artworks.service';
import { UsersService } from '../users/users.service';


@Controller('artworks')
export class ArtworksController {
  constructor(
    private readonly artworksService: ArtworksService,
    private readonly usersService: UsersService) {}

    @Post()
    async addArtwork( 
    @Body('image') artworkImage: string,
    @Body('price') artworkPrice: number,
    @Body('type') artworkType: string,
    @Body('title') artworkTitle: string,
    @Body('description') artworkDescription: string,
    @Body('seller') artworkSeller: Object,
  
    ){
      const result = await this.artworksService.addSomeArtworkToDb(
        artworkImage, artworkPrice, artworkType, artworkTitle, artworkDescription, artworkSeller
      )
      const artworkID=result._id
      const artworks =await this.usersService.addToMyArtworks(artworkSeller, artworkID)
      const infoArtworks=await this.artworksService.getInfosArtworks(artworks)

      return infoArtworks
    }

    @Get()
    async  getAllArtworks(){
      const result = await this.artworksService.getArtworks()
      return result
    }

    @Get(':id')
    async getArtwork(@Param('id') artworkId:string){
    return {artwork : await this.artworksService.getSingleArtwork(artworkId)}
  }
  

 @Patch(':id')
  async updateArtwork(
    @Param('id') artworkID: string,
    @Body('image') artworkImage: string,
    @Body('price') artworkPrice: number,
    @Body('type') artworkType: string,
    @Body('title') artworkTitle: String,
    @Body('description') artworkDescription: string,
    @Body('seller') artworkSeller: string,

   
  ) {
    return await this.artworksService.updateArtwork(artworkID, artworkImage, artworkPrice, artworkType, artworkTitle, artworkDescription, artworkSeller);
    // console.log(admin) ;
  }
  @Delete(':id')
  async removeProduct(@Param('id') productId: string) {
      console.log("hey man no cry : ", productId);
      const response = await this.artworksService.deleteArtworks(productId);
       await this.usersService.deleteFavoritesProducts(productId); 
      await this.usersService.deleteProducts(productId); 
      
      return response;
        
    };

}

