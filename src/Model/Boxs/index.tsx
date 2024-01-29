class Box {
    protected typeName:'Box'|'SocialBox' = 'Box'
    constructor(protected title:string){}
    
    public getTitle() {
        return this.title
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