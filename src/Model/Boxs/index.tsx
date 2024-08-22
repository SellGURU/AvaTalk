/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

class Box {
    protected static boxCounter:number = 0
    protected type_name:'Box'|'SocialBox'|'LinkBox'|'AboutBox'|'MeetingBox'|'GalleryBox'|'VideoBox'|'GoogleMapBox' | 'FileBox' = 'Box'
    protected order:number = -1;

    constructor(protected title:string){}
    
    protected assignOrder() {
        this.order = Box.boxCounter ++
    }
    public getTitle() {
        return this.title
    }

    public getOrder() {
        return this.order
    }

    public setOrder(order:number) {
        this.order =order
    }
    public getTypeName() {
        return this.type_name
    }

    public getCardName() {
        return this.getTypeName().replace("Box",' Card')
    }

    public getEventName() {
        switch(this.type_name){
            case 'AboutBox' :return 'more_info_about'
            case 'MeetingBox' :return 'more_info_availability'
            case 'GalleryBox': return 'more_info_gallery'
            case 'SocialBox': return 'more_info_socials'
            case 'LinkBox': return 'more_info_links'
        }
    }

    public getRouteAddress() {
        return ''
    }

    public isShareAble() {
        return true
    }

    public resolveRender(theme:string,mode?:string,_options?:any) {
        return (
            <>
                <div className={theme} data-mode={mode}></div>
            </>
        )
    }

    protected resolveAddRender(theme:string,mode?:string) {
        return (
            <>
                {mode == 'profile' ?
                <Link to={'/edit/'+this.getRouteAddress()} className={`${theme}-Profile-BackgroundVectors`}>
                    <div className="w-10 h-10 flex justify-center items-center  text-[#8290a3]  rounded-full ">
                        {/* <img src="./Carbon/plusVector.svg" alt="" /> */}
                        <div className={`${theme}-Profile-EditProfileBtnVector5 ${theme}-Footer-Vectors
                         text-[#8290a3]
                          m-auto`}></div>
                    </div>
                </Link>            
                :
                undefined
                }
            </>
        )
    }
}

export default Box