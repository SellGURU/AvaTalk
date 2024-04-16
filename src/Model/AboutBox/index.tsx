import { Box } from "..";

class AboutBox extends Box {
    constructor(protected title:string,protected text:string){
        super(title)
        this.typeName = 'AboutBox'
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
    public getRouteAddress(): string {
        return 'about'
    }    
}

export default AboutBox