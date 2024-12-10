/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";

class Chat extends Api {
    static lastUsed:Date | null = null
    public static async flow(data:any){
        // const response = this.flowMock(data)
        const response = await fetch(
        'https://vercel-avatalk-six.vercel.app/avatalk/flow',
        {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        },
        );
        return response.json()
    }
    public static showList(submit:(res:any) => void) {
        this.post('/show_user_chat_list',{}).then((res) => {
            submit(res.data)
            this.lastUsed = new Date()
            localStorage.setItem("lastcheckChat",JSON.stringify(new Date()))
        })
    }    
    public static showTestList(submit:(res:any) => void) {
        this.post('/show_test_chat_list',{}).then((res) => {
            submit(res.data)
        })
    }      

    public static showSelectedChat(chat_list_id:string,submit:(res:Array<any>) => void){
        this.post('/show_selected_session_message',{chat_list_id:chat_list_id}).then((res) => {
            submit(res.data)
        })
    }
    public static async flowMock(data:any){
       return this.post('/flow_uni',data)
    }

    public static checkHaveChats(){
        console.log(this.lastUsed )
        if(this.lastUsed == null){
            const last = localStorage.getItem("lastcheckChat")
            if(last){
                this.lastUsed = new Date(JSON.parse(last))
            }
        }
        const response = this.post("/check_user_chat_list",{
            time:this.lastUsed?.getTime()?this.lastUsed?.getTime():new Date().getTime()
        },{
            noPending:true
        }    
        )
        return response        
    }    
}

export default Chat