
import { BaseError } from "./BaseError";


export class NotFoundError extends BaseError {
    constructor(){
        super("resource not found", 404)
    }
}