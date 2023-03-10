import { Products } from "../models/Products"


export interface IProductDBModelDTO {
    id: string,
    name: string,
    price: number,
    checkout: number,
    qtyStock: number,
    imgUrl: string
}

export interface IGetProductsInputDTO  {
  search: string,
  order: string,
  sort: string,
  limit: string,
  page: string
}

export interface IGetProductsInputDBDTO {
    search: string,
    order: string,
    sort: string,
    limit: number,
    offset: number
}

export interface IGetProductsOutputDTO {
    data: Products[]
}


export interface IGetProductByIdOutputDTO {
    data: IProductDBModelDTO
}

export interface IAmountProductInputDTO {
    id: string
    amount: number 
}

export interface IOutputMessageDTO {
    message: string
}


export interface IUserDBModel {
   id: string,
   name: string,
   delivery: string,
   StoreProduct: string
}

export interface IInputInsertUserDTO {
    name: string,
    delivery: string,
    StoreProduct: string
} 


export interface IOutputUserProductDTO {
    name: string,
    delivery: string,
    storeProduct: Products
}