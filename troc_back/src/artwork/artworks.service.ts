import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Artwork } from './artwork.model';

// import { SelectionsService } from '../selection/selections.service'

@Injectable()
export class ArtworksService {

  constructor(@InjectModel('Artwork') 
  private artworkModel: Model<Artwork>,
  
  ) {}

  async addSomeArtworkToDb(artworkImage, artworkPrice, artworkType, artworkTitle, artworkDescription, artworkSeller){
    const newArtwork = new this.artworkModel({
      image: artworkImage,
      price: artworkPrice,
      type: artworkType,
      title: artworkTitle,
      description: artworkDescription,
      seller: artworkSeller
    })
    const result = await newArtwork.save()
    return result
  }

  async updateArtwork(artworkID, artworkImage, artworkPrice, artworkType, artworkTitle, artworkDescription, artworkSeller) {
    const findArtwork = await this.artworkModel.find({'_id':artworkID});
    const updatedArtwork=findArtwork[0]
    // console.log(updatedArtwork)
    if (artworkImage) {
      updatedArtwork.image = artworkImage;
    }
    if (artworkPrice) {
      updatedArtwork.price = artworkPrice;
      /* console.log(updatedArtwork.price) */
    }
    if (artworkType) {
      updatedArtwork.type = artworkType;
    }
    if  (artworkTitle) {
      updatedArtwork.title = artworkTitle;
    }
    if(artworkDescription){
      updatedArtwork.description = artworkDescription;
    }
    if (artworkSeller) {
      updatedArtwork.seller = artworkSeller;
    }
    
    updatedArtwork.save();
    return updatedArtwork
  
  }

  async getArtworks(){
    const artworks = await this.artworkModel.find().exec();
    return artworks
  }

async getSingleArtwork(artworkId:string){
    const artwork = await this.findArtwork(artworkId)
    /* console.log(artwork) */
    return { 
      id: artwork.id,
      image: artwork.image,
      price: artwork.price, 
      type:artwork.type, 
      title: artwork.title,
      description: artwork.description,
      seller: artwork.seller,
      created_at: artwork.created_at,
    }
  
  }

    async findArtwork(artworkId: string): Promise<Artwork> {
    let artwork;
    try{
      artwork = await this.artworkModel.findById(artworkId);
    } catch (error) {
      throw new NotFoundException('Could not find this artwork.');
    }
    if (!artwork) {
      throw new NotFoundException('Could not find this artwork.');
    }
    return artwork;
  }

  async pickARdmSelection(){
    
    const selection = await this.artworkModel.find()
   
    let randomSelection = []
    let result = []
   
      do{
        let index = Math.floor(Math.random() * selection.length)
        randomSelection.length == 0 ? randomSelection.push(index) && result.push(selection[index])
        : randomSelection.includes(index) ? null
        : randomSelection.push(index) && result.push(selection[index])
      }
      while(randomSelection.length < 6)
    
     return result
  }

  async getInfosArtworks(artworks) {

    let infos=[];
    let promises=artworks.map(element => {
       return this.artworkModel.find({"_id":element})
        .then((response)=>{
          return response
        })
    })
    await Promise.all(promises)
    .then((response)=>{
      infos.push(response)
    })
    return infos[0]
  }

  async deleteArtworks(artworkID){
    const response = await this.artworkModel.deleteOne({"_id":artworkID}).exec()
    
    return response
  }

} 


