import BaseDataBase from "../BaseDataBase";
import { ProductDataBase } from "../ProductsDataBase";
import { UserDataBase } from "../UserDataBase";
import { products } from "./data";



class Migrations extends BaseDataBase {
    execute = async () => {
        try {
            console.log("Creating tables...")
            await this.createTables()
            console.log("Tables created sucessfully")

            console.log("Populate Tables...")
            await this.insertData()
            console.log("Tables populated successfully.")

            console.log("Migrations completed.")
        } catch (error: any) {
            console.log("FAILED! Error in migrations...")
            console.log(error.message)
        } finally {
            console.log("Ending connection...")
            this.getConnetion()
            .destroy()
            console.log("Connection closed graciously.")
        }
    }


    createTables = async () => {
        await this.getConnetion()
        .raw(`
        DROP TABLE IF EXISTS ${UserDataBase.USER_TABLES};
        DROP TABLE IF EXISTS ${ProductDataBase.PRODUCTS_TABLES};
        
        
        CREATE TABLE IF NOT EXISTS ${ProductDataBase.PRODUCTS_TABLES}(
            id varchar(255) primary key,
            name varchar(255)NOT NULL,
            price float NOT NULL,
            checkout int default 0,
            qtyStock int NOT NULL,
            imgUrl varchar(255)
        );

        CREATE TABLE IF NOT EXISTS ${UserDataBase.USER_TABLES}(
            id varchar(255) primary key,
            name varchar(255) NOT NULL,
            delivery date NOT NULL,
            StoreProduct varchar(255),
            foreign key (storeProduct) references storeProducts (id)
        );`)
            
        }

        insertData = async (): Promise<any> => {
            await this.getConnetion()
            .into(ProductDataBase.PRODUCTS_TABLES)
            .insert(products)
    }
}

const migrations = new Migrations()
migrations.execute()