import { IAmountProductInputDTO, IGetProductsInputDBDTO, IProductDBModelDTO } from "../interfaces/ProductsInterfaces";
import BaseDataBase from "./BaseDataBase";



export class ProductDataBase extends BaseDataBase {
    public static PRODUCTS_TABLES = "storeProducts"


    
    public getProducts = async (productsDB: IGetProductsInputDBDTO): Promise<IProductDBModelDTO[] | undefined> => {
        const search = productsDB.search
        const order = productsDB.order
        const sort = productsDB.sort
        const limit = productsDB.limit
        const offset = productsDB.offset  

        const products: IProductDBModelDTO[] = await this.getConnetion()
        .where("name", "LIKE", `%${search}%`)
        .orderBy(order, sort)
        .limit(limit)
        .offset(offset)
        .select("*")
        .from(ProductDataBase.PRODUCTS_TABLES)

        return products
    }

    public getProductById = async (id: string): Promise<IProductDBModelDTO | undefined> => {
     const product: IProductDBModelDTO[] = await this.getConnetion()
     // Mesmo que não coloque em array ele vai vim dentro de um complicando ver como objeto.
     .where({id: id})
     .select("*")
     .from(ProductDataBase.PRODUCTS_TABLES)
      
     return product[0]
     // Permite que utilize o produto como objeto de maneira mais fácil

     
    }

    public updateAmount = async (input: IAmountProductInputDTO): Promise<void> => {
        const id = input.id
        const amount = input.amount

        console.log(input)

    await this.getConnetion()
    .where({id: id})
    .update({qtyStock: amount})
    .from(ProductDataBase.PRODUCTS_TABLES)
     
    }


}

