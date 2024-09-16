import Api from "./Api";

interface SublinkPayload {
    unit_amount: | number,
    recurring_interval:'year'|'week',
    quantity:number
}

class Service extends Api {
    static SubLink(paymentData:SublinkPayload) {
        return this.post("/sublink",paymentData)
    }
}

export default Service