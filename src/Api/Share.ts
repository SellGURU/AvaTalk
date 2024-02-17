/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "../Model";
import { boxProvider } from "../help";
import Api from "./Api";

class Share extends Api {
    static getShare (userId:string,resolve:(res:any,boxs:Array<Box>) => void) {
        const resolveBoxs: Array<Box> = [];
        this.post('/share',userId).then(res => {
        res.data.boxs.map((item: any) => {
            const newBox = boxProvider(item);
            resolveBoxs.push(newBox);
        });
        resolve(res.data,resolveBoxs)
        })
    }
}

export default Share