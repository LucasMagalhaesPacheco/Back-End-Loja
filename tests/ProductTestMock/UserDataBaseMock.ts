import { IUserDBModel } from "../../src/interfaces/ProductsInterfaces"
import { User } from '../../src/models/User';
import BaseDataBase from "../../src/dataBase/BaseDataBase";


export class UserDataBaseMock extends BaseDataBase {
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
      
   }


   public getUserById = async (id: string): Promise<IUserDBModel  | undefined> => {
      switch(id) {
        case "id-mock": 
        return {
            id: "id-mock",
            name: "corninho",
            delivery: "24/11/07",
            StoreProduct: "20"
        }
      }
   }

   
}