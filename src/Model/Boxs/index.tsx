class Box {
    protected typeName:'Box'|'SocialBox'|'LinkBox'|'AboutBox'|'GalleryBox' = 'Box'
    constructor(protected title:string){}
    
    public getTitle() {
        return this.title
    }

    public getTypeName() {
        return this.typeName
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