import {Box} from "../index.ts";
import {Auth} from "../../Api";
import {Tooltip} from "react-tooltip";
import boxs from "../Boxs";
class Video extends boxs{
    public order:number = -1
    constructor(protected url:string,protected name:string){
        super("video")
        this.order = 5
        this.type_name= 'VideosBox'
    }
    public resolveRender(theme:string,userID:string) {
        return (
            <>
                <div data-tooltip-id={"link"+this.url} data-tooltip-content={this.url} onClick={() =>{
                    Auth.addEvent({
                        event_type:"more_info",
                        userid:userID,
                        sub_event_category:'more_info_links'
                    })
                    window.open(this.url)
                }} className={`${theme}-Profile-BackgroundVectors`}>
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

class VideosLink extends Box{
    constructor(protected title:string, public links:Array<Video>){
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
                    <div className={`${theme}-Profile-Vectors hiram`}>
                        {this.links.sort((a,b) => a.order -b.order).map((item) => {
                            const newSocal = Object.assign(new Video('htps://some.com',''),item)
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
export {VideosLink,Video}