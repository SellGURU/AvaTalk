/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";

class Share extends Api {
    static getShare (userId:string,resolve:(res:any) => void) {
        this.post('/share',userId).then(res => {
            resolve(res.data)
        })
    }
}

export default Share