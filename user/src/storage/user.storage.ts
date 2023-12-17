import { Injectable } from '@nestjs/common';
import { IUser } from '@src/models/i-credentials';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { UserModel } from './schemas/user.schema';
@Injectable()
export class UserStorage {
  public async getUserById(id: string): Promise<IUser> {
    const objectId = new mongoose.Types.ObjectId(id);
    const foundUser = await UserModel.findOne({ _id: objectId }).lean().exec();
    if (!foundUser) {
      return undefined;
    }
    return this.wrapUser(foundUser);
  }

  public async getUserByLogin(login: string): Promise<IUser> {
    const foundUser = await UserModel.findOne({ login }).lean().exec();
    if (!foundUser) {
      return undefined;
    }
    return this.wrapUser(foundUser);
  }

  public async getUserByUsername(username: string): Promise<IUser> {
    const foundUser = await UserModel.findOne({ username }).lean().exec();
    if (!foundUser) {
      return undefined;
    }
    return this.wrapUser(foundUser);
  }

  public async createUser(
    login: string,
    username: string,
    password: string,
  ): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      login,
      username,
      password: hash,
    });

    return newUser._id.toString();
  }

  public async deleteUser(id: string): Promise<void> {
    const objectId = new mongoose.Types.ObjectId(id);
    await UserModel.deleteOne({ id: objectId });
  }

  private wrapUser(
    rawUser: { _id: mongoose.Types.ObjectId } & Omit<IUser, 'id'>,
  ): IUser {
    const newUser: IUser & { _id: mongoose.Types.ObjectId } = {
      ...rawUser,
      id: rawUser._id.toString(),
    };
    delete newUser._id;
    return newUser satisfies IUser;
  }
}
