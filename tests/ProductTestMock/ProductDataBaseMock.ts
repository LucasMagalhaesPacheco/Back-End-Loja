import { IAmountProductInputDTO, IGetProductsInputDBDTO, IProductDBModelDTO } from "../../src/interfaces/ProductsInterfaces"
import BaseDataBase from "../../src/dataBase/BaseDataBase";



export class ProductDataBaseMock extends BaseDataBase {
    public static PRODUCTS_TABLES = "storeProducts"


    
    public getProducts = async (productsDB: IGetProductsInputDBDTO): Promise<IProductDBModelDTO[] | undefined> => {
      

        const products: IProductDBModelDTO[] = [
            {
                id:"16",
                name:"AZEITE  PORTUGUÊS EXTRA VIRGEM GALLO 500ML",	
                price: 20.49,
                checkout: 0,
                qtyStock: 158,
                imgUrl: "https://images.tcdn.com.br/img/img_prod/584699/azeite_portugues_de_oliva_extra_virgem_gallo_vidro_500ml_2011_1_20190715134949.jpg"
            },
            {
                id:"18",
                name:"BEBIDA ENERGÉTICA VIBE 2L",	
                price: 8.99,
                checkout: 0,
                qtyStock: 659,
                imgUrl: "http://img.sitemercado.com.br/produtos/ef6cc59c2765baf3555787a12a725ca250ceaaae2e21d312f29bb1342c68e1ae_full.jpg"
            },
            {
                id:"19",
                name:"ENERGÉTICO RED BULL ENERGY DRINK 250ML",	
                price: 7.29,
                checkout: 0,
                qtyStock: 909,
                imgUrl: "https://images-americanas.b2w.io/produtos/4604348163/imagens/energetico-red-bull-tradicional-gaseificado-24-latas-250ml/4604348163_1_large.jpg"
            },
            {
                id:"20",
                name:"ENERGÉTICO RED BULL ENERGY DRINK 355ML",	
                price: 10.79,
                checkout: 0,
                qtyStock: 159,
                imgUrl:"https://tezeio.vtexassets.com/arquivos/ids/663272-800-800?v=638084976106370000&width=800&height=800&aspect=true"
            },
            {
                id:"22",
                name:"ENERGÉTICO RED BULL ENERGY DRINK SEM AÇÚCAR 250ML",	
                price: 7.49,
                checkout:0,
                qtyStock: 659,
                imgUrl: "https://cf.shopee.com.br/file/be1cc4286697eeb214f43d5ae4e04742"
            },
            {
                id:"23",
                name:"ÁGUA MINERAL BONAFONT SEM GÁS 1,5L",	
                price: 2.39,
                checkout: 0,
                qtyStock: 909,
                imgUrl: "http://d2r9epyceweg5n.cloudfront.net/stores/002/429/714/products/bona-500ml11-e7ae83b32b20e2f56b16663807405886-640-0.jpg"
            },
            {
                id:"24",
                name:"FILME DE PVC WYDA 28CMX15M",	
                price: 3.99,
                checkout: 0,
                qtyStock: 160,
                imgUrl: "https://media.soujusto.com.br/products/7898930672328.jpg"
            },
        ]

        return products
       
    }

    public getProductById = async (id: string): Promise<IProductDBModelDTO | undefined> => {
     switch(id) {
        case "20": 
        return {
            id:"20",
            name:"ENERGÉTICO RED BULL ENERGY DRINK 355ML",	
            price: 10.79,
            checkout: 0,
            qtyStock: 159,
            imgUrl:"https://tezeio.vtexassets.com/arquivos/ids/663272-800-800?v=638084976106370000&width=800&height=800&aspect=true"
        }
     }

     
    }

    public updateAmount = async (input: IAmountProductInputDTO): Promise<void> => {
     
    }


}
