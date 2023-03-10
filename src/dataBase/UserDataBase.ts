import { IUserDBModel } from "../interfaces/ProductsInterfaces";
import { User } from "../models/User";
import BaseDataBase from "./BaseDataBase";


export class UserDataBase extends BaseDataBase {
   public static USER_TABLES = "StoreCartUser"

   public UserDBModel = (user: User): IUserDBModel => {
      const userDB: IUserDBModel = {
         id: user.getId(),
         name: user.getName(),
         delivery: user.getDelivery(),
         StoreProduct: user.getStoreProduct()
      }

      return userDB

   }


   public insertUser = async (user: User): Promise<void> => {
      const userDB = this.UserDBModel(user)

      await this.getConnetion()
      .insert(userDB)
      .into(UserDataBase.USER_TABLES)
   }


   public getUserById = async (id: string): Promise<IUserDBModel  | undefined> => {
      const user : IUserDBModel[] = await this.getConnetion()
      .where({id: id})
      .select()
      .from(UserDataBase.USER_TABLES)
         
      return user[0]
   }

   
}