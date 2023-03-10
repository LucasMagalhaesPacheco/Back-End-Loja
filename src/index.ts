import app from "./app";
import { productRouter } from "./Router/ProductRouter";



app.use("/products", productRouter)
