import { Box } from "..";

class Link {
    constructor(protected url:string){

    }
    public resolveRender(theme:string) {
        return (
            <div onClick={() => window.open(this.url)} className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector`}>
                    <div className={`${theme}-ContentCard-GlobalVector`}></div>
                </div>
            </div>       
        )
    }    

    public geturl(){
        return this.url
    }
}

class LinkBox extends Box{
    constructor(protected title:string,protected links:Array<Link>){
        super(title)
        this.typeName= 'LinkBox'
    }
    public resolveRender(theme: string): JSX.Element {
        return (
            <div className={`${theme}-Profile-Vectors`}>
                {this.links.map((item) => {
                    const newSocal = Object.assign(new Link('htps://some.com'),item)
                    return (
                        <>
                            {newSocal.resolveRender(theme)}
                        </>
                    )
                })}
            </div>            
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