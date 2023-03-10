export class User {
    constructor(
        private id: string,
        private name: string,
        private delivery: string,
        private storeProduct: string
    ){}

    public getId = () => {
        return this.id
     }
     public getName = () => {
        return this.name
     }
    public getDelivery = () => {
        return this.delivery
    }
    public getStoreProduct = () => {
        return this.storeProduct
    }
}