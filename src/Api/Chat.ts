/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";

class Chat extends Api {
    public static async flow(data:any){
        // const response = this.flowMock(data)
        const response = await fetch(
        'https://vercel-backend-one-roan.vercel.app/avatalk/flow',
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
    public static showList(botid:string|null,submit:(res:any) => void) {
        this.post('/show_chat_list',{botid:botid}).then(() => {
            submit([])
        })
    }    
    public static async flowMock(data:any){
       return this.post('/flow_uni',data)
    }
}

export default Chat