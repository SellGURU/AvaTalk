/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "..";
import AboutComponent from "./AboutComponet";

class AboutBox extends Box {
    constructor(protected title:string,protected text:string){
        super(title)
        this.order = 1
        this.type_name= 'AboutBox'
    }
    public getBio() {
        return this.text
    }
    public resolveRender(theme:string,mode?:string,options?:any) {
        return (
            <>
                {this.text == '' ?
                    this.resolveAddRender(theme,mode)
                :
                    <AboutComponent userID={options.userId} text={this.text}></AboutComponent>
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
        return 'about'
    }    
}

export default AboutBox