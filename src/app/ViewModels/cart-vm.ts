export class CartVm {
    productName:string;
    count:number;
    price:number;
    availableQuantity:number;
    total:number;
    constructor(productName:string,count:number,price:number,availableQuantity:number,total:number){
        this.productName=productName,
        this.count=count,
        this.price=price,
        this.availableQuantity=availableQuantity,
        this.total=total
    }

}
