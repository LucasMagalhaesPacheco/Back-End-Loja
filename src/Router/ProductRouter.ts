import { Router } from "express";
import { ProductBusiness } from "../business/ProductBussiness";
import { ProductController } from "../controller/ProductController";
import { ProductDataBase } from "../dataBase/ProductsDataBase";
import { UserDataBase } from "../dataBase/UserDataBase";
import GenerateId from "../services/Generateid";



export const productRouter = Router()

const productController = new ProductController(
    new ProductBusiness(
        new ProductDataBase,
        new UserDataBase,
        new GenerateId,
    )
)

productRouter.get("/", productController.getAllProducts)
productRouter.post("/user", productController.insertUser)
productRouter.get("/:id", productController.getProductById)
productRouter.put("/amount/:id", productController.updateAmount)
// productRouter.get("/user/:id", productController.getUserProducts)
