class Box {
    protected typeName:'Box'|'SocialBox'|'LinkBox'|'AboutBox'|'GalleryBox'|'GoogleMapBox' = 'Box'
    constructor(protected title:string){}
    
    public getTitle() {
        return this.title
    }

    public getTypeName() {
        return this.typeName
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

    public resolveRender(theme:string) {
        return (
            <>
                <div className={theme}></div>
            </>
        )
    }
}

export default Box