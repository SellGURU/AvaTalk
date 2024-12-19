/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "..";
import { Tooltip } from 'react-tooltip'
// import { Auth } from "../../Api";

class Link {
    public order:number = -1
    private id:string = ''
    constructor(protected url:string,protected name:string){
        this.id = `id-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`
    } 
    private resolveFallBackImage = () => {
        if(this.url.includes("rewardful")){
            return './icons/www.rewardful.com'
        }
        if(this.url.includes("www.futurelearn.com")){
            return './icons/www.futurelearn.com'
        }
        return './Carbon/globalLinksVector.svg'
    }
    public resolveRender(theme:string,_userID:string) {
        return (
            <>
            <div data-tooltip-id={"link"+this.url} data-tooltip-content={this.url} onClick={() =>{
            // Auth.addEvent({
            //     event_type:"more_info",
            //     userid:userID,
            //     sub_event_category:'more_info_links'
            // }) 
            window.open(this.url)
            }} className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector`}>
                    {this.isValidURL() ?
                        <img className="rounded-full" src={`https://logo.clearbit.com/${new URL(this.geturl()).hostname}`} onError={(e:any) => {
                            e.target.onerror = null; // Prevent infinite loop in case fallback fails
                            e.target.src = this.resolveFallBackImage(); // Set fallback image
                        }} alt="" />
                    :
                    <div className={`${theme}-ContentCard-GlobalVector`}></div>
                    }
                </div>
            </div>  
            <Tooltip id={"link"+this.url} />     
            </>
        )
    }    

    public geturl(){
        return this.url
    }
    public getid() {
        return this.id
    }
    public isValidURL() {
        const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/;
        return regex.test(this.url);
    }

    public getName(){
        return this.name
    }
}

class LinkBox extends Box{
    constructor(protected title:string,protected links:Array<Link>){
        super(title)
        this.order = 3
        this.type_name= 'LinkBox'
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
        return 'links'
    }
    public getLinks() {
        return this.links
    }    
}
export {LinkBox,Link}