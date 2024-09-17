/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";

interface SublinkPayload {
    unit_amount: | number,
    recurring_interval:'year'|'month',
    quantity:number
}

interface Product {
    "product_name": string,
    "product_id": string,
    "amount": string,
    "quantity": number,
    "color":string,
    "product_url": string,
    "description": string
}

class Service extends Api {
    static SubLink(paymentData:SublinkPayload) {
        return this.post("/sublink",paymentData)
    }

    static Pyload(userId:string,product:Array<Product>) {
        return this.post("/paylink",
        {
            "userid":userId,
            "products": [
               ...product
            ] 
        }
        )
    }

    static subRedirect(session_id:string) {
        return this.get('/subredirect/'+session_id)
    }
}

export default Service