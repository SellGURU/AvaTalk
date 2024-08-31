/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";

class Notification extends Api {
    static lastUsed:Date = new Date()
    static isChecking:boolean = false
    static getAll(resolve:(data:Array<any>) =>void) {
        this.isChecking = true
        this.post("/notification_list",{},{
            noPending:true
        } ).then(res => {
            resolve(res.data)
            this.isChecking= false
            this.lastUsed = new Date()
        },
    ).catch(() => {
            this.isChecking =false
        })
    }

    static readNotification(id:string) {
        this.post("/update_notification",{
            id,
            type:"read"
        },{
            noPending:true
        })
    }

    static checkNotification(time:Date){
        const response = this.post("/check_notification",{
            time:time.getTime()
        },{
            noPending:true
        }    
    )
        return response
    }

}

export default Notification