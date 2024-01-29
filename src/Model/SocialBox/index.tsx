import { JSX } from "react/jsx-runtime"
import Box from "../Boxs"

type initialSocials = 'Linkedin' | 'Instagram' | 'Facebook' | 'Twitter/ X' | 'Youtube'

class Social {
    constructor(protected type:initialSocials,protected value:string){

    }

    public resolveSign() {
        if(this.type == 'Instagram'){
            return 'Username'
        }
        return 'URL'
    }

    public miniIconUrl() {
        return ''   
    }

    public standardIconUrl() {
        return ''
    }

    public resolveRender(theme:string) {
        return (
            <div onClick={() => {
                window.open(this.value)
            }} className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector ${theme}-Profile-${this.resolveClassVectorName()}`}></div>
            </div>            
        )
    }

    private resolveClassVectorName() {
        switch (this.type){
            case 'Facebook' : return ''
            case 'Instagram' : return 'InstagramVector'
            case 'Linkedin' : return 'LinkedinVector'
            case 'Twitter/ X' : return ''
            case 'Youtube' : return ''
        }
    }
}

class SocialBox extends Box{
    constructor(protected title:string,protected socialMedias:Array<Social>){
        super(title)
        this.typeName = 'SocialBox'
    }
    public resolveRender(theme: string): JSX.Element {
        return (
            <div className={`${theme}-Profile-Vectors`}>
                {this.socialMedias.map((item) => {
                    const newSocal = Object.assign(new Social('Facebook',''),item)
                    return (
                        <>
                            {newSocal.resolveRender(theme)}
                        </>
                    )
                })}
            </div>            
        )
    }
}

export {
    SocialBox,
    Social
}