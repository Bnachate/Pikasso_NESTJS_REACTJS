import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Selection } from './selection.model';




@Injectable()
export class SelectionsService {

  constructor(@InjectModel('Selection') private selectionModel: Model<Selection>,
  ) {}



  async getSelections(){
    const selection = await this.selectionModel.find().exec();
    return selection
  }


  async addSelectionToDB(selection){
    let oldSelection = await this.selectionModel.find().exec()
    // console.log(oldSelection)
    
    if(oldSelection[0]){
      oldSelection[0].selection = selection
      oldSelection[0].save()
    }
    
    else{
      let freshSelection = new this.selectionModel({selection})
      freshSelection.save()
    }
    
   
  }
 

 

} 


