export class Products {
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private qtyStock: number,
        private checkout: number = 0,
        private imgUrl: string
    ){}

    public getId = () => {
        return this.id
     }
     public getName = () => {
        return this.name
     }
     public getPrice = () => {
        return this.price
     }
     public getQtyStock = () => {
        return this.qtyStock
     }
     
     public getImgUrl = () => {
        return this.imgUrl
     }
     
     public getCheckout = () => {
        return this.checkout
     }
    
     public setQtyStock = (newStock: number) => {
        return this.qtyStock = newStock
     }


}