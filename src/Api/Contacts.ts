/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";

interface TagApi {
    title:string,
    color:string,
    contact:Array<any>
}

class Contacts extends Api {
    static addTag(tag:TagApi) {
        this.post('/add_tag',tag).then(res =>console.log(res))
    }

    static showTags(resolve:(tags:Array<any>) => void){
        this.post('/show_tags',{}).then((res) => {
            resolve(res.data)
        })
    }
}

export default Contacts