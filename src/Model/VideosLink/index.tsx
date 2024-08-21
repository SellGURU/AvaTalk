import {Box, Link} from "../index.ts";

class VideosLink extends Box{
    constructor(protected title:string,protected links:Array<Link>){
        super(title)
        this.order = 3
        this.type_name= 'VideosBox'
    }
    public isShareAble(): boolean {
        if(this.links.length == 0) {
            return false
        }else{
            return true
        }
    }
    public resolveRender(theme: string,mode?:string,options?:any): JSX.Element {
        return (
            <>
                {this.links.length> 0 ?
                    <div className={`${theme}-Profile-Vectors`}>
                        {this.links.sort((a,b) => a.order -b.order).map((item) => {
                            const newSocal = Object.assign(new Link('htps://some.com',''),item)
                            return (
                                <>
                                    {newSocal.resolveRender(theme,options.userId)}
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
        return 'videos'
    }
    public getLinks() {
        return this.links
    }
}
export  {VideosLink}