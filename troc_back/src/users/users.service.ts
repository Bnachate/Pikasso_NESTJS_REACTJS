import { Injectable, NotFoundException, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { User } from './user.model';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {

  constructor(@InjectModel('User')
  private userModel: Model<User>
  ) { }


  async insertUser(username: string, email: string, password: string, firstname: string, lastname: string, gender: string, seller: boolean) {
    if (this.val(email) == true) {
      let newUser = new this.userModel({
        username: username,
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        seller: seller

      });

      const saltedpw = await this.passwordHash(newUser.password);
      newUser.password = saltedpw
      try {
        await newUser.save();
        return "success"
      }
      catch (error) {
        return error
      }

    }
    else {
      return "wrong email"
    }
  }
  val(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  async passwordHash(password) {
    const saltedpw = await bcrypt.hash(password, 10)
    return saltedpw

  };

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users
  }

  // Get a single customer
  async getUser(userID): Promise<User> {
    const user = await this.userModel.findById(userID).exec();
    return user;
  }


  async getSingleUserByName(username: string) {
    const user = await this.findUserbyName(username)
    /* console.log(user) */
    return user[0]

  }
  async getSingleUser(userId: string) {
    const user = await this.userModel.findOne({ '_id': userId })
    console.log(user)
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      admin: user.admin,
      favorites: user.favorites,
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender,
      seller: user.seller,
      age: user.age,
      follow: user.follow,
      followers: user.followers,
      adress: user.adress,
      zip_code: user.zip_code,
      city: user.city,
      description: user.description,
      products: user.products,
      comments: user.comments,
      cart: user.cart

    }
  }
  // Edit customer details

  // Edit customer details
  async updateUser(userID: string, username: string, email: string, avatar: string, admin: string, favorites: [], firstname: string, lastname: string, gender: string, seller: boolean, age: number, followers: [], adress: string, zip_code: number, city: string, description: string, products: [], comments: [], cart: []): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userID);
    if (username) {
      updatedUser.username = username;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (avatar) {
      updatedUser.avatar = avatar;
    }
    if (admin) {
      updatedUser.admin = admin;
    }
    if (favorites) {
      updatedUser.favorites = favorites;
    }
    if (firstname) {
      updatedUser.firstname = firstname;
    }
    if (lastname) {
      updatedUser.lastname = lastname;
    }
    if (gender) {
      updatedUser.gender = gender;
    }
    if (seller) {
      updatedUser.seller = seller;
    }
    if (age) {
      updatedUser.age = age;
    }
    if (followers) {
      updatedUser.followers = followers;
    }
    if (adress) {
      updatedUser.adress = adress;
    }
    if (zip_code) {
      updatedUser.zip_code = zip_code;
    }
    if (city) {
      updatedUser.city = city;
    }
    if (description) {
      updatedUser.description = description;
    }
    if (products) {
      updatedUser.products = products;
    }
    if (comments) {
      updatedUser.comments = comments;
    }
    if (cart) {
      updatedUser.cart = cart;
    }
    await updatedUser.save();
    return updatedUser;
  }
  async deleteUser(userID: string) {
    const response = await this.userModel.deleteOne({ _id: userID }).exec();
    if (response.n === 0) {
      throw new NotFoundException('Could not find this user.');
    }
    else return "User Deleted"

  }


  private async findUserbyName(username): Promise<User> {
    let user;

    try {
      user = await this.userModel.find({ "username": username });
    } catch (error) {
      throw new NotFoundException('Could not find this user, error.');
    }
    if (!user) {
      throw new NotFoundException('Could not find this user.');
    }
    else {
      /* console.log(user) */
      return user;
    }
  }


  async addToMyFav(userID, artworkID): Promise<User> {

    let user;
    user = await this.userModel.findOne({ '_id': userID });
    /* console.log(user) */
    if (user.favorites.includes(artworkID) === true) {
      throw new NotFoundException("this artwork is already in your favorites")
    }
    else {
      user.favorites.push(artworkID)
      await user.save()
      return user.favorites;
    }

  }
  async addToMyArtworks(userID, artworkID): Promise<User> {

    let findUser;
    findUser = await this.userModel.findOne({ '_id': userID });

    if (findUser.products.includes(artworkID) === true) {
      throw new NotFoundException("this artwork is already created")
    }
    else {
      findUser.products.push(artworkID)
      await findUser.save()
      return findUser.products;
    }
  }

  async getArtworksUser(userID) {
    let artworks;
    try {
      artworks = await this.userModel.find({ '_id': userID }, { 'products': 1 });
      return artworks;
    }
    catch (error) {
      throw new NotFoundException('No artwork in your account');
    }
  }
  //delete product on user table
  async deleteArtworkUser(userID, productId) {
    let del;
    let array;

    del = await this.userModel.findOne({ '_id': userID }).select('products')
    array = del.products

    if (array.includes(productId) === true) {
      const index = array.indexOf(productId);
      console.log("hey sister :", index)
      if (index > -1) {
        array.splice(index, 1);
      }
      await del.save()
      console.log("la verif :", del.products)
      return del.products;
    }
    else {
      console.log('not found')
    }
  }
  //function which find users.product with id of the product deleted
  async deleteProducts(productID) {

    const users = await this.userModel.find().exec();
    let productUser = [];

    users.forEach(user => {

      user.products.forEach(product => {
        console.log("Smeagold", product)
        console.log("Frodon", productID)
        if (product == productID) {
          console.log("L'Anneau", user._id)
          productUser.push(user._id)
        }
      })
    })
    productUser.forEach(user => {
      this.deleteArtworkUser(user, productID);
    })
  }
  //delete product on users.favorites
  async deleteFavoriteUser(userID, productID) {
    let del;
    let array;

    del = await this.userModel.findOne({ '_id': userID }).select('favorites')
    array = del.favorites

    if (array.includes(productID) === true) {
      const index = array.indexOf(productID);
      console.log("hey sister :", index)
      if (index > -1) {
        array.splice(index, 1);
      }
      await del.save()
      return del.products;
    }
    else {
      console.log('not found')
    }
  }

  //function which find users.favorites with id of the product deleted
  async deleteFavoritesProducts(productID) {

    const users = await this.userModel.find().exec();
    let favoriteUser = [];
    users.forEach(user => {

      user.favorites.forEach(favorite => {
        if (favorite === productID) {
          favoriteUser.push(user._id)
          console.log(user.id)
        }

      })
    })
    favoriteUser.forEach(user => {
      this.deleteFavoriteUser(user, productID)
    })
  }
}
