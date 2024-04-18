import { Box } from "..";
import { Tooltip } from 'react-tooltip'

class Link {
    constructor(protected url:string,protected name:string){

    } 
    public resolveRender(theme:string) {
        return (
            <>
            <div data-tooltip-id={"link"+this.url} data-tooltip-content={this.url} onClick={() => window.open(this.url)} className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector`}>
                    <div className={`${theme}-ContentCard-GlobalVector`}></div>
                </div>
            </div>  
            <Tooltip id={"link"+this.url} />     
            </>
        )
    }    

    public geturl(){
        return this.url
    }

    public getName(){
        return this.name
    }
}

class LinkBox extends Box{
    constructor(protected title:string,protected links:Array<Link>){
        super(title)
        this.order = 3
        this.typeName= 'LinkBox'
    }
    public isShareAble(): boolean {
        if(this.links.length == 0) {
            return false
        }else{
            return true
        }
    }       
    public resolveRender(theme: string,mode?:string): JSX.Element {
        return (
            <>
                {this.links.length> 0 ?
                <div className={`${theme}-Profile-Vectors`}>
                    {this.links.map((item) => {
                        const newSocal = Object.assign(new Link('htps://some.com',''),item)
                        return (
                            <>
                                {newSocal.resolveRender(theme)}
                            </>
                        )
                    })}
                </div>            
                :
                this.resolveAddRender(theme,mode)
                }
            </>
        )
    }    
    public getRouteAddress(): string {
        return 'links'
    }
    public getLinks() {
        return this.links
    }    
}
export {LinkBox,Link}