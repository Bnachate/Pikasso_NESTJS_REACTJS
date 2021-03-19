import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpStatus,
  NotFoundException,
  Res

} from '@nestjs/common';

const bcrypt = require('bcrypt');


import { UsersService } from './users.service';
import { ArtworksService } from '../artwork/artworks.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly artworksService: ArtworksService) { }

  @Post()
  async addUser(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('gender') gender: string,
    @Body('seller') seller: boolean,

  ) {
    const response = await this.usersService.insertUser(
      username,
      email,
      password,
      firstname,
      lastname,
      gender,
      seller

    );
    return response
  }


  @Post('login')
  async checkLogin(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    /* console.log(username, password) */
    let result
    const response = await this.usersService.getSingleUserByName(username)
    if (response.username) {
      /*  console.log('checking pw') */
      result = await bcrypt.compare(password, response.password)
    }
    if (result == false) {
      return "wrong password"
    }
    else {
      return {
        "id": response.id,
        "username": response.username,
        "admin": response.admin,
      }
    }
  }

  @Get()
  async getAllUsers() {
    return { users: await this.usersService.getUsers() };
  }



  // @Get(':userID')
  // async getUser(@Res() res, @Param('userID') userID) {
  //   const user = await this.usersService.getUser(userID);
  //   if (!user) throw new NotFoundException('User does not exist!');
  //   return res.status(HttpStatus.OK).json(user);
  // }
  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return { user: await this.usersService.getSingleUser(userId) };
  }



  @Put(':id')
  async updateUser(
    @Param('id') userID: string,
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('avatar') avatar: string,
    @Body('admin') admin: string,
    @Body('favorites') favorites: [],
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('gender') gender: string,
    @Body('seller') seller: boolean,
    @Body('age') age: number,
    @Body('followers') followers: [],
    @Body('adress') adress: string,
    @Body('zip_code') zip_code: number,
    @Body('city') city: string,
    @Body('description') description: string,
    @Body('products') products: [],
    @Body('comments') comments: [],
    @Body('cart') cart: []
  ) {
    await this.usersService.updateUser(userID, username, email, avatar, admin, favorites, firstname, lastname, gender, seller, age, followers, adress, zip_code, city, description, products, comments, cart);
    /* console.log(admin) ; */
  }
  // Update a user's details


  @Delete(':id')
  async removeUser(@Param('id') userID: string) {
    const response = await this.usersService.deleteUser(userID);
    return response;
  }

  @Post('favorites')
  async addfav(
    @Body('userID') userID: string,
    @Body('artworkID') artworkID: string
  ) {
    return await this.usersService.addToMyFav(userID, artworkID)
    // return userID
  }

  @Get('artworks/:id')
  async getUserArtworks(@Param('id') userID: string) {
    const artworks = await this.usersService.getArtworksUser(userID);
    if (artworks.length > 0) {
      const infoArtworks = await this.artworksService.getInfosArtworks(artworks[0].products)
      // console.log(infoArtworks)
      let arrayArtworks = []
      infoArtworks.forEach(element => {
        element.forEach(info => {
          arrayArtworks.push(info)
        });
      });
      return arrayArtworks
    }
    else {
      return artworks
    }
  }



  @Delete('artworks/:id')
  async deletUserArtwork(
    @Param('id') userID: string,
    @Body('artworkID') artworkID
  ) {
    let response = await this.usersService.deleteArtworkUser(userID, artworkID)
    await this.artworksService.deleteArtworks(artworkID)
    console.log("Hey Brother :", response)
    return response
  }

  @Post('artworks')
  async addArtworks(
    @Body('userID') userID: string,
    @Body('artworkID') artworkID: string
  ) {
    return await this.usersService.addToMyArtworks(userID, artworkID)
  }










}