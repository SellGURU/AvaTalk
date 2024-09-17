import Api from "./Api.ts";

class SupportForm extends Api {
    static SupportFormApi(name: string, email: string, message: string) {
        return this.post("/support",{
            "name": name,
            "email": email,
            "message": message
        })
    }
}
export  default  SupportForm