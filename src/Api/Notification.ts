/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";

class Notification extends Api {
    static lastUsed:Date | null = null
    static isChecking:boolean = false
    static getAll(resolve:(data:Array<any>) =>void) {
        this.isChecking = true
        this.post("/notification_list",{},{
            noPending:true
        } ).then(res => {
            resolve(res.data)
            this.isChecking= false
            this.lastUsed = new Date()
            localStorage.setItem("lastNotif",JSON.stringify(new Date()))
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

    static checkNotification(){
        if(this.lastUsed == null){
            const last = localStorage.getItem("lastNotif")
            if(last){
                this.lastUsed = new Date(JSON.parse(last))
            }
        }
        const response = this.post("/check_notification",{
            time:this.lastUsed?.getTime()
        },{
            noPending:true
        }    
    )
        return response
    }

}

export default Notification