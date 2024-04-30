import { Box } from "..";

class AvailabilityBox extends Box {
    constructor(protected title:string,protected text:string){
        super(title)
        this.order = 1
        this.typeName = 'AvailabilityBox'
    }
    public getBio() {
        return this.text
    }
    public resolveRender(theme:string,mode?:string) {
        return (
            <>
                {this.text == '' ?
                    this.resolveAddRender(theme,mode)
                :
                    <h1>{this.text}</h1>          
                }
            </>
        )
    }    
    public isShareAble(): boolean {
        if(this.text.length == 0) {
            return false
        }else{
            return true
        }
    }
    public getRouteAddress(): string {
        return 'availability'
    }    
}

export default AvailabilityBox