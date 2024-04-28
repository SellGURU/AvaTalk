import { Link } from "react-router-dom";

class Box {
    protected static boxCounter:number = 0
    protected typeName:'Box'|'SocialBox'|'LinkBox'|'AboutBox'|'GalleryBox'|'GoogleMapBox' | 'FileBox' = 'Box'
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
        return this.typeName
    }

    public getCardName() {
        return this.getTypeName().replace("Box",' Card')
    }

    public getEventName() {
        switch(this.typeName){
            case 'AboutBox' :return 'more_info_about'
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

    public resolveRender(theme:string,mode?:string) {
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
                <Link  to={'/edit/'+this.getRouteAddress()} className={`${theme}-Profile-BackgroundVectors`}>
                    <div className="w-10 h-10 flex justify-center items-center bg-gray-100  rounded-full boxShadow-mini-Gray">
                        <img src="./Carbon/plusVector.svg" alt="" />
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