/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";

class Chat extends Api {
    public static async flow(data:any){
        // const response = this.flowMock(data)
        const response = await fetch(
        'https://vercel-backend-one-roan.vercel.app/mobile/flow_uni',
        {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Access-Control-Allow-Origin': '*',
            Authorization:
                'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTFiN2I5MjlhIiwiaWF0IjoxNzA3MDIzMTY5LCJuYmYiOjE3MDcwMjMxNjksImp0aSI6Ijk0ZTlkNzA4LWZiNzYtNGJkOS1hZTA0LTliNmE5MzU4MmQzZiIsImV4cCI6MTcxNzM5MTE2OSwidHlwZSI6ImFjY2VzcyIsImZyZXNoIjpmYWxzZX0.KIaBTQR8MuWXPaPrm7R2-8QWuljT4r7ovo7bVMkYOrc',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        },
        );
        return response.json()
    }
    public static showList(botid:string|null,submit:(res:any) => void) {
        this.post('/show_chat_list',{botid:botid}).then(res => {
            submit(res)
        })
    }    
    public static async flowMock(data:any){
       return this.post('/flow_uni',data)
    }
}

export default Chat