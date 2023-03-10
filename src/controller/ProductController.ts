import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBussiness";
import { BaseError } from "../error/BaseError";
import { IAmountProductInputDTO, IGetProductsInputDTO, IInputInsertUserDTO } from "../interfaces/ProductsInterfaces";


export class ProductController {
    constructor (
        private productBusiness = new ProductBusiness
    ){}


    public getAllProducts = async (req: Request, res: Response) => {
        try {
         const search = req.query.search as string
         const order = req.query.order as string
         const sort = req.query.sort as string 
         const limit = req.query.limit as string 
         const page = req.query.page as string

         const products: IGetProductsInputDTO = {
            search,
            order,
            sort,
            limit,
            page
         }

         const response = await this.productBusiness.getAllProducts(products)
            
         res.status(200).send(response)
        } catch (error) {
            if(error instanceof BaseError) {
                return res.status(error.statusCode).send({message: error.message})
            } // Verificação para não ser necessário tipar o Erro como Any

            res.status(500).send("unexpected error") // Erro de servidor
        }
    }


    public getProductById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id 

            const response = await this.productBusiness.getProductById(id)

            res.status(200).send(response)
        } catch (error) {
            if(error instanceof BaseError) {
                return res.status(error.statusCode).send({message: error.message})
            } // Verificação para não ser necessário tipar o Erro como Any

            res.status(500).send("unexpected error") // Erro de servidor
        }
    }

    public updateAmount = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const amount = req.body.amount

            const input: IAmountProductInputDTO  = {
                id,
                amount
            }

            const response = await this.productBusiness.updateAmount(input)

            res.status(202).send(response)
        } catch (error) {
            if(error instanceof BaseError) {
                return res.status(error.statusCode).send({message: error.message})
            } // Verificação para não ser necessário tipar o Erro como Any

            res.status(500).send("unexpected error") // Erro de servidor
        }
    }

    public insertUser = async (req: Request, res: Response) => {
        try {
            const {name, delivery, storeProduct} = req.body

            const input: IInputInsertUserDTO = {
                name,
                delivery,
                StoreProduct: storeProduct
            }
            
            const response = await this.productBusiness.insertUser(input)

            res.status(201).send(response)


        } catch (error) {
            if(error instanceof BaseError) {
                return res.status(error.statusCode).send({message: error.message})
            } // Verificação para não ser necessário tipar o Erro como Any

            res.status(500).send("unexpected error") // Erro de servidor
        }
    }

    
}