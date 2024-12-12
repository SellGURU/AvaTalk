/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from ".."
import ImageGallery from "react-image-gallery";
import { Button } from "symphony-ui";
// import { Auth } from "../../Api";
import { Fullscreen } from 'lucide-react';
interface galleryImage {
    original:string
    thumbnail:string
    name:string,
    sizes:string
}

class GalleryBox extends Box{
    
    constructor(protected title:string,protected contents:Array<galleryImage>,protected type?:'upload'|'save'){
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
                // if(mode=='share') {
                //     // Auth.addEvent({
                //     //     event_type:"more_info",
                //     //     userid:options.userId,
                //     //     sub_event_category:'more_info_gallery'
                //     // })                 
                // }
            }} className={`${theme}-Profile-Vectors ${this.contents.length>0?'justify-center' :'justify-start'}  h-full`}>
                {this.contents.length > 0 ?
                    <ImageGallery 
                    showFullscreenButton={true}
                    items={this.contents} 
                    renderLeftNav={(onClick, disabled) => {
                        return (
                            <>
                                <div  className={`${theme}-back-Button-container-box `} style={{transform: 'translate(30%, -50%)'}} data-mode="gallery">
                                    <Button onClick={onClick} disabled={disabled} theme={`${theme}-back`}>
                                        <div className={`${theme}-back-Button-vector`}></div>
                                    </Button>
                                </div>
                            </>
                        )
                    }} 
                    renderRightNav={(onClick, disabled) => {
                        return (
                            <>
                                <div  className={`${theme}-back-Button-container-box`} style={{transform: 'translate(-30%, -50%)',right:'0%'}}  data-mode="gallery">
                                    <Button onClick={onClick} disabled={disabled}  theme={`${theme}-back`} style={{rotate:'180deg'}}>
                                        <div className={`${theme}-back-Button-vector`}></div>
                                    </Button>
                                </div>
                            </>
                        )
                    }}
                    renderFullscreenButton={(onClick, isFullscreen ,) => {
                        // console.log(isFullscreen)
                        if(!isFullscreen){
                            document.querySelectorAll(".image-gallery-image").forEach((element:any) => {
                                console.log(element)
                                element.style.height = "400px";
                                element.style.maxHeight = "400px "; // Change property and value as needed
                            });                            
                        }

                        return (
                            <div className="absolute right-1 bottom-4 z-[2] cursor-pointer" onClick={(e) => {
                                // console.log(document.getElementById("image-gallery-image"))
                                // const cols =document.getElementsByClassName("image-gallery-image")
                                document.querySelectorAll(".image-gallery-image").forEach((element:any) => {
                                    console.log(element)
                                    element.style.height = "100vh ";
                                    element.style.maxHeight = "100vh "; // Change property and value as needed
                                });
                                onClick(e)
                            }}  >
                                <Fullscreen></Fullscreen>
                            </div>
                        )
                    }}
                    />                
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
