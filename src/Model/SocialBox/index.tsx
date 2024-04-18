import { JSX } from "react/jsx-runtime"
import Box from "../Boxs"

type initialSocials = 'Linkedin' | 'Instagram' | 'Facebook' | 'Twitter/ X' | 'Youtube'

class Social {
    constructor(protected type:initialSocials,public value:string){

    }

    public resolveSign() {
        if(this.type == 'Instagram'){
            return 'Username'
        }
        return 'URL'
    }
    public getType() {
        return this.type
    }
    public miniIconUrl() {
        switch(this.type) {
            case 'Facebook': return 'devicon_facebook.svg'
            case 'Instagram': return 'devicon_instagram.svg'
            case 'Linkedin' : return 'devicon_linkdin.svg'
            case 'Twitter/ X': return 'devicon_twitter.svg'
            case 'Youtube': return 'devicon_youtube.svg'
        }
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

    public resolveUrl() {
        return this.value
    }

    private resolveClassVectorName() {
        switch (this.type){
            case 'Facebook' : return 'faceBookVector'
            case 'Instagram' : return 'InstagramVector'
            case 'Linkedin' : return 'LinkedinVector'
            case 'Twitter/ X' : return 'tweeterVector'
            case 'Youtube' : return 'youtubeVector'
        }
    }
}

class SocialBox extends Box{
    constructor(protected title:string,protected socialMedias:Array<Social>){
        super(title)
        this.order = 2
        this.typeName = 'SocialBox'
    }
    public isShareAble(): boolean {
        if(this.socialMedias.length == 0) {
            return false
        }else{
            return true
        }
    }    
    public resolveRender(theme: string,mode?:string): JSX.Element {
        return (
            <>
                {
                    this.socialMedias.length > 0 ?
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
                    :
                        this.resolveAddRender(theme,mode)
                }
            </>
        )
    }
    public getRouteAddress(): string {
        return 'socials'
    }
    public getSocialMedias() {
        return this.socialMedias
    }
}

export {
    SocialBox,
    Social,
}
export type {
    initialSocials
}