import { ProductDataBase } from "../dataBase/ProductsDataBase";
import { UserDataBase } from "../dataBase/UserDataBase";
import { ValidationError } from "../error/ValidationError";
import { MissingFields } from "../error/MissingFields";
import { NotFoundError } from "../error/NotFoundError";
import { IAmountProductInputDTO, IGetProductByIdOutputDTO, IGetProductsInputDBDTO, IGetProductsInputDTO, IGetProductsOutputDTO, IInputInsertUserDTO, IOutputMessageDTO, IOutputUserProductDTO } from "../interfaces/ProductsInterfaces";
import { Products } from "../models/Products";
import GenerateId from "../services/Generateid";
import { User } from "../models/User";


export class ProductBusiness {
    constructor(
        private productData = new ProductDataBase,
        private userData = new UserDataBase,
        private generateId = new GenerateId
    ) { }

    public getAllProducts = async (input: IGetProductsInputDTO) => {
        const search = input.search || ""
        const order = input.order || "name"
        const sort = input.sort || "ASC"
        const limit = Number(input.limit) || 10
        const page = Number(input.page) || 1

        const offset = limit * (page - 1)
        //Offset mostra o estado inicial que vai ter a lista de produtos
        // Como todo indíce começa com Zero, então a pagina 1 vai começar do produto 0,
        // A pagina seria no 11 vai começar do produto 10.

        if (typeof search !== "string") {
            throw new ValidationError("Your search is not in string format")
        }

        if (typeof order !== "string") {
            throw new ValidationError("Your ordering is not in string format")

        }

        if (typeof limit !== "number") {
            throw new ValidationError("Limit parameter is not in number format")
        }

        if (typeof page !== "number") {
            throw new ValidationError("Parameter page is in invalid format")
        }

        const getProductsDB: IGetProductsInputDBDTO = {
            search,
            order,
            sort,
            limit,
            offset
        }

        const productsDB = await this.productData.getProducts(getProductsDB)

        if (!productsDB) {
            throw new NotFoundError()
        }

        const products = productsDB.map((productsDB) => {
            return new Products(
                productsDB.id,
                productsDB.name,
                productsDB.price,
                productsDB.qtyStock,
                productsDB.checkout,
                productsDB.imgUrl

            )
        })

        const response: IGetProductsOutputDTO = {
            data: products
        }

        return response
    }

    public getProductById = async (id: string) => {


        if (!id) {
            throw new MissingFields()
        }

        if (typeof id !== "string") {
            throw new ValidationError("id parameter is not in string format")
        }

        const productDB = await this.productData.getProductById(id)


        if (!productDB) {
            throw new NotFoundError()
        }


        const response: IGetProductByIdOutputDTO = {
            data: productDB
        }


        return response

    }

    public updateAmount = async (input: IAmountProductInputDTO) => {
        const id = input.id
        let amount = input.amount

        if (!id || !amount) {
            throw new MissingFields()
        }

        if (typeof id !== "string") {
            throw new ValidationError("id parameter is not in string format")
        }

        if (typeof amount !== "number") {
            throw new ValidationError("amount parameter is not in number")
        }

        const productDB = await this.productData.getProductById(id)

        if (!productDB) {
            throw new NotFoundError()
        }

        amount = productDB.qtyStock - amount

        const inputDB: IAmountProductInputDTO = {
            id,
            amount
        }

        await this.productData.updateAmount(inputDB)

        const response: IOutputMessageDTO = {
            message: "updated product"
        }

        return response
    }


    public insertUser = async (input: IInputInsertUserDTO) => {
        const name = input.name
        let delivery = input.delivery
        const storeProduct = input.StoreProduct

        if(!name || !delivery || !storeProduct) {
            throw new MissingFields()
        }

        if(typeof name !== "string") {
            throw new ValidationError("Username not passed as a string")
        }

        if(typeof delivery !== "string") {
            throw new ValidationError("date was not passed as a string")
        }

        if (typeof storeProduct !== "string") {
            throw new ValidationError("store product was not passed as a string")
        }

        const id = this.generateId.generate()


        const productDB = await this.productData.getProductById(storeProduct)

        if(!productDB) {
            throw new NotFoundError()
        }

        delivery = delivery.split("/").reverse().join("-")


        const newUser = new User(
            id,
            name,
            delivery,
            productDB.id
        )

        await this.userData.insertUser(newUser)

        const response: IOutputMessageDTO = {
            message: "User created successfully"
        }

        return response
    }

    


}