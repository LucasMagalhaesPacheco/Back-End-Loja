import { BaseError } from "./BaseError";



export class MissingFields extends BaseError {
    constructor(){
        super("Parameters not passed", 400)
    }
}