/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from ".."
// import ImageGallery from "react-image-gallery";
// import { Button } from "symphony-ui";
// import { Auth } from "../../Api";
// import { Fullscreen } from 'lucide-react';
import GalleryWrapper from "../../Components/GalleryWrapper";
interface galleryImage {
    original:string
    thumbnail:string
    name:string,
    sizes:string
}

class GalleryBox extends Box{
    
    constructor(protected title:string,protected contents:Array<galleryImage>,protected type?:'upload'|'save'|''){
        super(title)
        this.order = 4
        this.type_name = 'GalleryBox'
    }
    public getContents() {
        return this.contents
    }
    public isShareAble(): boolean {
        if(this.contents.length == 0) {
            return false
        }else{
            return true
        }
    }    

    public resolveRender(theme: string,mode?:string,_options?:any): JSX.Element {
        return (
            <div onClick={() => {
                // this.resolveContent()
                // console.log(this.contents[0])
                // if(mode=='share') {
                //     // Auth.addEvent({
                //     //     event_type:"more_info",
                //     //     userid:options.userId,
                //     //     sub_event_category:'more_info_gallery'
                //     // })                 
                // }
            }} className={`${theme}-Profile-Vectors ${this.contents.length>0?'justify-center' :'justify-start'}  h-full`}>
                {this.contents.length > 0 ?
                    <>
                        <GalleryWrapper  contentsUp={this.contents}></GalleryWrapper>
             
                    </>
                :
                    this.resolveAddRender(theme,mode)
                }
            </div>            
        )
    }

    public getRouteAddress(): string {
        return 'gallery'
    }
}

export default GalleryBox
